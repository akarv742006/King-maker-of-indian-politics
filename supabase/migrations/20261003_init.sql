-- ==============================================================================
-- KING MAKER OF INDIAN POLITICS - AUTHORITATIVE DATABASE SCHEMA
-- PostgreSQL / Supabase Schema with Foreign Keys, Constraints & RLS
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. GAME WORLDS
CREATE TABLE IF NOT EXISTS game_worlds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'archived')),
    current_phase TEXT NOT NULL DEFAULT 'pre_election',
    day_count INT NOT NULL DEFAULT 1,
    tick_rate INT NOT NULL DEFAULT 60, -- seconds per day
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. STATES & UNION TERRITORIES
CREATE TABLE IF NOT EXISTS states (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(10) UNIQUE NOT NULL, -- e.g. UP, MH, DL, TN, WB, GJ, KA
    name TEXT NOT NULL,
    capital TEXT NOT NULL,
    assembly_seats INT NOT NULL,
    lok_sabha_seats INT NOT NULL,
    population BIGINT NOT NULL,
    literacy_rate DECIMAL(5,2) DEFAULT 75.0,
    dominant_issues TEXT[] DEFAULT ARRAY['Infrastructure', 'Agriculture', 'Employment'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CONSTITUENCIES
CREATE TABLE IF NOT EXISTS constituencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    state_id UUID REFERENCES states(id) ON DELETE CASCADE,
    constituency_number INT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'lok_sabha' CHECK (type IN ('lok_sabha', 'assembly')),
    category TEXT NOT NULL DEFAULT 'GEN' CHECK (category IN ('GEN', 'SC', 'ST')),
    registered_voters INT NOT NULL DEFAULT 1500000,
    urban_rural_ratio DECIMAL(5,2) DEFAULT 0.45, -- 0.45 = 45% urban
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(state_id, constituency_number, type)
);

-- 4. PLAYER PROFILES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY, -- maps to auth.users id
    username TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    state_code VARCHAR(10) REFERENCES states(code),
    home_constituency_id UUID REFERENCES constituencies(id),
    current_role TEXT DEFAULT 'Citizen' CHECK (current_role IN ('Citizen', 'Party Member', 'Candidate', 'MLA', 'MP', 'Minister', 'Chief Minister', 'Prime Minister', 'Opposition Leader', 'Speaker')),
    political_xp INT NOT NULL DEFAULT 0,
    reputation_score INT NOT NULL DEFAULT 50 CHECK (reputation_score BETWEEN 0 AND 100),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. POLITICAL PARTIES
CREATE TABLE IF NOT EXISTS parties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    abbreviation VARCHAR(15) UNIQUE NOT NULL,
    symbol_name TEXT NOT NULL,
    symbol_svg TEXT,
    primary_color VARCHAR(10) NOT NULL DEFAULT '#173B67',
    secondary_color VARCHAR(10) NOT NULL DEFAULT '#F59E0B',
    founder_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    president_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    manifesto_summary TEXT,
    ideology TEXT DEFAULT 'Centrist' CHECK (ideology IN ('Progressive', 'Conservative', 'Centrist', 'Social Democratic', 'Nationalist', 'Regional Interest')),
    treasury_balance BIGINT NOT NULL DEFAULT 5000000, -- simulated Rupees
    member_count INT NOT NULL DEFAULT 1,
    is_national_party BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. PARTY MEMBERSHIP
CREATE TABLE IF NOT EXISTS party_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    party_id UUID REFERENCES parties(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role_in_party TEXT NOT NULL DEFAULT 'Member' CHECK (role_in_party IN ('Founder', 'President', 'General Secretary', 'Treasurer', 'State In-charge', 'Spokesperson', 'Member')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(party_id, profile_id)
);

-- 7. ALLIANCES & COALITIONS
CREATE TABLE IF NOT EXISTS alliances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    abbreviation VARCHAR(15) UNIQUE NOT NULL,
    lead_party_id UUID REFERENCES parties(id) ON DELETE RESTRICT,
    member_party_ids UUID[] NOT NULL,
    common_minimum_program TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. ELECTIONS
CREATE TABLE IF NOT EXISTS elections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_world_id UUID REFERENCES game_worlds(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('lok_sabha', 'state_assembly')),
    state_id UUID REFERENCES states(id), -- NULL if Lok Sabha
    total_seats INT NOT NULL,
    majority_threshold INT NOT NULL,
    phase TEXT NOT NULL DEFAULT 'announcement' CHECK (phase IN ('announcement', 'nominations', 'verification', 'campaigning', 'voting', 'counting', 'results_declared')),
    phase_deadline TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. CANDIDATES
CREATE TABLE IF NOT EXISTS candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    election_id UUID REFERENCES elections(id) ON DELETE CASCADE,
    constituency_id UUID REFERENCES constituencies(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    party_id UUID REFERENCES parties(id) ON DELETE SET NULL, -- NULL if Independent
    candidate_name TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT TRUE,
    campaign_funds_spent BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(election_id, constituency_id, party_id)
);

-- 10. SECRET BALLOTS & VOTING
CREATE TABLE IF NOT EXISTS votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    election_id UUID REFERENCES elections(id) ON DELETE CASCADE,
    constituency_id UUID REFERENCES constituencies(id) ON DELETE CASCADE,
    voter_token_hash TEXT NOT NULL, -- Anonymous hash to prevent duplicate voting
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    cast_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(election_id, constituency_id, voter_token_hash)
);

-- 11. ELECTION RESULTS
CREATE TABLE IF NOT EXISTS results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    election_id UUID REFERENCES elections(id) ON DELETE CASCADE,
    constituency_id UUID REFERENCES constituencies(id) ON DELETE CASCADE,
    winning_candidate_id UUID REFERENCES candidates(id),
    winning_party_id UUID REFERENCES parties(id),
    total_votes INT NOT NULL DEFAULT 0,
    winning_margin INT NOT NULL DEFAULT 0,
    turnout_percentage DECIMAL(5,2) NOT NULL DEFAULT 0.0,
    vote_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
    declared_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(election_id, constituency_id)
);

