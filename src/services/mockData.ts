import {
  StateInfo,
  ConstituencyInfo,
  Party,
  PlayerProfile,
  ParliamentBill,
  DeshPost,
  NewsEventItem,
  MacroMetrics,
  Election,
  Candidate,
  GovernmentFormation,
  ChatMessage,
  CampaignAction,
  CandidateCampaignState,
  PartyOfficeBearer,
  Business,
  PlayerWallet,
  PoliticalSalarySetting,
  AdminAction,
  SpeakerElection,
  ConflictOfInterestAlert
} from '../types';

export const INITIAL_STATES: StateInfo[] = [
  { code: 'UP', name: 'Uttar Pradesh', capital: 'Lucknow', assemblySeats: 403, lokSabhaSeats: 80, population: 241000000, dominantIssues: ['Law & Order', 'Youth Jobs', 'Expressways', 'Cattle & Agro'], currentRulingParty: 'BJP', voterMood: 'pro-incumbency' },
  { code: 'MH', name: 'Maharashtra', capital: 'Mumbai', assemblySeats: 288, lokSabhaSeats: 48, population: 126000000, dominantIssues: ['Industrial Investment', 'Agrarian Relief', 'Metro Projects'], currentRulingParty: 'BJP', voterMood: 'split' },
  { code: 'WB', name: 'West Bengal', capital: 'Kolkata', assemblySeats: 294, lokSabhaSeats: 42, population: 99000000, dominantIssues: ['Welfare Cash-Transfers', 'MGNREGA Dues', 'Federal Autonomy'], currentRulingParty: 'TMC', voterMood: 'pro-incumbency' },
  { code: 'BR', name: 'Bihar', capital: 'Patna', assemblySeats: 243, lokSabhaSeats: 40, population: 130000000, dominantIssues: ['Special State Category', 'Caste Survey Relief', 'Flood Management'], currentRulingParty: 'JD(U)', voterMood: 'anti-incumbency' },
  { code: 'TN', name: 'Tamil Nadu', capital: 'Chennai', assemblySeats: 234, lokSabhaSeats: 39, population: 77000000, dominantIssues: ['Fiscal Autonomy', 'Dravidian Justice', 'Electronics & EV Hub'], currentRulingParty: 'DMK', voterMood: 'pro-incumbency' },
  { code: 'MP', name: 'Madhya Pradesh', capital: 'Bhopal', assemblySeats: 230, lokSabhaSeats: 29, population: 85000000, dominantIssues: ['Ladli Behna Scheme', 'Irrigation & Farming', 'Tribal Welfare'], currentRulingParty: 'BJP', voterMood: 'pro-incumbency' },
  { code: 'KA', name: 'Karnataka', capital: 'Bengaluru', assemblySeats: 224, lokSabhaSeats: 28, population: 68000000, dominantIssues: ['Five Guarantees', 'Tech Capital Infra', 'Cauvery Water Sharing'], currentRulingParty: 'INC', voterMood: 'split' },
  { code: 'GJ', name: 'Gujarat', capital: 'Gandhinagar', assemblySeats: 182, lokSabhaSeats: 26, population: 71000000, dominantIssues: ['GIFT City & Finance', 'Semiconductor Hub', 'Solar Corridors'], currentRulingParty: 'BJP', voterMood: 'pro-incumbency' },
  { code: 'RJ', name: 'Rajasthan', capital: 'Jaipur', assemblySeats: 200, lokSabhaSeats: 25, population: 81000000, dominantIssues: ['ERCP Water Project', 'Paper Leak Crackdown', 'Solar Fields'], currentRulingParty: 'BJP', voterMood: 'split' },
  { code: 'AP', name: 'Andhra Pradesh', capital: 'Amaravati', assemblySeats: 175, lokSabhaSeats: 25, population: 53000000, dominantIssues: ['Amaravati Construction', 'Polavaram Dam', 'Youth Employment'], currentRulingParty: 'TDP', voterMood: 'pro-incumbency' },
  { code: 'OD', name: 'Odisha', capital: 'Bhubaneswar', assemblySeats: 147, lokSabhaSeats: 21, population: 46000000, dominantIssues: ['Mining Royalties', 'Coastal Disaster Resilience', 'Heritage Corridors'], currentRulingParty: 'BJP', voterMood: 'pro-incumbency' },
  { code: 'KL', name: 'Kerala', capital: 'Thiruvananthapuram', assemblySeats: 140, lokSabhaSeats: 20, population: 35000000, dominantIssues: ['Fiscal Space & Loans', 'Higher Education', 'Expatriate Welfare'], currentRulingParty: 'CPI(M)', voterMood: 'split' },
  { code: 'TS', name: 'Telangana', capital: 'Hyderabad', assemblySeats: 119, lokSabhaSeats: 17, population: 39000000, dominantIssues: ['Rythu Bharosa', 'Pharma City & AI City', 'Loan Waiver Scheme'], currentRulingParty: 'INC', voterMood: 'pro-incumbency' },
  { code: 'PB', name: 'Punjab', capital: 'Chandigarh', assemblySeats: 117, lokSabhaSeats: 13, population: 31000000, dominantIssues: ['Legal Guarantee on MSP', 'Groundwater Table', 'Anti-Drug Action'], currentRulingParty: 'AAP', voterMood: 'anti-incumbency' },
  { code: 'DL', name: 'NCT of Delhi', capital: 'New Delhi', assemblySeats: 70, lokSabhaSeats: 7, population: 21000000, dominantIssues: ['Statehood Powers', 'Air Quality Combat', 'Education & Health Clinics'], currentRulingParty: 'AAP', voterMood: 'split' },
  { code: 'JK', name: 'Jammu & Kashmir', capital: 'Srinagar / Jammu', assemblySeats: 90, lokSabhaSeats: 5, population: 14000000, dominantIssues: ['Statehood Restoration', 'Hydro Power Rights', 'Tourism & Apple Orchards'], currentRulingParty: 'NC', voterMood: 'pro-incumbency' }
];

