// ==============================================================================
// KING MAKER OF INDIAN POLITICS - CORE DOMAIN TYPES & SPECIFICATIONS
// ==============================================================================

export type UserRole = 'admin' | 'player';

export type PoliticalRole =
  | 'Citizen'
  | 'Party Member'
  | 'Party Office Bearer'
  | 'Candidate'
  | 'MLA'
  | 'MP'
  | 'Minister'
  | 'Chief Minister'
  | 'Prime Minister'
  | 'Opposition Leader'
  | 'Speaker';

export type PartyRole =
  | 'Founder'
  | 'President'
  | 'Vice President'
  | 'General Secretary'
  | 'Joint Secretary'
  | 'Treasurer'
  | 'Youth Wing Leader'
  | 'Women Wing Leader'
  | 'State President'
  | 'District President'
  | 'Spokesperson'
  | 'Whip'
  | 'Campaign Manager'
  | 'Member';

export type PartyIdeology =
  | 'Progressive'
  | 'Social Democratic'
  | 'Centrist'
  | 'Nationalist'
  | 'Conservative'
  | 'Regional Interest';

export type ElectionPhase =
  | 'draft'
  | 'scheduled'
  | 'nominations'
  | 'verification'
  | 'campaigning'
  | 'voting'
  | 'voting_closed'
  | 'counting'
  | 'results_locked'
  | 'results_declared'
  | 'completed';

export type GovernmentStatus =
  | 'negotiating'
  | 'floor_test_pending'
  | 'confidence_passed'
  | 'caretaker'
  | 'dissolved';

export type BillStatus =
  | 'draft'
  | 'introduced'
  | 'in_debate'
  | 'voting'
  | 'passed'
  | 'rejected';

export type NewsCategory =
  | 'National'
  | 'State Elections'
  | 'Economy'
  | 'Judiciary'
  | 'Defense & Diplomacy'
  | 'Public Welfare'
  | 'National Crisis';

// ------------------------------------------------------------------------------
// ADMIN & AUDIT LOGGING ("God Mode")
// ------------------------------------------------------------------------------

export interface AdminAction {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  targetType: string;
  targetId: string;
  previousValue?: string;
  newValue: string;
  reason: string;
  auditHash: string;
  timestamp: string;
}

export interface ElectionResultRelease {
  electionId: string;
  releaseTimestamp: string;
  adminId: string;
  adminName: string;
  resultVersion: string;
  totalSeats: number;
  totalVotes: number;
  auditHash: string;
  isReleased: boolean;
}

// ------------------------------------------------------------------------------
// CAMPAIGN SYSTEM (12 STRATEGIES)
// ------------------------------------------------------------------------------

export type CampaignActionType =
  | 'rally'
  | 'door_to_door'
  | 'social_media'
  | 'debate'
  | 'manifesto'
  | 'volunteer'
  | 'constituency_meeting'
  | 'digital_ad'
  | 'town_hall'
  | 'media_interview'
  | 'alliance_campaign'
  | 'grassroots';

export interface CampaignAction {
  id: string;
  type: CampaignActionType;
  name: string;
  description: string;
  cost: number;
  impactLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'VARIABLE';
  supportGain: number;
  awarenessGain: number;
  reputationGain: number;
  risk: string;
  icon: string;
}

export interface CandidateCampaignState {
  candidateId: string;
  constituencyName: string;
  supportEstimate: number; // e.g. 42%
  publicAwareness: number; // e.g. 71%
  partyOrganisation: number; // e.g. 63%
  campaignReputation: number; // e.g. 78%
  campaignBudget: number; // e.g. ₹2,40,000
  issues: {
    name: string;
    priority: number; // e.g. 82%
  }[];
}

// ------------------------------------------------------------------------------
// PARTY HQ & CANDIDATE SELECTION
// ------------------------------------------------------------------------------

export type PartyOfficeRole =
  | 'President'
  | 'Vice President'
  | 'General Secretary'
  | 'Joint Secretary'
  | 'Treasurer'
  | 'Youth Wing Leader'
  | 'Women Wing Leader'
  | 'State President'
  | 'District President'
  | 'Spokesperson'
  | 'Whip'
  | 'Campaign Manager';

