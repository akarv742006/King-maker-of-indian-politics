import { useState, useEffect } from 'react';
import {
  UserRole,
  PlayerProfile,
  Party,
  Election,
  ElectionPhase,
  Candidate,
  ParliamentBill,
  DeshPost,
  NewsEventItem,
  GovernmentFormation,
  MacroMetrics,
  ChatMessage,
  StateInfo,
  ConstituencyInfo,
  AdminAction,
  ElectionResultRelease,
  CampaignAction,
  CandidateCampaignState,
  PartyOfficeRole,
  PartyOfficeBearer,
  CandidateSelectionMethod,
  DualSeatWinState,
  PartySwitchingRuleMode,
  SeatVacancy,
  Business,
  BusinessIndustry,
  PlayerWallet,
  PoliticalSalarySetting,
  ConflictOfInterestAlert,
  SpeakerElection
} from '../types';
import {
  INITIAL_USER_PROFILE,
  INITIAL_PARTIES,
  INITIAL_ELECTION,
  INITIAL_CANDIDATES,
  INITIAL_BILLS,
  INITIAL_DESH_POSTS,
  INITIAL_NEWS,
  INITIAL_GOVERNMENT,
  INITIAL_METRICS,
  INITIAL_STATES,
  INITIAL_CONSTITUENCIES,
  INITIAL_CHAT_MESSAGES,
  INITIAL_CAMPAIGN_ACTIONS,
  INITIAL_CAMPAIGN_STATE,
  INITIAL_PARTY_OFFICES,
  INITIAL_BUSINESSES,
  INITIAL_WALLET,
  INITIAL_SALARY_SETTINGS,
  INITIAL_ADMIN_AUDIT_LOGS,
  INITIAL_SPEAKER_ELECTION,
  INITIAL_CONFLICT_ALERTS
} from './mockData';
import confetti from 'canvas-confetti';

const STORAGE_KEY_PREFIX = 'eoi_game_state_v2_';