export const INITIAL_CONSTITUENCIES: ConstituencyInfo[] = [
  { id: 'c-1', stateCode: 'UP', number: 77, name: 'Varanasi', type: 'lok_sabha', category: 'GEN', registeredVoters: 1860000, urbanRatio: 0.65, dominantIssues: ['Ganga Rejuvenation', 'Temple Corridor', 'Silk Weavers'], previousWinner: { party: 'BJP', candidate: 'Narendra Modi', margin: 152513 } },
  { id: 'c-2', stateCode: 'GJ', number: 6, name: 'Gandhinagar', type: 'lok_sabha', category: 'GEN', registeredVoters: 1980000, urbanRatio: 0.82, dominantIssues: ['Urban Mobility', 'GIFT City Finance', 'Renewable Energy'], previousWinner: { party: 'BJP', candidate: 'Amit Shah', margin: 744716 } },
  { id: 'c-3', stateCode: 'KL', number: 4, name: 'Wayanad', type: 'lok_sabha', category: 'GEN', registeredVoters: 1460000, urbanRatio: 0.18, dominantIssues: ['Man-Animal Conflict', 'Night Traffic Ban', 'Spices Farming'], previousWinner: { party: 'INC', candidate: 'Rahul Gandhi', margin: 364422 } },
  { id: 'c-4', stateCode: 'MH', number: 35, name: 'Baramati', type: 'lok_sabha', category: 'GEN', registeredVoters: 2150000, urbanRatio: 0.38, dominantIssues: ['Sugar Cooperative Price', 'Drought Relief', 'Industrial Parks'], previousWinner: { party: 'NCP(SP)', candidate: 'Supriya Sule', margin: 158333 } },
  { id: 'c-5', stateCode: 'DL', number: 4, name: 'New Delhi', type: 'lok_sabha', category: 'GEN', registeredVoters: 1520000, urbanRatio: 0.99, dominantIssues: ['Central Vista', 'Civil Services Quarters', 'Pollution Action'], previousWinner: { party: 'BJP', candidate: 'Bansuri Swaraj', margin: 78370 } },
  { id: 'c-6', stateCode: 'KA', number: 26, name: 'Bengaluru South', type: 'lok_sabha', category: 'GEN', registeredVoters: 2240000, urbanRatio: 0.96, dominantIssues: ['Suburban Rail', 'Tech Hub Tax Incentives', 'Lake Restoration'], previousWinner: { party: 'BJP', candidate: 'Tejasvi Surya', margin: 277083 } },
  { id: 'c-7', stateCode: 'TS', number: 9, name: 'Hyderabad', type: 'lok_sabha', category: 'GEN', registeredVoters: 1950000, urbanRatio: 0.99, dominantIssues: ['Old City Metro', 'Heritage Markets', 'Minority Education'], previousWinner: { party: 'AIMIM', candidate: 'Asaduddin Owaisi', margin: 338087 } },
  { id: 'c-8', stateCode: 'UP', number: 37, name: 'Amethi', type: 'lok_sabha', category: 'GEN', registeredVoters: 1720000, urbanRatio: 0.22, dominantIssues: ['Food Park Revival', 'Rural Employment', 'Health Facilities'], previousWinner: { party: 'INC', candidate: 'Kishori Lal Sharma', margin: 167196 } },
  { id: 'c-9', stateCode: 'WB', number: 21, name: 'Diamond Harbour', type: 'lok_sabha', category: 'GEN', registeredVoters: 1840000, urbanRatio: 0.32, dominantIssues: ['Sundarbans Embankments', 'Fishermen Welfare', 'Local Stadiums'], previousWinner: { party: 'TMC', candidate: 'Abhishek Banerjee', margin: 710930 } },
  { id: 'c-10', stateCode: 'TN', number: 4, name: 'Chennai Central', type: 'lok_sabha', category: 'GEN', registeredVoters: 1360000, urbanRatio: 1.00, dominantIssues: ['Stormwater Drains', 'Port Connectivity', 'IT & Financial Corridor'], previousWinner: { party: 'DMK', candidate: 'Dayanidhi Maran', margin: 244689 } }
];