-- 12. GOVERNMENTS & FORMATION
CREATE TABLE IF NOT EXISTS governments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    election_id UUID REFERENCES elections(id) ON DELETE CASCADE,
    head_of_government_id UUID REFERENCES profiles(id),
    ruling_party_id UUID REFERENCES parties(id),
    ruling_alliance_id UUID REFERENCES alliances(id),
    status TEXT NOT NULL DEFAULT 'negotiating' CHECK (status IN ('negotiating', 'floor_test_pending', 'confidence_passed', 'caretaker', 'dissolved')),
    majority_seats_proven INT NOT NULL DEFAULT 0,
    floor_test_deadline TIMESTAMP WITH TIME ZONE,
    term_start TIMESTAMP WITH TIME ZONE,
    term_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. CABINET MEMBERS & MINISTERIAL PORTFOLIOS
CREATE TABLE IF NOT EXISTS cabinet_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    government_id UUID REFERENCES governments(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    portfolio TEXT NOT NULL, -- e.g. Home Affairs, Finance, Defence, External Affairs, Railways, Education, Health
    appointed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(government_id, portfolio)
);

-- 14. PARLIAMENT & BILLS
CREATE TABLE IF NOT EXISTS bills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    full_clauses TEXT[] NOT NULL,
    sponsor_profile_id UUID REFERENCES profiles(id),
    sponsor_party_id UUID REFERENCES parties(id),
    category TEXT NOT NULL CHECK (category IN ('Financial', 'Constitutional', 'Public Welfare', 'Security', 'Infrastructure')),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'introduced', 'in_debate', 'voting', 'passed', 'rejected')),
    ayes_count INT NOT NULL DEFAULT 0,
    noes_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    concluded_at TIMESTAMP WITH TIME ZONE
);