export interface PartyOfficeBearer {
  role: PartyOfficeRole;
  memberName: string;
  memberAvatar?: string;
  appointedAt: string;
}

export type CandidateSelectionMethod =
  | 'leader'
  | 'primary'
  | 'member_voting'
  | 'coalition';

// ------------------------------------------------------------------------------
// DUAL CONSTITUENCY & PARTY SWITCHING RULES
// ------------------------------------------------------------------------------

export interface DualSeatWinState {
  candidateName: string;
  seatsWon: string[];
  resolved: boolean;
  retainedSeat?: string;
  vacatedSeat?: string;
}

export type PartySwitchingRuleMode = 'realistic' | 'casual' | 'custom';

export interface SeatVacancy {
  id: string;
  constituencyName: string;
  stateCode: string;
  vacatedBy: string;
  reason: 'dual_seat_resignation' | 'party_switching_defection' | 'resignation';
  byElectionScheduled: boolean;
  vacatedAt: string;
}

// ------------------------------------------------------------------------------
// BUSINESS & ECONOMY SYSTEM
// ------------------------------------------------------------------------------

export type BusinessIndustry =
  | 'IT Services'
  | 'Infrastructure & Construction'
  | 'Renewable Energy'
  | 'Agriculture & FMCG'
  | 'Media & Broadcasting'
  | 'Healthcare';

export interface Business {
  id: string;
  name: string;
  ownerId: string;
  ownerName: string;
  industry: BusinessIndustry;
  location: string;
  capital: number;
  employeesCount: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  monthlySalaryPerEmployee: number;
  reputation: number;
  bankBalance: number;
  hasGovtContract: boolean;
}

export interface PlayerWallet {
  cash: number;
  bank: number;
  businessValue: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export interface PoliticalSalarySetting {
  office: 'MP' | 'MLA' | 'Minister' | 'Chief Minister' | 'Prime Minister' | 'Speaker';
  monthlySalary: number;
}

export interface ConflictOfInterestAlert {
  id: string;
  businessName: string;
  governmentDepartment: string;
  contractValue: number;
  status: 'pending' | 'recused' | 'declared';
}

// ------------------------------------------------------------------------------
// SPEAKER ELECTION (REAL PLAYER LEGISLATIVE BALLOT)
// ------------------------------------------------------------------------------

export interface SpeakerCandidate {
  id: string;
  name: string;
  partyAbbr: string;
  partyColor: string;
  votes: number;
}

export interface SpeakerElection {
  id: string;
  candidates: SpeakerCandidate[];
  eligibleVotersCount: number;
  votesCastCount: number;
  winner?: string;
  status: 'open' | 'concluded';
  userVotedFor?: string;
}

// ------------------------------------------------------------------------------
// CORE PROFILES, ELECTIONS & ENTITIES
// ------------------------------------------------------------------------------

export interface PlayerProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  stateCode: string;
  constituencyName: string;
  currentRole: PoliticalRole;
  partyId?: string;
  partyName?: string;
  partyAbbr?: string;
  politicalXp: number;
  level: number;
  reputationScore: number;
  isVerified: boolean;
  funds: number;
  badges: string[];
}

export interface StateInfo {
  code: string;
  name: string;
  capital: string;
  assemblySeats: number;
  lokSabhaSeats: number;
  population: number;
  dominantIssues: string[];
  currentRulingParty?: string;
  voterMood?: 'pro-incumbency' | 'anti-incumbency' | 'split';
}

export interface ConstituencyInfo {
  id: string;
  stateCode: string;
  number: number;
  name: string;
  type: 'lok_sabha' | 'assembly';
  category: 'GEN' | 'SC' | 'ST';
  registeredVoters: number;
  urbanRatio: number;
  dominantIssues: string[];
  previousWinner?: {
    party: string;
    candidate: string;
    margin: number;
  };
}