export const INITIAL_PARTIES: Party[] = [
  {
    id: 'p-bjp',
    name: 'Bharatiya Janata Party',
    abbreviation: 'BJP',
    symbolName: 'Lotus',
    primaryColor: '#FF9933',
    secondaryColor: '#138808',
    founderId: 'system-founder-1',
    presidentName: 'J.P. Nadda',
    manifestoSummary: 'Viksit Bharat by 2047, world-class expressways, high-speed rail, digital public infrastructure, and national security.',
    ideology: 'Nationalist',
    treasuryBalance: 95000000,
    memberCount: 18500,
    isNationalParty: true,
    constitutionRules: {
      internalElectionFrequencyMonths: 36,
      whipEnforced: true,
      candidateTicketCost: 50000
    }
  },
  {
    id: 'p-inc',
    name: 'Indian National Congress',
    abbreviation: 'INC',
    symbolName: 'Hand',
    primaryColor: '#1976D2',
    secondaryColor: '#388E3C',
    founderId: 'system-founder-2',
    presidentName: 'Mallikarjun Kharge',
    manifestoSummary: 'Paanch Nyay guarantees (Yuva, Kisaan, Naari, Shramik, Hissedari), legal MSP guarantee, and caste census for social justice.',
    ideology: 'Social Democratic',
    treasuryBalance: 72000000,
    memberCount: 14200,
    isNationalParty: true,
    constitutionRules: {
      internalElectionFrequencyMonths: 36,
      whipEnforced: true,
      candidateTicketCost: 40000
    }
  },
  {
    id: 'p-aap',
    name: 'Aam Aadmi Party',
    abbreviation: 'AAP',
    symbolName: 'Broom',
    primaryColor: '#0072BB',
    secondaryColor: '#F4B400',
    founderId: 'system-founder-3',
    presidentName: 'Arvind Kejriwal',
    manifestoSummary: 'World-class public schools, free mohalla clinics, clean tap water, subsidized electricity, and honest governance.',
    ideology: 'Centrist',
    treasuryBalance: 34000000,
    memberCount: 6800,
    isNationalParty: true,
    constitutionRules: {
      internalElectionFrequencyMonths: 24,
      whipEnforced: true,
      candidateTicketCost: 25000
    }
  },
  {
    id: 'p-tmc',
    name: 'All India Trinamool Congress',
    abbreviation: 'TMC',
    symbolName: 'Flowers & Grass',
    primaryColor: '#2E7D32',
    secondaryColor: '#81C784',
    founderId: 'system-founder-4',
    presidentName: 'Mamata Banerjee',
    manifestoSummary: 'Lakshmir Bhandar financial security for women, strong federal rights against central infringement, and Bengal cultural heritage.',
    ideology: 'Regional Interest',
    treasuryBalance: 41000000,
    memberCount: 7100,
    isNationalParty: false,
    constitutionRules: {
      internalElectionFrequencyMonths: 36,
      whipEnforced: true,
      candidateTicketCost: 30000
    }
  },
  {
    id: 'p-dmk',
    name: 'Dravida Munnetra Kazhagam',
    abbreviation: 'DMK',
    symbolName: 'Rising Sun',
    primaryColor: '#D32F2F',
    secondaryColor: '#000000',
    founderId: 'system-founder-5',
    presidentName: 'M.K. Stalin',
    manifestoSummary: 'Dravidian model of social equity, self-respect movement, state autonomy, and making Tamil Nadu a 1-Trillion Dollar economy.',
    ideology: 'Progressive',
    treasuryBalance: 46000000,
    memberCount: 7900,
    isNationalParty: false,
    constitutionRules: {
      internalElectionFrequencyMonths: 36,
      whipEnforced: true,
      candidateTicketCost: 35000
    }
  },
  {
    id: 'p-sp',
    name: 'Samajwadi Party',
    abbreviation: 'SP',
    symbolName: 'Bicycle',
    primaryColor: '#E53935',
    secondaryColor: '#43A047',
    founderId: 'system-founder-6',
    presidentName: 'Akhilesh Yadav',
    manifestoSummary: 'PDA unity (Pichhda, Dalit, Alpsankhyak), social justice, free agricultural electricity, and youth government recruitment drives.',
    ideology: 'Social Democratic',
    treasuryBalance: 38000000,
    memberCount: 6400,
    isNationalParty: false,
    constitutionRules: {
      internalElectionFrequencyMonths: 36,
      whipEnforced: true,
      candidateTicketCost: 30000
    }
  }
];

export const INITIAL_USER_PROFILE: PlayerProfile = {
  id: 'usr-akash-sharma',
  username: 'akash_sharma',
  displayName: 'Akash Sharma',
  avatarUrl: '/assets/image16.jpeg',
  bio: 'Democracy advocate, political strategist, and youth parliamentarian from Varanasi. Building a progressive, self-reliant Bharat.',
  stateCode: 'UP',
  constituencyName: 'Varanasi',
  currentRole: 'Candidate',
  partyId: 'p-bjp',
  partyName: 'Bharatiya Janata Party',
  partyAbbr: 'BJP',
  politicalXp: 2840,
  level: 8,
  reputationScore: 84,
  isVerified: true,
  funds: 1250000,
  badges: ['Grassroots Campaigner', 'Policy Debater', 'Verified Candidate', 'Constitution Scholar']
};

export const INITIAL_ELECTION: Election = {
  id: 'elec-ls-2026',
  title: 'GENERAL ELECTION 2030 (19th Lok Sabha)',
  type: 'lok_sabha',
  totalSeats: 543,
  majorityThreshold: 272,
  phase: 'campaigning',
  phaseTimeRemainingSeconds: 1450,
  candidatesCount: 1482,
  votedCount: 18421,
  turnoutPercentage: 67.4,
  status: 'active',
  resultsLocked: true,
  resultsReleased: false,
  votingFrozen: false,
  recountRequested: false,
  anomaliesCount: 0,
  nominationStart: '2030-04-01 09:00',
  nominationEnd: '2030-04-10 18:00',
  campaignStart: '2030-04-11 08:00',
  campaignEnd: '2030-04-28 17:00',
  votingStart: '2030-04-30 07:00',
  votingEnd: '2030-05-07 18:00',
  countingStart: '2030-05-10 08:00',
  votingSystem: 'First Past The Post',
  playerVotingEnabled: true
};

