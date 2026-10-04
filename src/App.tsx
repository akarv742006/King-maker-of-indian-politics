import React, { useState } from 'react';
import { useGameStore } from './services/gameStore';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';

// Feature Views
import { DashboardView } from './features/dashboard/DashboardView';
import { IndiaMapView } from './features/india-map/IndiaMapView';
import { PartiesView } from './features/parties/PartiesView';
import { ElectionsView } from './features/elections/ElectionsView';
import { ParliamentView } from './features/parliament/ParliamentView';
import { GovernmentView } from './features/government/GovernmentView';
import { DeshConnectView } from './features/deshconnect/DeshConnectView';
import { EconomyView } from './features/economy/EconomyView';
import { NewsView } from './features/news/NewsView';
import { MultiplayerView } from './features/multiplayer/MultiplayerView';
import { ProfileView } from './features/profile/ProfileView';
import { AdminView } from './features/admin/AdminView';
import { LoginView } from './features/auth/LoginView';

export function App() {
  const store = useGameStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Show login page first when opening or refreshing
    return sessionStorage.getItem('king_politics_auth_v1') === 'true';
  });

  const handleNavigate = (tab: string) => {
    store.setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (role: 'player' | 'admin', username?: string) => {
    setIsAuthenticated(true);
    sessionStorage.setItem('king_politics_auth_v1', 'true');
    store.setUserRole(role);
    if (username) {
      store.setProfile((prev) => ({
        ...prev,
        displayName: username,
      }));
    }
    if (role === 'admin') {
      store.setActiveTab('admin');
    } else {
      store.setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('king_politics_auth_v1');
    localStorage.removeItem('king_politics_auth_v1');
  };

  // If not authenticated, show the Login View (Matching Design Card 1 & 10)
  if (!isAuthenticated) {
    return (
      <LoginView
        onLoginSuccess={handleLoginSuccess}
        initialMode={store.userRole}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#172033] flex flex-col">
      {/* Universal Top Header */}
      <Header
        profile={store.profile}
        election={store.election}
        notifications={store.notifications}
        userRole={store.userRole}
        onToggleRole={store.setUserRole}
        onReset={store.resetGameData}
        onNavigateTab={handleNavigate}
        onLogout={handleLogout}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar activeTab={store.activeTab} onSelectTab={handleNavigate} />

        {/* Dynamic Main Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-x-hidden">
          {store.activeTab === 'dashboard' && (
            <DashboardView
              profile={store.profile}
              election={store.election}
              parties={store.parties}
              news={store.news}
              metrics={store.metrics}
              bills={store.bills}
              onNavigateTab={handleNavigate}
            />
          )}

          {store.activeTab === 'map' && (
            <IndiaMapView
              states={store.states}
              constituencies={store.constituencies}
              profile={store.profile}
              selectedStateCode={store.selectedStateCode}
              onSelectStateCode={store.setSelectedStateCode}
              onNominateCandidate={store.nominatePlayerAsCandidate}
              onNavigateTab={handleNavigate}
            />
          )}

          {store.activeTab === 'parties' && (
            <PartiesView
              parties={store.parties}
              profile={store.profile}
              partyOffices={store.partyOffices}
              constituencies={store.constituencies}
              partySwitchingRule={store.partySwitchingRule}
              onSetPartySwitchingRule={store.setPartySwitchingRule}
              onAppointOfficeBearer={store.appointPartyOfficeBearer}
              onSelectCandidate={store.selectPartyCandidate}
              onSwitchParty={store.switchPlayerParty}
              onCreateParty={store.createParty}
              onJoinParty={store.joinParty}
            />
          )}

          {store.activeTab === 'elections' && (
            <ElectionsView
              election={store.election}
              candidates={store.candidates}
              profile={store.profile}
              constituencies={store.constituencies}
              userVoted={store.userVotedElection}
              campaignActions={store.campaignActions}
              playerCampaignState={store.playerCampaignState}
              dualSeatWinState={store.dualSeatWinState}
              onCastBallot={store.castBallot}
              onAdvancePhase={store.adminUpdateElectionPhase}
              onNominatePlayer={store.nominatePlayerAsCandidate}
              onExecuteCampaign={store.executeCampaignAction}
              onResolveDualSeatWin={store.resolveDualSeatWin}
              onAddNotification={store.addNotification}
              onNavigateTab={handleNavigate}
            />
          )}

          {store.activeTab === 'parliament' && (
            <ParliamentView
              bills={store.bills}
              profile={store.profile}
              speakerElection={store.speakerElection}
              onVoteSpeaker={store.voteSpeakerElection}
              onVoteBill={store.voteOnBill}
              onSubmitBill={store.submitBill}
              onAddNotification={store.addNotification}
            />
          )}

          {store.activeTab === 'government' && (
            <GovernmentView
              government={store.government}
              profile={store.profile}
              parties={store.parties}
              onConductFloorTest={store.conductFloorTest}
              onAddNotification={store.addNotification}
            />
          )}

          {store.activeTab === 'deshconnect' && (
            <DeshConnectView
              posts={store.posts}
              profile={store.profile}
              onCreatePost={store.createPost}
              onToggleLike={store.toggleLikePost}
              onVotePoll={store.voteInPoll}
              onAddNotification={store.addNotification}
            />
          )}

          {store.activeTab === 'economy' && (
            <EconomyView
              metrics={store.metrics}
              profile={store.profile}
              businesses={store.businesses}
              playerWallet={store.playerWallet}
              salarySettings={store.salarySettings}
              conflictAlerts={store.conflictAlerts}
              onCreateBusiness={store.createBusiness}
              onRunMonthlySalaryTick={store.runMonthlySalaryTick}
              onRespondConflictAlert={store.respondConflictAlert}
              onAddNotification={store.addNotification}
            />
          )}

          {store.activeTab === 'news' && (
            <NewsView
              news={store.news}
              onAddNotification={store.addNotification}
            />
          )}

          {store.activeTab === 'multiplayer' && (
            <MultiplayerView
              messages={store.messages}
              profile={store.profile}
              onSendMessage={store.sendChatMessage}
            />
          )}

          {store.activeTab === 'profile' && (
            <ProfileView
              profile={store.profile}
              onUpdateProfile={(updated) => store.setProfile((prev) => ({ ...prev, ...updated }))}
              onAddNotification={store.addNotification}
            />
          )}

          {store.activeTab === 'admin' && (
            <AdminView
              election={store.election}
              adminAuditLogs={store.adminAuditLogs}
              resultReleaseEvent={store.resultReleaseEvent}
              salarySettings={store.salarySettings}
              isSimulatingScenario={store.isSimulatingScenario}
              scenarioStepIndex={store.scenarioStepIndex}
              scenarioLogs={store.scenarioLogs}
              onAdvancePhase={store.adminUpdateElectionPhase}
              onCreateElection={store.adminCreateElection}
              onFreezeVoting={store.adminFreezeVoting}
              onTriggerRecount={store.adminTriggerRecount}
              onReleaseResults={store.adminReleaseOfficialResults}
              onUpdateSalary={store.adminUpdateSalary}
              onInjectCrisis={store.adminInjectCrisis}
              onRunScenario={store.runMaster26StepScenario}
              onResetGameData={store.resetGameData}
              onAddNotification={store.addNotification}
              onNavigateTab={handleNavigate}
            />
          )}
        </main>
      </div>

      {/* Mobile Drawer Navigation Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md p-6 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF1] mb-4">
              <span className="font-heading font-extrabold text-base text-[#173B67]">
                Republic Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
              >
                ✕ Close
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'map', label: 'India Map' },
                { id: 'elections', label: 'Elections' },
                { id: 'parties', label: 'Parties' },
                { id: 'deshconnect', label: 'DeshConnect' },
                { id: 'parliament', label: 'Parliament' },
                { id: 'government', label: 'Government' },
                { id: 'economy', label: 'Economy' },
                { id: 'news', label: 'News Gazette' },
                { id: 'multiplayer', label: 'Chamber Chat' },
                { id: 'profile', label: 'Profile' },
                { id: 'admin', label: 'ECI Admin' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`p-3 rounded-xl border text-left ${
                    store.activeTab === item.id
                      ? 'bg-[#173B67] text-white border-[#173B67]'
                      : 'bg-[#F7F9FC] text-[#172033] border-[#E5EAF1]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        activeTab={store.activeTab}
        onSelectTab={handleNavigate}
        onOpenFullMenu={() => setMobileMenuOpen(true)}
      />
    </div>
  );
}

export default App;