export interface Party {
  id: string;
  name: string;
  abbreviation: string;
  symbolName: string;
  primaryColor: string;
  secondaryColor: string;
  founderId: string;
  presidentName: string;
  manifestoSummary: string;
  ideology: PartyIdeology;
  treasuryBalance: number;
  memberCount: number;
  isNationalParty: boolean;
  constitutionRules: {
    internalElectionFrequencyMonths: number;
    whipEnforced: boolean;
    candidateTicketCost: number;
  };
}

export interface Candidate {
  id: string;
  electionId: string;
  constituencyId: string;
  constituencyName: string;
  candidateName: string;
  partyId?: string;
  partyAbbr: string;
  partyColor: string;
  symbolName: string;
  isPlayer: boolean;
  campaignFundsSpent: number;
  projectedVotes: number;
  actualVotes: number;
  voteShare: number;
}

export interface Election {
  id: string;
  title: string;
  type: 'lok_sabha' | 'state_assembly';
  stateCode?: string;
  totalSeats: number;
  majorityThreshold: number;
  phase: ElectionPhase;
  phaseTimeRemainingSeconds: number;
  candidatesCount: number;
  votedCount: number;
  turnoutPercentage: number;
  status: 'active' | 'completed';
  
  // Admin & God Mode controls
  resultsLocked: boolean;
  resultsReleased: boolean;
  votingFrozen: boolean;
  recountRequested: boolean;
  anomaliesCount: number;
  nominationStart: string;
  nominationEnd: string;
  campaignStart: string;
  campaignEnd: string;
  votingStart: string;
  votingEnd: string;
  countingStart: string;
  votingSystem: 'First Past The Post' | 'Proportional Representation';
  playerVotingEnabled: boolean;
}

export interface ElectionResultSummary {
  electionId: string;
  totalVotesCast: number;
  seatsWonByParty: Record<string, number>;
  voteShareByParty: Record<string, number>;
  largestParty: string;
  majorityAchieved: boolean;
  turnout: number;
}

export interface GovernmentFormation {
  id: string;
  electionTitle: string;
  majorityThreshold: number;
  claimedSeats: number;
  headOfGovernment: string;
  headOfGovernmentRole: 'Prime Minister' | 'Chief Minister';
  rulingParty: string;
  coalitionParties: string[];
  status: GovernmentStatus;
  floorTestDeadlineSeconds: number;
  portfolios: {
    portfolio: string;
    ministerName: string;
    partyAbbr: string;
  }[];
  floorTestVotes?: {
    ayes: number;
    noes: number;
    abstain: number;
    result: 'passed' | 'failed' | 'pending';
  };
}

export interface ParliamentBill {
  id: string;
  title: string;
  summary: string;
  category: 'Financial' | 'Constitutional' | 'Public Welfare' | 'Security' | 'Infrastructure';
  sponsorName: string;
  sponsorParty: string;
  status: BillStatus;
  clauses: string[];
  ayesCount: number;
  noesCount: number;
  userVoted?: 'aye' | 'no' | 'abstain';
  inDebateNotes: string[];
}

export interface DeshPost {
  id: string;
  authorName: string;
  authorRole: PoliticalRole;
  authorAvatar: string;
  partyAbbr?: string;
  isVerified: boolean;
  content: string;
  imageUrl?: string;
  hashtags: string[];
  poll?: {
    question: string;
    options: { text: string; votes: number }[];
    userSelected?: number;
  };
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  timestamp: string;
}

export interface NewsEventItem {
  id: string;
  title: string;
  summary: string;
  category: NewsCategory;
  sourceName: string;
  verificationStatus: 'verified' | 'developing' | 'simulation_event';
  inGameImpact: string;
  publishedAt: string;
}

export interface MacroMetrics {
  gdpGrowthRate: number;
  inflationRate: number;
  unemploymentRate: number;
  fiscalDeficit: number;
  educationIndex: number;
  healthcareIndex: number;
  infrastructureScore: number;
  publicApproval: number;
  overallPublicApproval?: number;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: string;
  partyAbbr?: string;
  avatarUrl: string;
  channel: 'all' | 'party' | 'parliament';
  content: string;
  timestamp: string;
}