export const INITIAL_CANDIDATES: Candidate[] = [
  { id: 'cand-1', electionId: 'elec-ls-2026', constituencyId: 'c-1', constituencyName: 'Varanasi', candidateName: 'Akash Sharma', partyId: 'p-bjp', partyAbbr: 'BJP', partyColor: '#FF9933', symbolName: 'Lotus', isPlayer: true, campaignFundsSpent: 850000, projectedVotes: 740000, actualVotes: 0, voteShare: 54.2 },
  { id: 'cand-2', electionId: 'elec-ls-2026', constituencyId: 'c-1', constituencyName: 'Varanasi', candidateName: 'Ajay Rai', partyId: 'p-inc', partyAbbr: 'INC', partyColor: '#1976D2', symbolName: 'Hand', isPlayer: false, campaignFundsSpent: 620000, projectedVotes: 490000, actualVotes: 0, voteShare: 35.8 },
  { id: 'cand-3', electionId: 'elec-ls-2026', constituencyId: 'c-1', constituencyName: 'Varanasi', candidateName: 'Ather Jamal Lari', partyId: 'p-sp', partyAbbr: 'SP', partyColor: '#E53935', symbolName: 'Bicycle', isPlayer: false, campaignFundsSpent: 210000, projectedVotes: 110000, actualVotes: 0, voteShare: 8.0 },
  { id: 'cand-4', electionId: 'elec-ls-2026', constituencyId: 'c-1', constituencyName: 'Varanasi', candidateName: 'Sunil Kumar (Ind.)', partyId: undefined, partyAbbr: 'IND', partyColor: '#687386', symbolName: 'Kite', isPlayer: false, campaignFundsSpent: 45000, projectedVotes: 25000, actualVotes: 0, voteShare: 2.0 },
  
  { id: 'cand-5', electionId: 'elec-ls-2026', constituencyId: 'c-3', constituencyName: 'Wayanad', candidateName: 'Priyanka Gandhi', partyId: 'p-inc', partyAbbr: 'INC', partyColor: '#1976D2', symbolName: 'Hand', isPlayer: false, campaignFundsSpent: 900000, projectedVotes: 680000, actualVotes: 0, voteShare: 61.4 },
  { id: 'cand-6', electionId: 'elec-ls-2026', constituencyId: 'c-3', constituencyName: 'Wayanad', candidateName: 'Navya Haridas', partyId: 'p-bjp', partyAbbr: 'BJP', partyColor: '#FF9933', symbolName: 'Lotus', isPlayer: false, campaignFundsSpent: 480000, projectedVotes: 290000, actualVotes: 0, voteShare: 26.2 },

  { id: 'cand-7', electionId: 'elec-ls-2026', constituencyId: 'c-6', constituencyName: 'Bengaluru South', candidateName: 'Tejasvi Surya', partyId: 'p-bjp', partyAbbr: 'BJP', partyColor: '#FF9933', symbolName: 'Lotus', isPlayer: false, campaignFundsSpent: 920000, projectedVotes: 810000, actualVotes: 0, voteShare: 58.5 },
  { id: 'cand-8', electionId: 'elec-ls-2026', constituencyId: 'c-6', constituencyName: 'Bengaluru South', candidateName: 'Sowmya Reddy', partyId: 'p-inc', partyAbbr: 'INC', partyColor: '#1976D2', symbolName: 'Hand', isPlayer: false, campaignFundsSpent: 850000, projectedVotes: 540000, actualVotes: 0, voteShare: 39.0 }
];

export const INITIAL_BILLS: ParliamentBill[] = [
  {
    id: 'bill-1',
    title: 'Digital Public Infrastructure & AI Sovereign Compute Act, 2026',
    summary: 'Establishes the national sovereign AI compute cluster with ₹10,000 Crore fund and strict citizen data privacy guidelines.',
    category: 'Infrastructure',
    sponsorName: 'Ashwini Vaishnaw',
    sponsorParty: 'BJP',
    status: 'voting',
    clauses: [
      'Clause 1: Setup 10,000 GPU sovereign compute facility accessible to accredited Indian universities and startups.',
      'Clause 2: Mandatory algorithmic auditing and watermark protocols for synthetic deepfakes during elections.',
      'Clause 3: Strict penalty up to ₹50 Crore for unauthorized harvesting of citizen biometric credentials.'
    ],
    ayesCount: 284,
    noesCount: 142,
    inDebateNotes: [
      'Opposition raised concerns regarding committee oversight for executive data exemptions.',
      'Tech industry representatives praised open-access compute quotas for Tier-2 cities.'
    ]
  },
  {
    id: 'bill-2',
    title: 'Farmer Crop Assurance & Minimum Support Price Statutory Bill, 2026',
    summary: 'Comprehensive legal guarantee framework for C2+50% pricing formula across 23 essential agricultural commodities.',
    category: 'Public Welfare',
    sponsorName: 'Deepender Hooda',
    sponsorParty: 'INC',
    status: 'in_debate',
    clauses: [
      'Clause 1: Legal mandate ensuring no agricultural mandi can purchase below the declared statutory MSP.',
      'Clause 2: Establishment of dynamic price stabilization fund managed jointly by Centre and States.',
      'Clause 3: 100% crop insurance compensation disbursed within 14 days of satellite-verified crop damage.'
    ],
    ayesCount: 218,
    noesCount: 240,
    inDebateNotes: [
      'Treasury bench argued fiscal outflow estimates could stretch inflation index by 0.8%.',
      'Farmers organizations staged massive peaceful rallies supporting legal framework.'
    ]
  },
  {
    id: 'bill-3',
    title: 'Green Hydrogen & Clean Energy Transition Incentive Act, 2026',
    summary: 'Tax holidays and capital subsidies for solar electrolysis plants, EV battery recycling, and green ammonia export terminals.',
    category: 'Financial',
    sponsorName: 'Pralhad Joshi',
    sponsorParty: 'BJP',
    status: 'passed',
    clauses: [
      'Clause 1: 10-year GST exemption on domestic electrolyzer manufacturing.',
      'Clause 2: Sovereign green bonds target set at ₹40,000 Crore for FY 2026-27.'
    ],
    ayesCount: 392,
    noesCount: 45,
    inDebateNotes: [
      'Passed with bipartisan consensus across treasury and major regional parties.'
    ]
  }
];