-- 15. BILL VOTES
CREATE TABLE IF NOT EXISTS bill_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bill_id UUID REFERENCES bills(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    party_id UUID REFERENCES parties(id),
    vote_choice TEXT NOT NULL CHECK (vote_choice IN ('aye', 'no', 'abstain')),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(bill_id, profile_id)
);

-- 16. DESHCONNECT - POSTS
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    party_id UUID REFERENCES parties(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    media_url TEXT,
    hashtags TEXT[] DEFAULT ARRAY[]::TEXT[],
    poll_data JSONB, -- { "question": "...", "options": ["A", "B"], "votes": [12, 45] }
    likes_count INT NOT NULL DEFAULT 0,
    comments_count INT NOT NULL DEFAULT 0,
    shares_count INT NOT NULL DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 17. DESHCONNECT - COMMENTS
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    likes_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 18. DESHCONNECT - FOLLOWS
CREATE TABLE IF NOT EXISTS follows (
    follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id)
);

-- 19. MESSAGES & CHAT
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- NULL if party chat or public room
    party_id UUID REFERENCES parties(id) ON DELETE CASCADE, -- NULL if direct message
    channel_type TEXT NOT NULL DEFAULT 'dm' CHECK (channel_type IN ('dm', 'party', 'parliament_hall', 'public_square')),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 20. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'election_result', 'bill_vote', 'party_invite', 'mention', 'floor_test'
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    link_target TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 21. NEWS & CURRENT AFFAIRS
CREATE TABLE IF NOT EXISTS news_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('National', 'State Elections', 'Economy', 'Judiciary', 'Defense & Diplomacy', 'Public Welfare')),
    source_name TEXT NOT NULL,
    source_url TEXT,
    verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('verified', 'developing', 'allegation', 'simulation_event')),
    in_game_impact TEXT, -- e.g. "Public approval in rural constituencies +4%"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 22. MACRO-ECONOMIC & GOVERNANCE METRICS
CREATE TABLE IF NOT EXISTS game_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_world_id UUID REFERENCES game_worlds(id) ON DELETE CASCADE,
    gdp_growth_rate DECIMAL(5,2) NOT NULL DEFAULT 6.8,
    inflation_rate DECIMAL(5,2) NOT NULL DEFAULT 4.5,
    unemployment_rate DECIMAL(5,2) NOT NULL DEFAULT 6.1,
    fiscal_deficit_percent DECIMAL(5,2) NOT NULL DEFAULT 5.1,
    education_index INT NOT NULL DEFAULT 72,
    healthcare_index INT NOT NULL DEFAULT 68,
    infrastructure_score INT NOT NULL DEFAULT 76,
    overall_public_approval INT NOT NULL DEFAULT 58,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 23. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action_type TEXT NOT NULL,
    target_entity TEXT NOT NULL,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 24. MODERATION REPORTS
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    reported_profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('post', 'comment', 'message', 'party', 'profile')),
    entity_id UUID NOT NULL,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'dismissed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE bill_votes ENABLE ROW LEVEL SECURITY;

-- Public read for visible entities
CREATE POLICY "Public profiles are readable" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public parties are readable" ON parties FOR SELECT USING (true);
CREATE POLICY "Public posts are readable" ON posts FOR SELECT USING (true);
CREATE POLICY "Public comments are readable" ON comments FOR SELECT USING (true);
CREATE POLICY "Public bills are readable" ON bills FOR SELECT USING (true);

-- User permissions
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own posts" ON posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can insert comments" ON comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Party members can view party chat" ON messages FOR SELECT USING (
    receiver_id = auth.uid() OR sender_id = auth.uid() OR party_id IN (
        SELECT party_id FROM party_members WHERE profile_id = auth.uid()
    )
);
