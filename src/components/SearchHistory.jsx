import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { History, Loader2, Menu, Search } from "lucide-react";
import AuthService from "../services/authService";
import HistoryService, { normalizeSearchHistory } from "../services/historyService";
import SidebarNav from "./SidebarNav";
import MagicBento from "./MagicBento";

const SearchHistory = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getUser();
  const username = currentUser?.username || currentUser?.name || "User";
  const profileInitial = username.trim().charAt(0).toUpperCase() || "U";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isClearingHistory, setIsClearingHistory] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadSearchHistory = async () => {
      setIsLoadingHistory(true);
      try {
        const historyResponse = await HistoryService.getUserSearchHistory();
        if (isMounted) {
          setSearchHistory(normalizeSearchHistory(historyResponse));
        }
      } catch (_error) {
        if (isMounted) {
          setSearchHistory([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingHistory(false);
        }
      }
    };

    loadSearchHistory();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    await AuthService.logout();
    navigate("/login");
  };

  const handleSearchSelect = (item) => {
    navigate("/home", {
      state: {
        historySearchId: item?.id,
        historyQuery: item?.query,
      },
    });
  };

  const handleClearHistory = async () => {
    const confirmed = window.confirm("Are you sure you want to clear your search history?");
    if (!confirmed) return;

    setIsClearingHistory(true);
    try {
      await HistoryService.clearHistory();
      setSearchHistory([]);
    } finally {
      setIsClearingHistory(false);
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] font-sans flex overflow-hidden relative selection:bg-amber-400 selection:text-slate-900">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-400/10 rounded-full blur-[120px]" />
      </div>

      <SidebarNav
        activeTab="history"
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 relative z-10 overflow-y-auto h-screen">
        <header className="h-20 flex items-center justify-between px-4 md:px-8 border-b border-white/5 bg-slate-900/20 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-slate-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg md:text-xl font-medium text-slate-200 truncate">
              <span className="text-white font-bold">Search History</span>
            </h1>
          </div>

          <div
            className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 border-2 border-slate-800 shadow-lg flex items-center justify-center text-sm font-bold text-slate-950"
            title={username}
          >
            {profileInitial}
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 pb-20">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold">
                <History className="w-6 h-6 text-emerald-400" /> Full Search History
              </h2>
              <div className="flex items-center gap-3">
                {!isLoadingHistory && (
                  <span className="text-sm text-slate-400">{searchHistory.length} total</span>
                )}
                <button
                  type="button"
                  onClick={handleClearHistory}
                  disabled={isClearingHistory || isLoadingHistory || searchHistory.length === 0}
                  className="px-3 py-2 rounded-lg text-xs font-bold border border-red-400/30 bg-red-500/5 hover:bg-red-500/10 text-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isClearingHistory ? "Clearing..." : "Clear History"}
                </button>
              </div>
            </div>

            {isLoadingHistory && (
              <div className="flex items-center gap-3 text-slate-400 py-6">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading your search history...</span>
              </div>
            )}

            {!isLoadingHistory && searchHistory.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-400 text-center">
                <Search className="w-10 h-10 mx-auto mb-3 text-slate-500" />
                No search history found yet.
              </div>
            )}

            {!isLoadingHistory && searchHistory.length > 0 && (
              <MagicBento
                items={searchHistory.map((item, index) => ({
                  color: "#0F172A",
                  label: `#${index + 1}`,
                  title: item.query,
                  description: `${item.createdAt ? new Date(item.createdAt).toLocaleString() : "Unknown date"}${item.minPrice != null ? ` • Best $${item.minPrice}` : ""}`,
                  onClick: () => handleSearchSelect(item),
                }))}
                layout="simple"
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={12}
                glowColor="16, 185, 129"
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchHistory;