export const INITIAL_DESH_POSTS: DeshPost[] = [
  {
    id: 'post-1',
    authorName: 'Narendra Modi',
    authorRole: 'Prime Minister',
    authorAvatar: '/assets/image1.jpeg',
    partyAbbr: 'BJP',
    isVerified: true,
    content: 'Addressed a massive rally in Varanasi today. The unwavering enthusiasm of my sisters and brothers inspires us to continue our tireless mission for Viksit Bharat 2047! 🇮🇳 Our focus remains on youth jobs, semiconductor hubs, and rural dignity.',
    imageUrl: '/assets/image2.jpeg',
    hashtags: ['Varanasi', 'ViksitBharat', 'LokSabha2026'],
    likesCount: 42180,
    commentsCount: 3410,
    sharesCount: 8900,
    isLiked: false,
    timestamp: '2 hours ago'
  },
  {
    id: 'post-2',
    authorName: 'Rahul Gandhi',
    authorRole: 'Opposition Leader',
    authorAvatar: '/assets/image5.jpeg',
    partyAbbr: 'INC',
    isVerified: true,
    content: 'The real voice of India lies with our farmers, youth, and marginalized communities. Our 5 Nyay guarantees are not empty promises—they are the foundational roadmap to rebuild an inclusive economy and protect the Constitution.',
    imageUrl: '/assets/image6.jpeg',
    hashtags: ['KisaanNyay', 'YuvaRozgar', 'SaveConstitution'],
    poll: {
      question: 'Which issue requires immediate priority in the upcoming Union Budget?',
      options: [
        { text: 'Legal MSP Guarantee for Farmers', votes: 1420 },
        { text: 'Youth Apprenticeship & Exam Paper Security', votes: 1980 },
        { text: 'Universal Free Healthcare Coverage', votes: 850 },
        { text: 'Urban Infrastructure & Pollution Relief', votes: 620 }
      ]
    },
    likesCount: 28940,
    commentsCount: 2150,
    sharesCount: 6420,
    isLiked: true,
    timestamp: '4 hours ago'
  },
  {
    id: 'post-3',
    authorName: 'Akash Sharma',
    authorRole: 'Candidate',
    authorAvatar: '/assets/image16.jpeg',
    partyAbbr: 'BJP',
    isVerified: true,
    content: 'Completed door-to-door public interaction in Dashashwamedh Ward, Varanasi. The youth are demanding faster technology incubation and riverfront modernization. Committed to serving every constituent with 100% dedication!',
    imageUrl: '/assets/image3.jpeg',
    hashtags: ['KashiRising', 'PublicFirst', 'GrassrootsLeadership'],
    likesCount: 3420,
    commentsCount: 390,
    sharesCount: 780,
    isLiked: false,
    timestamp: '6 hours ago'
  }
];

export const INITIAL_NEWS: NewsEventItem[] = [
  {
    id: 'news-1',
    title: 'Election Commission of India Issues Model Code of Conduct Guidelines',
    summary: 'Strict oversight announced for social media campaigns, deepfake generation, and campaign expenditures across 543 Lok Sabha seats.',
    category: 'State Elections',
    sourceName: 'Press Information Bureau (PIB)',
    verificationStatus: 'verified',
    inGameImpact: 'Campaign expenditures capped at ₹95 Lakh per parliamentary constituency.',
    publishedAt: 'Today, 10:30 AM'
  },
  {
    id: 'news-2',
    title: 'Indian Economy Registers 7.4% GDP Expansion in Q2',
    summary: 'Led by high capital goods manufacturing, service exports, and agricultural output, national fiscal health remains resilient.',
    category: 'Economy',
    sourceName: 'Ministry of Finance & RBI',
    verificationStatus: 'verified',
    inGameImpact: 'National treasury collections boosted by ₹14,000 Crore; public approval +3.5%.',
    publishedAt: 'Today, 08:15 AM'
  },
  {
    id: 'news-3',
    title: 'Supreme Court Upholds Equal Electoral Ad Allocation Rules',
    summary: 'Five-judge constitutional bench mandates transparent disclosure of political advertisements on algorithmic social media feeds.',
    category: 'Judiciary',
    sourceName: 'Bar & Bench',
    verificationStatus: 'verified',
    inGameImpact: 'DeshConnect promoted posts require verified candidate authorization badges.',
    publishedAt: 'Yesterday, 04:45 PM'
  },
  {
    id: 'news-4',
    title: 'Severe Heatwave Alert Issued Across Northern Plains & Deccan',
    summary: 'IMD sounds orange alert; State governments deploy emergency water tankers and reschedule school timings.',
    category: 'Public Welfare',
    sourceName: 'India Meteorological Department (IMD)',
    verificationStatus: 'simulation_event',
    inGameImpact: 'Disaster management funds unlocked for UP, Bihar, Rajasthan, and MH.',
    publishedAt: 'Yesterday, 02:10 PM'
  }
];

