-- ==============================================================================
-- ELECTION OF INDIA - GOD MODE, CAMPAIGN, PARTY HQ & ECONOMY SCHEMA MIGRATION
-- Migration: 20261003_godmode_and_economy.sql
-- ==============================================================================

-- 1. ADMIN ROLES & GOD MODE PERMISSIONS
CREATE TABLE IF NOT EXISTS admin_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role_level TEXT NOT NULL DEFAULT 'election_commissioner' CHECK (role_level IN ('chief_election_commissioner', 'election_commissioner', 'observer', 'system_admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ADMIN ACTION AUDIT LOG (Immutable Cryptographic Audit Trail)
CREATE TABLE IF NOT EXISTS admin_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT NOT NULL,
    previous_value TEXT,
    new_value TEXT NOT NULL,
    reason TEXT NOT NULL,
    audit_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. OFFICIAL RESULT RELEASES (Manual Release Gate)
CREATE TABLE IF NOT EXISTS result_releases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    election_id UUID REFERENCES elections(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES profiles(id),
    result_version TEXT NOT NULL DEFAULT 'v1.0-FINAL-SEALED',
    total_seats INT NOT NULL,
    total_votes BIGINT NOT NULL,
    audit_hash TEXT NOT NULL,
    is_released BOOLEAN NOT NULL DEFAULT FALSE,
    released_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CAMPAIGN ACTIONS & EXPENDITURES
CREATE TABLE IF NOT EXISTS campaign_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    constituency_id UUID REFERENCES constituencies(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL CHECK (action_type IN ('rally', 'door_to_door', 'social_media', 'debate', 'manifesto', 'volunteer', 'constituency_meeting', 'digital_ad', 'town_hall', 'media_interview', 'alliance_campaign', 'grassroots')),
    cost_incurred BIGINT NOT NULL DEFAULT 0,
    support_gain DECIMAL(4,2) DEFAULT 0.0,
    awareness_gain DECIMAL(4,2) DEFAULT 0.0,
    reputation_gain DECIMAL(4,2) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. PARTY OFFICES & APPOINTMENTS (12 Leadership Positions)
CREATE TABLE IF NOT EXISTS party_offices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    party_id UUID REFERENCES parties(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('President', 'Vice President', 'General Secretary', 'Joint Secretary', 'Treasurer', 'Youth Wing Leader', 'Women Wing Leader', 'State President', 'District President', 'Spokesperson', 'Whip', 'Campaign Manager')),
    appointee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    appointed_by UUID REFERENCES profiles(id),
    appointed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(party_id, role)
);

-- 6. CANDIDATE NOMINATIONS & SELECTION METHOD
CREATE TABLE IF NOT EXISTS candidate_nominations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    party_id UUID REFERENCES parties(id) ON DELETE CASCADE,
    constituency_id UUID REFERENCES constituencies(id) ON DELETE CASCADE,
    candidate_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    selection_method TEXT NOT NULL CHECK (selection_method IN ('leader', 'primary', 'member_voting', 'coalition')),
    approved_by_party BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(party_id, constituency_id)
);

-- 7. SEAT VACANCIES & BY-ELECTIONS (Dual Seat Wins & Anti-Defection)
CREATE TABLE IF NOT EXISTS seat_vacancies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    constituency_id UUID REFERENCES constituencies(id) ON DELETE CASCADE,
    vacated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reason TEXT NOT NULL CHECK (reason IN ('dual_seat_resignation', 'party_switching_defection', 'resignation', 'disqualification')),
    by_election_scheduled BOOLEAN DEFAULT TRUE,
    vacated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. BUSINESSES & COMMERCIAL ENTERPRISES
CREATE TABLE IF NOT EXISTS businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    industry TEXT NOT NULL CHECK (industry IN ('IT Services', 'Infrastructure & Construction', 'Renewable Energy', 'Agriculture & FMCG', 'Media & Broadcasting', 'Healthcare')),
    location TEXT NOT NULL,
    capital BIGINT NOT NULL DEFAULT 500000,
    employees_count INT NOT NULL DEFAULT 1,
    monthly_revenue BIGINT NOT NULL DEFAULT 0,
    monthly_expenses BIGINT NOT NULL DEFAULT 0,
    monthly_salary_per_employee INT NOT NULL DEFAULT 10000,
    reputation INT NOT NULL DEFAULT 70 CHECK (reputation BETWEEN 0 AND 100),
    bank_balance BIGINT NOT NULL DEFAULT 500000,
    has_govt_contract BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. BUSINESS EMPLOYEES
CREATE TABLE IF NOT EXISTS business_employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    designation TEXT NOT NULL DEFAULT 'Associate',
    monthly_salary INT NOT NULL DEFAULT 12000,
    hired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(business_id, employee_id)
);

-- 10. POLITICAL SALARY SETTINGS & TRANSACTIONS
CREATE TABLE IF NOT EXISTS salary_rules (
    office TEXT PRIMARY KEY CHECK (office IN ('MP', 'MLA', 'Minister', 'Chief Minister', 'Prime Minister', 'Speaker')),
    monthly_salary INT NOT NULL DEFAULT 100000,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS salary_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    office TEXT NOT NULL,
    amount INT NOT NULL,
    game_month INT NOT NULL,
    disbursed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. CONFLICT OF INTEREST DECLARATIONS
CREATE TABLE IF NOT EXISTS conflict_declarations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    government_department TEXT NOT NULL,
    contract_value BIGINT NOT NULL,
    decision TEXT NOT NULL CHECK (decision IN ('recused', 'declared')),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. SPEAKER ELECTION (REAL PLAYER LEGISLATIVE BALLOTS)
CREATE TABLE IF NOT EXISTS speaker_elections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    house_type TEXT NOT NULL DEFAULT 'lok_sabha' CHECK (house_type IN ('lok_sabha', 'vidhan_sabha')),
    term_year INT NOT NULL DEFAULT 2030,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'concluded')),
    winning_candidate_id UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS speaker_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    speaker_election_id UUID REFERENCES speaker_elections(id) ON DELETE CASCADE,
    voter_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    candidate_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(speaker_election_id, voter_profile_id)
);

-- ROW LEVEL SECURITY POLICIES
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE result_releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE salary_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE speaker_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin actions readable by all authenticated users" ON admin_actions FOR SELECT USING (true);
CREATE POLICY "Public result releases readable by all" ON result_releases FOR SELECT USING (true);
CREATE POLICY "Businesses readable by all" ON businesses FOR SELECT USING (true);
CREATE POLICY "Owners can manage own businesses" ON businesses FOR ALL USING (auth.uid() = owner_id);