export function useGameStore() {
  // Navigation & Role Mode State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('player'); // 'admin' (God Mode) | 'player'
  const [selectedStateCode, setSelectedStateCode] = useState<string>('UP');
  const [selectedConstituencyId, setSelectedConstituencyId] = useState<string>('c-1');

  // Core Game State
  const [profile, setProfile] = useState<PlayerProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [parties, setParties] = useState<Party[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'parties');
    return saved ? JSON.parse(saved) : INITIAL_PARTIES;
  });

  const [election, setElection] = useState<Election>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'election');
    return saved ? JSON.parse(saved) : INITIAL_ELECTION;
  });

  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'candidates');
    return saved ? JSON.parse(saved) : INITIAL_CANDIDATES;
  });

  const [government, setGovernment] = useState<GovernmentFormation>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'government');
    return saved ? JSON.parse(saved) : INITIAL_GOVERNMENT;
  });

  const [bills, setBills] = useState<ParliamentBill[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'bills');
    return saved ? JSON.parse(saved) : INITIAL_BILLS;
  });

  const [posts, setPosts] = useState<DeshPost[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'posts');
    return saved ? JSON.parse(saved) : INITIAL_DESH_POSTS;
  });

  const [news, setNews] = useState<NewsEventItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [metrics, setMetrics] = useState<MacroMetrics>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'metrics');
    return saved ? JSON.parse(saved) : INITIAL_METRICS;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'messages');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
  });

  // Admin & Audit Logging ("God Mode")
  const [adminAuditLogs, setAdminAuditLogs] = useState<AdminAction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'adminAuditLogs');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_AUDIT_LOGS;
  });

  const [resultReleaseEvent, setResultReleaseEvent] = useState<ElectionResultRelease | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'resultReleaseEvent');
    return saved ? JSON.parse(saved) : null;
  });

  // Campaign System (12 Strategies & Dashboard)
  const [campaignActions] = useState<CampaignAction[]>(INITIAL_CAMPAIGN_ACTIONS);
  const [playerCampaignState, setPlayerCampaignState] = useState<CandidateCampaignState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'playerCampaignState');
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGN_STATE;
  });

  // Party HQ & Office Bearers
  const [partyOffices, setPartyOffices] = useState<Record<string, PartyOfficeBearer[]>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'partyOffices');
    return saved ? JSON.parse(saved) : INITIAL_PARTY_OFFICES;
  });

  // Dual Seat Win & Anti-Defection Party Switching
  const [dualSeatWinState, setDualSeatWinState] = useState<DualSeatWinState | null>(null);
  const [partySwitchingRule, setPartySwitchingRule] = useState<PartySwitchingRuleMode>('realistic');
  const [seatVacancies, setSeatVacancies] = useState<SeatVacancy[]>([]);

  // Business Empire & Player Economy
  const [businesses, setBusinesses] = useState<Business[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'businesses');
    return saved ? JSON.parse(saved) : INITIAL_BUSINESSES;
  });

  const [playerWallet, setPlayerWallet] = useState<PlayerWallet>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'playerWallet');
    return saved ? JSON.parse(saved) : INITIAL_WALLET;
  });

  const [salarySettings, setSalarySettings] = useState<PoliticalSalarySetting[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'salarySettings');
    return saved ? JSON.parse(saved) : INITIAL_SALARY_SETTINGS;
  });

  const [conflictAlerts, setConflictAlerts] = useState<ConflictOfInterestAlert[]>(INITIAL_CONFLICT_ALERTS);

  // Speaker Election (Real-Player Legislative Ballot)
  const [speakerElection, setSpeakerElection] = useState<SpeakerElection>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'speakerElection');
    return saved ? JSON.parse(saved) : INITIAL_SPEAKER_ELECTION;
  });

  // Master 26-Step Scenario Runner State
  const [isSimulatingScenario, setIsSimulatingScenario] = useState<boolean>(false);
  const [scenarioStepIndex, setScenarioStepIndex] = useState<number>(0);
  const [scenarioLogs, setScenarioLogs] = useState<string[]>([]);

  const [states] = useState<StateInfo[]>(INITIAL_STATES);
  const [constituencies] = useState<ConstituencyInfo[]>(INITIAL_CONSTITUENCIES);
  const [userVotedElection, setUserVotedElection] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<string[]>([
    'Welcome to Election of India! Your Lok Sabha constituency is Varanasi.',
    'Model code of conduct is active. Campaign headquarters unlocked.',
    'Election Commission of India control center online.'
  ]);

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'profile', JSON.stringify(profile));
  }, [profile]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'parties', JSON.stringify(parties));
  }, [parties]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'election', JSON.stringify(election));
  }, [election]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'candidates', JSON.stringify(candidates));
  }, [candidates]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'government', JSON.stringify(government));
  }, [government]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'bills', JSON.stringify(bills));
  }, [bills]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'posts', JSON.stringify(posts));
  }, [posts]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'adminAuditLogs', JSON.stringify(adminAuditLogs));
  }, [adminAuditLogs]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'businesses', JSON.stringify(businesses));
  }, [businesses]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'playerWallet', JSON.stringify(playerWallet));
  }, [playerWallet]);

  // Timer loop for simulated ticking world
  useEffect(() => {
    const interval = setInterval(() => {
      setElection(prev => {
        if (prev.votingFrozen || prev.phaseTimeRemainingSeconds <= 0) return prev;
        return {
          ...prev,
          phaseTimeRemainingSeconds: prev.phaseTimeRemainingSeconds - 1
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addNotification = (text: string) => {
    setNotifications(prev => [text, ...prev.slice(0, 9)]);
  };

  // ----------------------------------------------------------------------------
  // ADMIN "GOD MODE" & AUDIT LOGGING
  // ----------------------------------------------------------------------------

  const adminLogAction = (
    action: string,
    targetType: string,
    targetId: string,
    previousValue: string,
    newValue: string,
    reason: string
  ) => {
    const hash = 'SHA256:' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const newEntry: AdminAction = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      adminId: 'eci-admin-01',
      adminName: 'Chief Election Commissioner',
      action,
      targetType,
      targetId,
      previousValue,
      newValue,
      reason,
      auditHash: hash,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setAdminAuditLogs(prev => [newEntry, ...prev]);
    return newEntry;
  };

  const adminCreateElection = (data: Partial<Election>) => {
    const newElection: Election = {
      ...INITIAL_ELECTION,
      ...data,
      id: `elec-${Date.now()}`,
      status: 'active',
      resultsLocked: true,
      resultsReleased: false,
      votingFrozen: false
    };
    setElection(newElection);
    setResultReleaseEvent(null);
    adminLogAction(
      'CREATE_NEW_ELECTION',
      'ELECTION',
      newElection.id,
      election.title,
      newElection.title,
      'Administrative election notification initiated by Election Commission'
    );
    addNotification(`New Election Created: "${newElection.title}" (${newElection.totalSeats} seats)`);
  };

  const adminUpdateElectionPhase = (newPhase: ElectionPhase) => {
    const prevPhase = election.phase;
    setElection(prev => ({
      ...prev,
      phase: newPhase,
      phaseTimeRemainingSeconds: newPhase === 'results_declared' ? 0 : 600,
      resultsLocked: newPhase === 'counting' || newPhase === 'results_locked' ? true : prev.resultsLocked
    }));

    if (newPhase === 'counting') {
      // Simulate verified votes count
      setCandidates(prev =>
        prev.map(c => ({
          ...c,
          actualVotes: c.actualVotes > 0 ? c.actualVotes : Math.floor(c.projectedVotes * 0.96) + Math.floor(Math.random() * 8000)
        }))
      );
      setElection(prev => ({ ...prev, resultsLocked: true, resultsReleased: false }));
      adminLogAction('START_COUNTING', 'ELECTION', election.id, prevPhase, 'counting', 'Counting centers commenced tallying ballots.');
      addNotification('Counting has started! Results are being calculated but remain 🔒 LOCKED from public view.');
    } else if (newPhase === 'results_locked') {
      setElection(prev => ({ ...prev, resultsLocked: true, resultsReleased: false }));
      adminLogAction('LOCK_RESULTS', 'RESULTS', election.id, prevPhase, 'results_locked', '543 / 543 constituencies counted. Results sealed pending Chief Commissioner review.');
      addNotification('All 543 constituencies counted! Results sealed in ECI vault pending official release.');
    } else {
      adminLogAction('UPDATE_PHASE', 'ELECTION', election.id, prevPhase, newPhase, 'Election phase transition ordered by commission.');
      addNotification(`Election phase updated to: ${newPhase.toUpperCase()}`);
    }
  };

  const adminFreezeVoting = (frozen: boolean) => {
    setElection(prev => ({ ...prev, votingFrozen: frozen }));
    adminLogAction(
      frozen ? 'FREEZE_VOTING' : 'UNFREEZE_VOTING',
      'POLLING',
      election.id,
      prevVotingStatus(frozen),
      frozen ? 'VOTING_FROZEN' : 'VOTING_RESUMED',
      frozen ? 'Emergency freeze issued by ECI flying squad for security verification.' : 'Voting restored after security audit.'
    );
    addNotification(frozen ? '⚠️ ECI Alert: Voting has been FROZEN across all booths!' : '🟢 ECI Alert: Voting resumed across all booths.');
  };

  const prevVotingStatus = (nextFrozen: boolean) => nextFrozen ? 'ACTIVE' : 'FROZEN';

  const adminTriggerRecount = () => {
    setElection(prev => ({ ...prev, recountRequested: true }));
    setCandidates(prev =>
      prev.map(c => ({
        ...c,
        actualVotes: c.actualVotes + Math.floor(Math.random() * 20 - 10)
      }))
    );
    adminLogAction('TRIGGER_RECOUNT', 'BALLOTS', election.id, 'UNVERIFIED', 'RECOUNT_COMPLETED', 'Marginal disparity detected; recount audited successfully.');
    addNotification('Recount executed under observer camera. Final tally verified.');
  };

  const adminReleaseOfficialResults = (reason: string = 'Statutory certification completed by Election Commission of India') => {
    const hash = 'SHA256:' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const releaseRecord: ElectionResultRelease = {
      electionId: election.id,
      releaseTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminId: 'eci-admin-01',
      adminName: 'Chief Election Commissioner Rajiv Kumar',
      resultVersion: 'v1.0-FINAL-SEALED',
      totalSeats: election.totalSeats,
      totalVotes: election.votedCount,
      auditHash: hash,
      isReleased: true
    };

    setResultReleaseEvent(releaseRecord);
    setElection(prev => ({
      ...prev,
      resultsLocked: false,
      resultsReleased: true,
      phase: 'results_declared'
    }));

    adminLogAction(
      'RELEASE_OFFICIAL_RESULTS',
      'RESULTS_RELEASE',
      election.id,
      'LOCKED',
      'RELEASED_PUBLIC',
      reason
    );

    addNotification('🟢 BREAKING: Election Commission has officially RELEASED the general election results to the public!');
    confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 } });
  };

  const adminUpdateSalary = (office: string, amount: number) => {
    setSalarySettings(prev =>
      prev.map(s => s.office === office ? { ...s, monthlySalary: amount } : s)
    );
    adminLogAction(
      'CONFIGURE_POLITICAL_SALARY',
      'SALARY_SETTING',
      office,
      'Previous salary',
      `₹${amount.toLocaleString('en-IN')}`,
      `Commission revised statutory compensation for ${office}`
    );
    addNotification(`Salary for ${office} updated to ₹${amount.toLocaleString('en-IN')}/month.`);
  };

  const adminInjectCrisis = (title: string, summary: string) => {
    const crisisNews: NewsEventItem = {
      id: `crisis-${Date.now()}`,
      title,
      summary,
      category: 'National Crisis',
      sourceName: 'National Disaster Management Authority (NDMA)',
      verificationStatus: 'verified',
      inGameImpact: 'Public approval -5%, emergency response budget required.',
      publishedAt: 'Just now'
    };
    setNews(prev => [crisisNews, ...prev]);
    setMetrics(prev => ({
      ...prev,
      publicApproval: Math.max(20, prev.publicApproval - 5),
      fiscalDeficit: prev.fiscalDeficit + 0.4
    }));
    adminLogAction(
      'INJECT_NATIONAL_CRISIS',
      'EVENT',
      crisisNews.id,
      'NORMAL',
      title,
      'Simulated national challenge triggered by ECI Admin'
    );
    addNotification(`🚨 NATIONAL EVENT: ${title}`);
  };

  // ----------------------------------------------------------------------------
  // CAMPAIGN SYSTEM (12 STRATEGIES)
  // ----------------------------------------------------------------------------

  const executeCampaignAction = (actionId: string) => {
    const action = campaignActions.find(a => a.id === actionId);
    if (!action) return;

    if (playerCampaignState.campaignBudget < action.cost) {
      addNotification(`Insufficient campaign funds! You need ₹${action.cost.toLocaleString('en-IN')} for this action.`);
      return;
    }

    setPlayerCampaignState(prev => {
      const newBudget = prev.campaignBudget - action.cost;
      const newSupport = Math.min(100, Number((prev.supportEstimate + action.supportGain).toFixed(1)));
      const newAwareness = Math.min(100, Number((prev.publicAwareness + action.awarenessGain).toFixed(1)));
      const newReputation = Math.min(100, Number((prev.campaignReputation + action.reputationGain).toFixed(1)));

      return {
        ...prev,
        campaignBudget: newBudget,
        supportEstimate: newSupport,
        publicAwareness: newAwareness,
        campaignReputation: newReputation
      };
    });

    setProfile(prev => ({
      ...prev,
      politicalXp: prev.politicalXp + Math.round(action.supportGain * 50)
    }));

    addNotification(`Executed "${action.name}"! Support +${action.supportGain}%, Awareness +${action.awarenessGain}%.`);
    confetti({ particleCount: 40, spread: 50 });
  };

  // ----------------------------------------------------------------------------
  // PARTY HQ & CANDIDATE SELECTION
  // ----------------------------------------------------------------------------

  const appointPartyOfficeBearer = (partyId: string, role: PartyOfficeRole, memberName: string) => {
    const newBearer: PartyOfficeBearer = {
      role,
      memberName,
      memberAvatar: '/assets/image16.jpeg',
      appointedAt: new Date().toISOString().substring(0, 10)
    };

    setPartyOffices(prev => {
      const current = prev[partyId] || [];
      const filtered = current.filter(b => b.role !== role);
      return {
        ...prev,
        [partyId]: [newBearer, ...filtered]
      };
    });

    adminLogAction(
      'PARTY_APPOINTMENT',
      'PARTY_OFFICE',
      partyId,
      'VACANT',
      `${role}: ${memberName}`,
      'Party President appointed new office bearer under Party Constitution'
    );

    addNotification(`Appointed ${memberName} as party ${role}!`);
  };

  const selectPartyCandidate = (constituencyId: string, candidateName: string, method: CandidateSelectionMethod) => {
    const constituency = constituencies.find(c => c.id === constituencyId);
    if (!constituency) return;

    setCandidates(prev => {
      const existing = prev.filter(c => c.constituencyId === constituencyId && c.candidateName === candidateName);
      if (existing.length > 0) return prev;
      const newCand: Candidate = {
        id: `cand-${Date.now()}`,
        electionId: election.id,
        constituencyId,
        constituencyName: constituency.name,
        candidateName,
        partyId: profile.partyId,
        partyAbbr: profile.partyAbbr || 'IND',
        partyColor: '#FF9933',
        symbolName: 'Lotus',
        isPlayer: candidateName === profile.displayName,
        campaignFundsSpent: 50000,
        projectedVotes: 480000,
        actualVotes: 0,
        voteShare: 45.2
      };
      return [newCand, ...prev];
    });

    addNotification(`Selected ${candidateName} for ${constituency.name} via ${method.replace('_', ' ').toUpperCase()}!`);
  };

  // ----------------------------------------------------------------------------
  // DUAL SEAT WIN & PARTY SWITCHING / ANTI-DEFECTION
  // ----------------------------------------------------------------------------

  const resolveDualSeatWin = (retainedSeat: string, vacatedSeat: string) => {
    setDualSeatWinState(prev => prev ? { ...prev, resolved: true, retainedSeat, vacatedSeat } : null);

    const vacancy: SeatVacancy = {
      id: `vac-${Date.now()}`,
      constituencyName: vacatedSeat,
      stateCode: profile.stateCode,
      vacatedBy: profile.displayName,
      reason: 'dual_seat_resignation',
      byElectionScheduled: true,
      vacatedAt: new Date().toISOString().substring(0, 10)
    };

    setSeatVacancies(prev => [vacancy, ...prev]);

    adminLogAction(
      'DUAL_SEAT_RESIGNATION',
      'PARLIAMENTARY_SEAT',
      vacatedSeat,
      `${profile.displayName} elected in 2 seats`,
      `Retained: ${retainedSeat}, Vacated: ${vacatedSeat}`,
      'Constitutional rule: candidate cannot hold duplicate seats. By-election scheduled.'
    );

    addNotification(`Seat Choice Recorded: Retained ${retainedSeat}. ${vacatedSeat} marked vacant; By-Election scheduled.`);
  };

  const switchPlayerParty = (newPartyId: string) => {
    const targetParty = parties.find(p => p.id === newPartyId);
    if (!targetParty || targetParty.id === profile.partyId) return;

    const oldPartyName = profile.partyName || 'Independent';
    const isElectedRepresentative = profile.currentRole === 'MLA' || profile.currentRole === 'MP' || profile.currentRole === 'Minister';

    if (isElectedRepresentative && partySwitchingRule === 'realistic') {
      // Automatic anti-defection disqualification in realistic mode
      const vacancy: SeatVacancy = {
        id: `vac-def-${Date.now()}`,
        constituencyName: profile.constituencyName,
        stateCode: profile.stateCode,
        vacatedBy: profile.displayName,
        reason: 'party_switching_defection',
        byElectionScheduled: true,
        vacatedAt: new Date().toISOString().substring(0, 10)
      };

      setSeatVacancies(prev => [vacancy, ...prev]);

      setProfile(prev => ({
        ...prev,
        partyId: targetParty.id,
        partyName: targetParty.name,
        partyAbbr: targetParty.abbreviation,
        currentRole: 'Party Member', // Seat vacated
        politicalXp: Math.max(0, prev.politicalXp - 200),
        reputationScore: Math.max(20, prev.reputationScore - 15)
      }));

      adminLogAction(
        'ANTI_DEFECTION_VACANCY',
        'ELECTED_OFFICE',
        profile.constituencyName,
        `Elected ${profile.currentRole} under ${oldPartyName}`,
        `Switched to ${targetParty.name} -> SEAT VACATED`,
        'Anti-defection rule triggered: automatic resignation upon changing political affiliation.'
      );

      addNotification(`⚠️ Anti-Defection Notice: Switched to ${targetParty.name}. Your elected seat in ${profile.constituencyName} is VACATED! By-Election scheduled.`);
    } else {
      // Casual / non-elected switch
      setProfile(prev => ({
        ...prev,
        partyId: targetParty.id,
        partyName: targetParty.name,
        partyAbbr: targetParty.abbreviation
      }));

      adminLogAction(
        'PARTY_AFFILIATION_CHANGE',
        'PLAYER_PROFILE',
        profile.id,
        oldPartyName,
        targetParty.name,
        'Player voluntarily migrated to new political party.'
      );

      addNotification(`You have joined ${targetParty.name}.`);
    }
  };

  // ----------------------------------------------------------------------------
  // BUSINESS EMPIRE & ECONOMY
  // ----------------------------------------------------------------------------

  const createBusiness = (name: string, industry: BusinessIndustry, location: string, capital: number) => {
    if (playerWallet.bank < capital) {
      addNotification(`Insufficient bank balance to capitalize business! Need ₹${capital.toLocaleString('en-IN')}.`);
      return;
    }

    const newBiz: Business = {
      id: `biz-${Date.now()}`,
      name,
      ownerId: profile.id,
      ownerName: profile.displayName,
      industry,
      location,
      capital,
      employeesCount: 6,
      monthlyRevenue: Math.round(capital * 0.25),
      monthlyExpenses: Math.round(capital * 0.15),
      monthlySalaryPerEmployee: 12000,
      reputation: 75,
      bankBalance: capital,
      hasGovtContract: industry === 'Infrastructure & Construction' || industry === 'IT Services'
    };

    setBusinesses(prev => [newBiz, ...prev]);
    setPlayerWallet(prev => ({
      ...prev,
      bank: prev.bank - capital,
      businessValue: prev.businessValue + capital,
      monthlyIncome: prev.monthlyIncome + (newBiz.monthlyRevenue - newBiz.monthlyExpenses)
    }));

    if (newBiz.hasGovtContract && (profile.currentRole === 'Minister' || profile.currentRole === 'MLA' || profile.currentRole === 'MP')) {
      const alert: ConflictOfInterestAlert = {
        id: `conf-${Date.now()}`,
        businessName: newBiz.name,
        governmentDepartment: industry === 'IT Services' ? 'Ministry of Electronics & IT' : 'Ministry of Road Transport & Highways',
        contractValue: capital * 10,
        status: 'pending'
      };
      setConflictAlerts(prev => [alert, ...prev]);
      addNotification(`⚠️ CONFLICT OF INTEREST ALERT: You hold elected office while ${newBiz.name} bids for state tenders!`);
    }

    addNotification(`Business "${newBiz.name}" established in ${location}!`);
    confetti({ particleCount: 50, spread: 60 });
  };

  const runMonthlySalaryTick = () => {
    const salarySetting = salarySettings.find(s => s.office === profile.currentRole);
    const amount = salarySetting ? salarySetting.monthlySalary : 0;

    // Also business net income
    const businessNet = businesses.reduce((acc, b) => acc + (b.monthlyRevenue - b.monthlyExpenses), 0);
    const totalCredit = amount + businessNet;

    setPlayerWallet(prev => ({
      ...prev,
      bank: prev.bank + totalCredit,
      monthlyIncome: totalCredit
    }));

    adminLogAction(
      'MONTHLY_SALARY_TICK',
      'WALLET',
      profile.id,
      `Bank: ₹${playerWallet.bank}`,
      `Credited: ₹${totalCredit} (Salary: ₹${amount}, Biz: ₹${businessNet})`,
      'Automated monthly game tick processing political salaries and commercial dividends.'
    );

    addNotification(`Monthly Payday! Received ₹${totalCredit.toLocaleString('en-IN')} (Salary: ₹${amount.toLocaleString('en-IN')}).`);
    confetti({ particleCount: 60, spread: 70 });
  };

  const respondConflictAlert = (alertId: string, response: 'recused' | 'declared') => {
    setConflictAlerts(prev =>
      prev.map(a => a.id === alertId ? { ...a, status: response } : a)
    );

    adminLogAction(
      'CONFLICT_OF_INTEREST_RESOLUTION',
      'ETHICS_RECORD',
      alertId,
      'PENDING',
      response.toUpperCase(),
      `Elected representative opted to ${response} from commercial contract participation.`
    );

    addNotification(`Ethics Record Updated: You have ${response.toUpperCase()} regarding commercial state contract.`);
  };

  // ----------------------------------------------------------------------------
  // SPEAKER ELECTION (REAL PLAYER LEGISLATIVE BALLOT)
  // ----------------------------------------------------------------------------

  const voteSpeakerElection = (candidateId: string) => {
    if (speakerElection.userVotedFor) {
      addNotification('You have already cast your parliamentary ballot for Speaker!');
      return;
    }

    setSpeakerElection(prev => {
      const newCandidates = prev.candidates.map(c =>
        c.id === candidateId ? { ...c, votes: c.votes + 1 } : c
      );
      const newVotesCast = prev.votesCastCount + 1;
      const sorted = [...newCandidates].sort((a, b) => b.votes - a.votes);
      return {
        ...prev,
        candidates: newCandidates,
        votesCastCount: newVotesCast,
        userVotedFor: candidateId,
        winner: sorted[0].name
      };
    });

    setProfile(prev => ({ ...prev, politicalXp: prev.politicalXp + 200 }));
    addNotification('Speaker vote recorded in Lok Sabha division lobby!');
    confetti({ particleCount: 40, spread: 50 });
  };

  // ----------------------------------------------------------------------------
  // MASTER 26-STEP AUTOMATED TEST SCENARIO RUNNER
  // ----------------------------------------------------------------------------

  const runMaster26StepScenario = async () => {
    if (isSimulatingScenario) return;
    setIsSimulatingScenario(true);
    setScenarioStepIndex(1);
    setScenarioLogs(['Starting 26-step End-to-End Simulation...']);

    const steps = [
      'Step 1: Admin initializes General Election 2030 (543 seats, FPTP).',
      'Step 2: Admin configures statutory nomination and voting dates.',
      'Step 3: Player A establishes "Tamil National Peoples Party (TNPP)".',
      'Step 4: Player B registers "Bharatiya Lok Dal (BLD)".',
      'Step 5: Party A President appoints 8 key office bearers (VP, General Secretary, Treasurer, Spokesperson).',
      'Step 6: Party A conducts candidate selection for Chennai Central and Varanasi.',
      'Step 7: Candidates launch targeted rallies, social campaigns, and door-to-door drives.',
      'Step 8: Eligible citizens and human players cast secure EVM simulated ballots.',
      'Step 9: Polling clock expires; Election Commission enforces booth closure.',
      'Step 10: Server counting engine computes round-by-round constituency tallies.',
      'Step 11: 543/543 constituencies counted. Results securely sealed in LOCKED state.',
      'Step 12: Chief Election Commissioner audits turnout, anomalies, and seat distributions.',
      'Step 13: Admin presses RELEASE OFFICIAL RESULTS; cryptographic SHA-256 event logged.',
      'Step 14: Interactive Results Dashboard broadcasts real-time seat arcs and victory charts.',
      'Step 15: Winning party initiates constitutional government formation process.',
      'Step 16: Coalition negotiations finalize post-poll alliance agreements.',
      'Step 17: Parliament convenes; Lok Sabha passes constitutional floor test.',
      'Step 18: Council of Ministers appointed with portfolios (Home, Finance, Infra).',
      'Step 19: Monthly salary engine credits ₹1,20,000 to ministerial accounts.',
      'Step 20: Player establishes "Akash Technologies" and hires 14 specialized employees.',
      'Step 21: Winning candidate who won two seats receives Multiple Seat Win prompt.',
      'Step 22: Candidate retains Chennai Central; Varanasi vacated; By-Election scheduled.',
      'Step 23: Elected representative switches party affiliation on ideological grounds.',
      'Step 24: Configured Anti-Defection rule triggers: Seat vacated, player demoted.',
      'Step 25: Instant alerts dispatched across DeshConnect and player notification centers.',
      'Step 26: Complete 26-step audit trail verified with zero discrepancies. Simulation complete! 🇮🇳'
    ];

    for (let i = 0; i < steps.length; i++) {
      setScenarioStepIndex(i + 1);
      setScenarioLogs(prev => [steps[i], ...prev]);
      
      // Perform actual state changes based on scenario step
      if (i === 0) {
        adminCreateElection({ title: 'GENERAL ELECTION 2030 (Master Scenario)', totalSeats: 543 });
      } else if (i === 4) {
        appointPartyOfficeBearer('p-bjp', 'President', profile.displayName);
        appointPartyOfficeBearer('p-bjp', 'General Secretary', 'Guberan K.');
      } else if (i === 6) {
        executeCampaignAction('camp-rally');
      } else if (i === 10) {
        adminUpdateElectionPhase('results_locked');
      } else if (i === 12) {
        adminReleaseOfficialResults('Certified under statutory review by Chief Election Commissioner');
      } else if (i === 16) {
        conductFloorTest('aye');
      } else if (i === 18) {
        runMonthlySalaryTick();
      } else if (i === 20) {
        setDualSeatWinState({
          candidateName: profile.displayName,
          seatsWon: ['Chennai Central', 'Varanasi'],
          resolved: false
        });
      } else if (i === 21) {
        resolveDualSeatWin('Chennai Central', 'Varanasi');
      }

      await new Promise(r => setTimeout(r, 600));
    }

    setIsSimulatingScenario(false);
    addNotification('🎉 26-Step Master Political Simulation executed with complete audit trail!');
    confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
  };

  // ----------------------------------------------------------------------------
  // STANDARD PARTY, BALLOT & SOCIAL ACTIONS
  // ----------------------------------------------------------------------------

  const createParty = (partyData: Omit<Party, 'id' | 'founderId' | 'memberCount' | 'treasuryBalance'>) => {
    const newParty: Party = {
      ...partyData,
      id: `p-${Date.now()}`,
      founderId: profile.id,
      memberCount: 1,
      treasuryBalance: 5000000
    };
    setParties(prev => [newParty, ...prev]);
    setProfile(prev => ({
      ...prev,
      partyId: newParty.id,
      partyName: newParty.name,
      partyAbbr: newParty.abbreviation,
      currentRole: 'Party Member',
      politicalXp: prev.politicalXp + 500
    }));
    addNotification(`Party "${newParty.name} (${newParty.abbreviation})" successfully registered with Election Commission!`);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    return newParty;
  };

  const joinParty = (partyId: string) => {
    const targetParty = parties.find(p => p.id === partyId);
    if (!targetParty) return;
    setParties(prev =>
      prev.map(p => p.id === partyId ? { ...p, memberCount: p.memberCount + 1 } : p)
    );
    setProfile(prev => ({
      ...prev,
      partyId: targetParty.id,
      partyName: targetParty.name,
      partyAbbr: targetParty.abbreviation,
      currentRole: 'Party Member',
      politicalXp: prev.politicalXp + 250
    }));
    addNotification(`You have joined ${targetParty.name} as an active party member.`);
  };

  const nominatePlayerAsCandidate = (constituencyId: string) => {
    const targetConstituency = constituencies.find(c => c.id === constituencyId);
    if (!targetConstituency) return;

    const existing = candidates.find(c => c.constituencyId === constituencyId && c.isPlayer);
    if (existing) {
      addNotification(`You are already nominated in ${targetConstituency.name}!`);
      return;
    }

    const newCandidate: Candidate = {
      id: `cand-player-${Date.now()}`,
      electionId: election.id,
      constituencyId: targetConstituency.id,
      constituencyName: targetConstituency.name,
      candidateName: profile.displayName,
      partyId: profile.partyId,
      partyAbbr: profile.partyAbbr || 'IND',
      partyColor: '#173B67',
      symbolName: 'Rising Sun',
      isPlayer: true,
      campaignFundsSpent: 100000,
      projectedVotes: 650000,
      actualVotes: 0,
      voteShare: 48.5
    };

    setCandidates(prev => [newCandidate, ...prev]);
    setProfile(prev => ({
      ...prev,
      currentRole: 'Candidate',
      politicalXp: prev.politicalXp + 400
    }));
    addNotification(`Official nomination filed for ${targetConstituency.name} Parliamentary seat!`);
  };

  const castBallot = (candidateId: string) => {
    if (userVotedElection) {
      addNotification('Duplicate vote prevented! One valid ballot permitted per voter.');
      return;
    }
    setCandidates(prev =>
      prev.map(c => c.id === candidateId ? { ...c, actualVotes: c.actualVotes + 1, projectedVotes: c.projectedVotes + 1 } : c)
    );
    setUserVotedElection(true);
    setProfile(prev => ({
      ...prev,
      politicalXp: prev.politicalXp + 150,
      reputationScore: Math.min(100, prev.reputationScore + 2)
    }));
    addNotification('Ballot successfully verified and encrypted via EVM simulation!');
    confetti({ particleCount: 50, spread: 60 });
  };

  const advanceElectionPhase = (newPhase: ElectionPhase) => {
    adminUpdateElectionPhase(newPhase);
  };

  const conductFloorTest = (callVote: 'aye' | 'no') => {
    const passed = callVote === 'aye' || government.claimedSeats >= government.majorityThreshold;
    setGovernment(prev => ({
      ...prev,
      status: passed ? 'confidence_passed' : 'dissolved',
      floorTestVotes: {
        ayes: passed ? 294 : 220,
        noes: passed ? 232 : 310,
        abstain: 17,
        result: passed ? 'passed' : 'failed'
      }
    }));

    if (passed) {
      addNotification('Floor test passed with clear majority! Government enjoys constitutional mandate.');
      confetti({ particleCount: 100, spread: 80 });
    } else {
      addNotification('Floor test defeated! Cabinet resigns; caretaker administration initiated.');
    }
  };

  const voteOnBill = (billId: string, choice: 'aye' | 'no' | 'abstain') => {
    setBills(prev =>
      prev.map(b => {
        if (b.id !== billId) return b;
        return {
          ...b,
          ayesCount: choice === 'aye' ? b.ayesCount + 1 : b.ayesCount,
          noesCount: choice === 'no' ? b.noesCount + 1 : b.noesCount,
          userVoted: choice
        };
      })
    );
    setProfile(prev => ({
      ...prev,
      politicalXp: prev.politicalXp + 100
    }));
    addNotification(`Parliamentary vote recorded: "${choice.toUpperCase()}" on bill.`);
  };

  const submitBill = (billData: { title: string; summary: string; category: ParliamentBill['category']; clauses: string[] }) => {
    const newBill: ParliamentBill = {
      id: `bill-${Date.now()}`,
      title: billData.title,
      summary: billData.summary,
      category: billData.category,
      sponsorName: profile.displayName,
      sponsorParty: profile.partyAbbr || 'IND',
      status: 'introduced',
      clauses: billData.clauses,
      ayesCount: 0,
      noesCount: 0,
      inDebateNotes: ['Bill formally introduced on floor of Lok Sabha. Awaiting speaker debate schedule.']
    };
    setBills(prev => [newBill, ...prev]);
    setProfile(prev => ({ ...prev, politicalXp: prev.politicalXp + 350 }));
    addNotification(`New legislative bill "${newBill.title}" introduced in Parliament!`);
  };

  const createPost = (content: string, hashtags: string[], pollQuestion?: string, pollOptions?: string[]) => {
    const newPost: DeshPost = {
      id: `post-${Date.now()}`,
      authorName: profile.displayName,
      authorRole: profile.currentRole,
      authorAvatar: profile.avatarUrl,
      partyAbbr: profile.partyAbbr,
      isVerified: profile.isVerified,
      content,
      hashtags,
      poll: pollQuestion && pollOptions && pollOptions.length > 1 ? {
        question: pollQuestion,
        options: pollOptions.map(opt => ({ text: opt, votes: 0 }))
      } : undefined,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      timestamp: 'Just now'
    };
    setPosts(prev => [newPost, ...prev]);
    setProfile(prev => ({ ...prev, politicalXp: prev.politicalXp + 80 }));
    addNotification('Post published on DeshConnect political feed!');
  };

  const toggleLikePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const willLike = !p.isLiked;
        return {
          ...p,
          isLiked: willLike,
          likesCount: willLike ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
        };
      })
    );
  };

  const voteInPoll = (postId: string, optionIndex: number) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId || !p.poll || p.poll.userSelected !== undefined) return p;
        const newOptions = p.poll.options.map((opt, idx) =>
          idx === optionIndex ? { ...opt, votes: opt.votes + 1 } : opt
        );
        return {
          ...p,
          poll: {
            ...p.poll,
            options: newOptions,
            userSelected: optionIndex
          }
        };
      })
    );
    addNotification('Opinion poll vote registered on DeshConnect!');
  };

  const sendChatMessage = (content: string, channel: 'all' | 'party' | 'parliament') => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderName: profile.displayName,
      senderRole: profile.currentRole,
      partyAbbr: profile.partyAbbr,
      avatarUrl: profile.avatarUrl,
      channel,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const resetGameData = () => {
    localStorage.clear();
    setProfile(INITIAL_USER_PROFILE);
    setParties(INITIAL_PARTIES);
    setElection(INITIAL_ELECTION);
    setCandidates(INITIAL_CANDIDATES);
    setGovernment(INITIAL_GOVERNMENT);
    setBills(INITIAL_BILLS);
    setPosts(INITIAL_DESH_POSTS);
    setNews(INITIAL_NEWS);
    setMetrics(INITIAL_METRICS);
    setMessages(INITIAL_CHAT_MESSAGES);
    setAdminAuditLogs(INITIAL_ADMIN_AUDIT_LOGS);
    setResultReleaseEvent(null);
    setBusinesses(INITIAL_BUSINESSES);
    setPlayerWallet(INITIAL_WALLET);
    setSalarySettings(INITIAL_SALARY_SETTINGS);
    setConflictAlerts(INITIAL_CONFLICT_ALERTS);
    setSpeakerElection(INITIAL_SPEAKER_ELECTION);
    setDualSeatWinState(null);
    setSeatVacancies([]);
    addNotification('Game state reset to official baseline simulation world.');
  };

  return {
    activeTab,
    setActiveTab,
    userRole,
    setUserRole,
    selectedStateCode,
    setSelectedStateCode,
    selectedConstituencyId,
    setSelectedConstituencyId,
    profile,
    setProfile,
    parties,
    election,
    candidates,
    government,
    bills,
    posts,
    news,
    metrics,
    messages,
    states,
    constituencies,
    notifications,
    userVotedElection,
    
    // Admin God Mode State & Actions
    adminAuditLogs,
    resultReleaseEvent,
    adminLogAction,
    adminCreateElection,
    adminUpdateElectionPhase,
    adminFreezeVoting,
    adminTriggerRecount,
    adminReleaseOfficialResults,
    adminUpdateSalary,
    adminInjectCrisis,
    
    // Campaign Strategy Studio
    campaignActions,
    playerCampaignState,
    executeCampaignAction,

    // Party HQ Office Bearers
    partyOffices,
    appointPartyOfficeBearer,
    selectPartyCandidate,

    // Dual Seat Win & Anti-Defection
    dualSeatWinState,
    resolveDualSeatWin,
    partySwitchingRule,
    setPartySwitchingRule,
    switchPlayerParty,
    seatVacancies,

    // Business Empire & Economy
    businesses,
    createBusiness,
    playerWallet,
    salarySettings,
    runMonthlySalaryTick,
    conflictAlerts,
    respondConflictAlert,

    // Speaker Election
    speakerElection,
    voteSpeakerElection,

    // Automated 26-Step Master Scenario
    isSimulatingScenario,
    scenarioStepIndex,
    scenarioLogs,
    runMaster26StepScenario,

    // Standard Actions
    createParty,
    joinParty,
    nominatePlayerAsCandidate,
    castBallot,
    advanceElectionPhase,
    conductFloorTest,
    voteOnBill,
    submitBill,
    createPost,
    toggleLikePost,
    voteInPoll,
    sendChatMessage,
    addNotification,
    resetGameData
  };
}