export const INITIAL_GOVERNMENT: GovernmentFormation = {
  id: 'govt-union-18',
  electionTitle: '18th Lok Sabha Government (Current Term)',
  majorityThreshold: 272,
  claimedSeats: 293,
  headOfGovernment: 'Narendra Modi',
  headOfGovernmentRole: 'Prime Minister',
  rulingParty: 'BJP',
  coalitionParties: ['BJP', 'TDP', 'JD(U)', 'SHS', 'LJP(RV)'],
  status: 'confidence_passed',
  floorTestDeadlineSeconds: 0,
  portfolios: [
    { portfolio: 'Prime Minister', ministerName: 'Narendra Modi', partyAbbr: 'BJP' },
    { portfolio: 'Minister of Home Affairs', ministerName: 'Amit Shah', partyAbbr: 'BJP' },
    { portfolio: 'Minister of Finance & Corporate Affairs', ministerName: 'Nirmala Sitharaman', partyAbbr: 'BJP' },
    { portfolio: 'Minister of External Affairs', ministerName: 'S. Jaishankar', partyAbbr: 'BJP' },
    { portfolio: 'Minister of Defence', ministerName: 'Rajnath Singh', partyAbbr: 'BJP' },
    { portfolio: 'Minister of Road Transport & Highways', ministerName: 'Nitin Gadkari', partyAbbr: 'BJP' },
    { portfolio: 'Minister of Civil Aviation', ministerName: 'K. Rammohan Naidu', partyAbbr: 'TDP' },
    { portfolio: 'Minister of Panchayati Raj & Fisheries', ministerName: 'Lalan Singh', partyAbbr: 'JD(U)' }
  ],
  floorTestVotes: {
    ayes: 293,
    noes: 234,
    abstain: 16,
    result: 'passed'
  }
};

export const INITIAL_METRICS: MacroMetrics = {
  gdpGrowthRate: 7.2,
  inflationRate: 4.6,
  unemploymentRate: 5.8,
  fiscalDeficit: 5.1,
  educationIndex: 78,
  healthcareIndex: 71,
  infrastructureScore: 84,
  publicApproval: 64,
  overallPublicApproval: 64
};

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm-1', senderName: 'Vikram Rathore (MP)', senderRole: 'MP', partyAbbr: 'BJP', avatarUrl: '/assets/image4.jpeg', channel: 'parliament', content: 'Speaker Sir, question hour regarding bullet train progress between Mumbai and Ahmedabad.', timestamp: '11:05 AM' },
  { id: 'm-2', senderName: 'Priya Das (MLA)', senderRole: 'MLA', partyAbbr: 'TMC', avatarUrl: '/assets/image8.jpeg', channel: 'parliament', content: 'We demand special discussion on federal devolution of central tax share to Bengal.', timestamp: '11:08 AM' },
  { id: 'm-3', senderName: 'Ramesh Patel', senderRole: 'Party Member', partyAbbr: 'BJP', avatarUrl: '/assets/image7.jpeg', channel: 'party', content: 'Varanasi constituency volunteer meeting scheduled at 5 PM today at party headquarters.', timestamp: '11:15 AM' },
  { id: 'm-4', senderName: 'Akash Sharma', senderRole: 'Candidate', partyAbbr: 'BJP', avatarUrl: '/assets/image16.jpeg', channel: 'all', content: 'Welcome all citizens and party members to our interactive democracy simulation portal! 🇮🇳', timestamp: '11:20 AM' }
];

// ------------------------------------------------------------------------------
// 12 CAMPAIGN STRATEGIES & INITIAL CAMPAIGN DASHBOARD
// ------------------------------------------------------------------------------

export const INITIAL_CAMPAIGN_ACTIONS: CampaignAction[] = [
  {
    id: 'camp-rally',
    type: 'rally',
    name: 'Public Rally',
    description: 'Organize a massive public rally with sound systems, stages, and broadcast vans. High visibility across the entire constituency.',
    cost: 30000,
    impactLevel: 'HIGH',
    supportGain: 4.8,
    awarenessGain: 8.5,
    reputationGain: 3.2,
    risk: 'Counter-protests or traffic friction if logistics fail.',
    icon: 'Megaphone'
  },
  {
    id: 'camp-door',
    type: 'door_to_door',
    name: 'Door-to-door Campaign',
    description: 'Personalized padayatra visiting wards, mohallas, and apartment complexes directly listening to local family grievances.',
    cost: 5000,
    impactLevel: 'MEDIUM',
    supportGain: 3.2,
    awarenessGain: 4.1,
    reputationGain: 4.5,
    risk: 'Time consuming; requires sustained grassroots physical stamina.',
    icon: 'DoorOpen'
  },
  {
    id: 'camp-social',
    type: 'social_media',
    name: 'Social Media Campaign',
    description: 'Launch targeted DeshConnect campaign videos, infographics, and youth hashtags highlighting candidate vision.',
    cost: 3000,
    impactLevel: 'MEDIUM',
    supportGain: 2.5,
    awarenessGain: 9.0,
    reputationGain: 1.8,
    risk: 'Troll brigading or opposition counter-narrative memes.',
    icon: 'Share2'
  },
  {
    id: 'camp-debate',
    type: 'debate',
    name: 'Public Debate',
    description: 'Face rival candidates live in press clubs or university auditoriums to debate jobs, infra, and governance performance.',
    cost: 0,
    impactLevel: 'VARIABLE',
    supportGain: 5.5,
    awarenessGain: 6.8,
    reputationGain: 7.2,
    risk: 'High risk: poor articulation can trigger public mockery.',
    icon: 'Mic2'
  },
  {
    id: 'camp-manifesto',
    type: 'manifesto',
    name: 'Manifesto Release',
    description: 'Publish concrete 10-point constituency pledges with measurable timelines, budget allocation, and welfare commitments.',
    cost: 12000,
    impactLevel: 'HIGH',
    supportGain: 4.0,
    awarenessGain: 7.0,
    reputationGain: 5.0,
    risk: 'Scrutinized by economic analysts for fiscal feasibility.',
    icon: 'FileText'
  },
  {
    id: 'camp-volunteer',
    type: 'volunteer',
    name: 'Volunteer Mobilization',
    description: 'Coordinate student wings and party cadres for booth management, voter slip distribution, and community kitchens.',
    cost: 7500,
    impactLevel: 'MEDIUM',
    supportGain: 3.8,
    awarenessGain: 5.2,
    reputationGain: 3.0,
    risk: 'Requires high party organizational morale.',
    icon: 'Users'
  },
  {
    id: 'camp-meeting',
    type: 'constituency_meeting',
    name: 'Constituency Ward Meeting',
    description: 'Town-hall style focused consultations with resident welfare associations, trade unions, and weaver/trader bodies.',
    cost: 4500,
    impactLevel: 'MEDIUM',
    supportGain: 3.4,
    awarenessGain: 3.8,
    reputationGain: 4.0,
    risk: 'Tough questioning on past unfulfilled promises.',
    icon: 'Building'
  },
  {
    id: 'camp-digital-ad',
    type: 'digital_ad',
    name: 'Digital & Local Cable Ads',
    description: 'High-frequency broadcast spots on regional TV channels, YouTube, and local newspaper front-page spreads.',
    cost: 20000,
    impactLevel: 'MEDIUM',
    supportGain: 3.0,
    awarenessGain: 8.0,
    reputationGain: 1.5,
    risk: 'Strict election expenditure ceiling tracking by ECI flying squads.',
    icon: 'Radio'
  },
  {
    id: 'camp-townhall',
    type: 'town_hall',
    name: 'Town Hall with Citizens',
    description: 'Open-mic citizen town hall addressing civic questions on roads, sewage, drinking water, and hospital beds.',
    cost: 8000,
    impactLevel: 'HIGH',
    supportGain: 4.5,
    awarenessGain: 6.2,
    reputationGain: 6.0,
    risk: 'Spontaneous citizen anger over municipal potholes.',
    icon: 'Landmark'
  },
  {
    id: 'camp-interview',
    type: 'media_interview',
    name: 'National Media Interview',
    description: 'Prime-time one-on-one televised interview with leading national anchors defending the party manifesto.',
    cost: 2500,
    impactLevel: 'VARIABLE',
    supportGain: 4.2,
    awarenessGain: 9.5,
    reputationGain: 5.5,
    risk: 'Sharp cross-examination on corruption or defection history.',
    icon: 'Tv'
  },
  {
    id: 'camp-alliance',
    type: 'alliance_campaign',
    name: 'Joint Alliance Campaign',
    description: 'Share stage with senior national coalition partners to demonstrate coalition strength and unified vote transfer.',
    cost: 15000,
    impactLevel: 'HIGH',
    supportGain: 6.0,
    awarenessGain: 7.5,
    reputationGain: 4.2,
    risk: 'Local factional rebellion if seat-sharing caused discontent.',
    icon: 'Handshake'
  },
  {
    id: 'camp-grassroots',
    type: 'grassroots',
    name: 'Pannapramukh Cadre Push',
    description: 'Micro-booth level strategy assigning dedicated party workers per page of the voter list to ensure 100% booth turnout.',
    cost: 10000,
    impactLevel: 'HIGH',
    supportGain: 5.2,
    awarenessGain: 4.0,
    reputationGain: 3.8,
    risk: 'Fatigue among field cadres if election is prolonged.',
    icon: 'ShieldCheck'
  }
];

export const INITIAL_CAMPAIGN_STATE: CandidateCampaignState = {
  candidateId: 'usr-akash-sharma',
  constituencyName: 'Chennai Central',
  supportEstimate: 42,
  publicAwareness: 71,
  partyOrganisation: 63,
  campaignReputation: 78,
  campaignBudget: 240000,
  issues: [
    { name: 'Youth Employment & IT Jobs', priority: 82 },
    { name: 'Roads & Stormwater Drains', priority: 68 },
    { name: 'School Education & Skill Labs', priority: 61 },
    { name: 'Affordable Healthcare Clinics', priority: 54 }
  ]
};

// ------------------------------------------------------------------------------
// PARTY HQ OFFICE BEARERS
// ------------------------------------------------------------------------------

export const INITIAL_PARTY_OFFICES: Record<string, PartyOfficeBearer[]> = {
  'p-bjp': [
    { role: 'President', memberName: 'Akash Sharma (Party Leader)', memberAvatar: '/assets/image16.jpeg', appointedAt: '2026-01-10' },
    { role: 'Vice President', memberName: 'Abishek V.', memberAvatar: '/assets/image4.jpeg', appointedAt: '2026-01-12' },
    { role: 'General Secretary', memberName: 'Guberan K.', memberAvatar: '/assets/image7.jpeg', appointedAt: '2026-01-15' },
    { role: 'Treasurer', memberName: 'Rahul Sundaram', memberAvatar: '/assets/image8.jpeg', appointedAt: '2026-01-15' },
    { role: 'Youth Wing Leader', memberName: 'Priya Narayanan', memberAvatar: '/assets/image11.jpeg', appointedAt: '2026-02-01' },
    { role: 'Spokesperson', memberName: 'Dr. Subramanian', memberAvatar: '/assets/image5.jpeg', appointedAt: '2026-02-10' },
    { role: 'Whip', memberName: 'Vikram Rathore', memberAvatar: '/assets/image4.jpeg', appointedAt: '2026-02-15' },
    { role: 'Campaign Manager', memberName: 'Devika Nair', memberAvatar: '/assets/image6.jpeg', appointedAt: '2026-03-01' }
  ],
  'p-inc': [
    { role: 'President', memberName: 'Mallikarjun Kharge', memberAvatar: '/assets/image5.jpeg', appointedAt: '2026-01-05' },
    { role: 'General Secretary', memberName: 'K.C. Venugopal', memberAvatar: '/assets/image7.jpeg', appointedAt: '2026-01-08' },
    { role: 'Treasurer', memberName: 'Ajay Maken', memberAvatar: '/assets/image8.jpeg', appointedAt: '2026-01-10' },
    { role: 'Spokesperson', memberName: 'Pawan Khera', memberAvatar: '/assets/image4.jpeg', appointedAt: '2026-01-15' }
  ]
};

// ------------------------------------------------------------------------------
// BUSINESS & PLAYER ECONOMY
// ------------------------------------------------------------------------------

export const INITIAL_BUSINESSES: Business[] = [
  {
    id: 'biz-1',
    name: 'Akash Technologies & AI Labs',
    ownerId: 'usr-akash-sharma',
    ownerName: 'Akash Sharma',
    industry: 'IT Services',
    location: 'Chennai & Bengaluru',
    capital: 500000,
    employeesCount: 14,
    monthlyRevenue: 280000,
    monthlyExpenses: 160000,
    monthlySalaryPerEmployee: 10000,
    reputation: 86,
    bankBalance: 840000,
    hasGovtContract: true
  },
  {
    id: 'biz-2',
    name: 'Bharat Green Infrastructure Ltd.',
    ownerId: 'usr-akash-sharma',
    ownerName: 'Akash Sharma',
    industry: 'Infrastructure & Construction',
    location: 'Varanasi',
    capital: 1200000,
    employeesCount: 28,
    monthlyRevenue: 450000,
    monthlyExpenses: 310000,
    monthlySalaryPerEmployee: 9000,
    reputation: 79,
    bankBalance: 1240000,
    hasGovtContract: true
  }
];

export const INITIAL_WALLET: PlayerWallet = {
  cash: 120000,
  bank: 480000,
  businessValue: 1240000,
  monthlyIncome: 82000,
  monthlyExpenses: 35000
};

export const INITIAL_SALARY_SETTINGS: PoliticalSalarySetting[] = [
  { office: 'Prime Minister', monthlySalary: 250000 },
  { office: 'Chief Minister', monthlySalary: 200000 },
  { office: 'Minister', monthlySalary: 120000 },
  { office: 'Speaker', monthlySalary: 110000 },
  { office: 'MP', monthlySalary: 100000 },
  { office: 'MLA', monthlySalary: 80000 }
];

export const INITIAL_CONFLICT_ALERTS: ConflictOfInterestAlert[] = [
  {
    id: 'conf-1',
    businessName: 'Bharat Green Infrastructure Ltd.',
    governmentDepartment: 'Ministry of Road Transport & Highways',
    contractValue: 45000000,
    status: 'pending'
  }
];

// ------------------------------------------------------------------------------
// SPEAKER ELECTION (REAL PLAYER LEGISLATIVE BALLOT)
// ------------------------------------------------------------------------------

export const INITIAL_SPEAKER_ELECTION: SpeakerElection = {
  id: 'spk-ls-2026',
  candidates: [
    { id: 'spk-c1', name: 'Akash Sharma', partyAbbr: 'BJP', partyColor: '#FF9933', votes: 98 },
    { id: 'spk-c2', name: 'Abishek V.', partyAbbr: 'INC', partyColor: '#1976D2', votes: 72 },
    { id: 'spk-c3', name: 'Guberan K.', partyAbbr: 'SP', partyColor: '#E53935', votes: 6 }
  ],
  eligibleVotersCount: 182,
  votesCastCount: 176,
  winner: 'Akash Sharma',
  status: 'concluded',
  userVotedFor: 'spk-c1'
};

// ------------------------------------------------------------------------------
// ADMIN & AUDIT LOGS ("God Mode" Action Trail)
// ------------------------------------------------------------------------------

export const INITIAL_ADMIN_AUDIT_LOGS: AdminAction[] = [
  {
    id: 'aud-1',
    adminId: 'eci-admin-01',
    adminName: 'Chief Election Commissioner Rajiv Kumar',
    action: 'CREATE_ELECTION',
    targetType: 'ELECTION',
    targetId: 'elec-ls-2026',
    previousValue: 'None',
    newValue: 'GENERAL ELECTION 2030 (19th Lok Sabha)',
    reason: 'Statutory completion of 5-year parliamentary tenure.',
    auditHash: 'SHA256:7f8a9e2d4c1b5a6f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1',
    timestamp: '2026-10-01 10:00:00'
  },
  {
    id: 'aud-2',
    adminId: 'eci-admin-01',
    adminName: 'Election Commissioner Gyanesh Kumar',
    action: 'SET_PHASE_DATES',
    targetType: 'SCHEDULE',
    targetId: 'elec-ls-2026',
    previousValue: 'DRAFT',
    newValue: 'NOMINATIONS_OPEN',
    reason: 'Gazette notification issued across 543 parliamentary constituencies.',
    auditHash: 'SHA256:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2',
    timestamp: '2026-10-02 11:30:00'
  },
  {
    id: 'aud-3',
    adminId: 'eci-admin-01',
    adminName: 'Chief Election Commissioner Rajiv Kumar',
    action: 'LOCK_RESULTS',
    targetType: 'RESULTS',
    targetId: 'elec-ls-2026',
    previousValue: 'COUNTING_IN_PROGRESS',
    newValue: 'RESULTS_LOCKED_FOR_VERIFICATION',
    reason: '543 / 543 constituencies counted. Sealed under statutory verification before official public release.',
    auditHash: 'SHA256:9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8',
    timestamp: '2026-10-03 18:45:00'
  }
];

