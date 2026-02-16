import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, Home, History, User, Info, LogOut, 
  Zap, TrendingUp, Package, ChevronRight, Bell, Menu, X
} from "lucide-react";
// import AuthService from "../services/AuthService";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  
  // State for Desktop (Wide vs Slim)
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  
  // State for Mobile (Open vs Closed)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu automatically when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // --- MOCK DATA ---
  const trendingItems = [
    { id: 1, name: "iPhone 15 Pro", price: "$999", change: "-12%", vendor: "Ishtari" },
    { id: 2, name: "Sony WH-1000XM5", price: "$348", change: "-5%", vendor: "Amazon" },
    { id: 3, name: "MacBook Air M2", price: "$1050", change: "+2%", vendor: "Makhsoom" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex overflow-hidden relative selection:bg-indigo-500 selection:text-white">
      
      {/* --- BACKGROUND ATMOSPHERE --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      {/* --- MOBILE OVERLAY BACKDROP --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- SIDEBAR (Responsive) --- */}
      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-50
          bg-slate-900/50 backdrop-blur-xl border-r border-white/5 
          transition-all duration-300 ease-in-out flex flex-col
          ${isMobileMenuOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"}
          ${isDesktopSidebarOpen ? "md:w-64" : "md:w-20"}
        `}
      >
        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white md:hidden"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Desktop Toggle Button */}
        <button 
          onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
          className="hidden md:flex absolute -right-3 top-24 bg-blue-600 rounded-full p-1 border border-slate-900 text-white shadow-lg hover:bg-blue-500 transition-colors z-50"
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${isDesktopSidebarOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Logo Area */}
        <div className="h-20 flex items-center justify-center border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            {/* Show Text if Mobile OR (Desktop & Expanded) */}
            <span className={`font-bold text-lg tracking-tight transition-opacity duration-200 ${
              (!isDesktopSidebarOpen && "md:opacity-0 md:hidden") 
            }`}>
              PriceTracker
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          <NavItem 
            icon={Home} label="Home" active={activeTab === "home"} 
            onClick={() => { setActiveTab("home"); setIsMobileMenuOpen(false); }} 
            showLabel={isDesktopSidebarOpen} 
          />
          <NavItem 
            icon={History} label="Search History" active={activeTab === "history"} 
            onClick={() => { setActiveTab("history"); setIsMobileMenuOpen(false); }} 
            showLabel={isDesktopSidebarOpen} 
          />
          <NavItem 
            icon={User} label="My Account" active={activeTab === "account"} 
            onClick={() => { setActiveTab("account"); setIsMobileMenuOpen(false); }} 
            showLabel={isDesktopSidebarOpen} 
          />
          <NavItem 
            icon={Info} label="About & Help" active={activeTab === "about"} 
            onClick={() => { setActiveTab("about"); setIsMobileMenuOpen(false); }} 
            showLabel={isDesktopSidebarOpen} 
          />
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all ${!isDesktopSidebarOpen && "md:justify-center"}`}
            title="Sign Out"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className={`font-medium text-sm whitespace-nowrap transition-all ${
               (!isDesktopSidebarOpen && "md:hidden")
            }`}>
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 relative z-10 overflow-y-auto h-screen">
        
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-4 md:px-8 border-b border-white/5 bg-slate-900/20 backdrop-blur-md sticky top-0 z-30">
          
          {/* Mobile Menu Trigger & Welcome Text */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg md:text-xl font-medium text-slate-200 truncate">
              Welcome, <span className="text-white font-bold">User</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 border-2 border-slate-800 shadow-lg"></div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-12 pb-20">

          {/* 1. HERO SEARCH SECTION */}
          <div className="text-center space-y-6 mt-6 md:mt-10 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 px-2">
              Compare Prices Across Lebanon
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto px-4">
              One search. 11+ stores. Best delivery times.
            </p>

            {/* THE GLOWING SEARCH BAR */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group z-20 px-2">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative flex items-center bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl transition-transform group-hover:scale-[1.01]">
                <Search className="w-5 h-5 md:w-6 md:h-6 text-slate-400 ml-2 md:ml-4 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Link or 'iPhone 15'..." 
                  className="w-full bg-transparent border-none outline-none text-white text-base md:text-lg px-2 md:px-4 py-2 md:py-3 placeholder-slate-500 min-w-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 md:px-8 py-2 md:py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/25 text-sm md:text-base whitespace-nowrap"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* 2. DASHBOARD WIDGETS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Widget: Trending */}
            <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-5 md:p-6 backdrop-blur-md hover:bg-white/[0.07] transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <TrendingUp className="w-5 h-5 text-emerald-400" /> Trending Deals
                </h3>
                <button className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider">View All</button>
              </div>
              <div className="space-y-4">
                {trendingItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group border border-transparent hover:border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-inner flex-shrink-0">
                        <Package className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-white group-hover:text-blue-300 transition-colors truncate">{item.name}</h4>
                        <p className="text-xs text-slate-400">{item.vendor}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 pl-2">
                      <p className="font-bold text-lg">{item.price}</p>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget: Recent History */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-6 backdrop-blur-md flex flex-col hover:bg-white/[0.07] transition-colors">
              <h3 className="flex items-center gap-2 text-lg font-bold mb-6">
                <History className="w-5 h-5 text-blue-400" /> Recent Searches
              </h3>
              <div className="flex-1 space-y-3">
                {["PlayStation 5", "Nike Air Force 1", "Samsung S24 Ultra"].map((term, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer text-slate-300 hover:text-white transition-colors group">
                    <span className="truncate">{term}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-bold text-slate-300 transition-colors">
                Clear History
              </button>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

// --- HELPER COMPONENT FOR SIDEBAR ITEMS ---
const NavItem = ({ icon: Icon, label, active, onClick, showLabel }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group relative
      ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}
      ${!showLabel ? "md:justify-center" : ""}
    `}
    title={!showLabel ? label : ""}
  >
    <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
    
    {/* Label Logic: Always show on Mobile. On Desktop, show based on showLabel prop */}
    <span className={`font-medium text-sm whitespace-nowrap transition-all ${
       (!showLabel && "md:hidden")
    }`}>
      {label}
    </span>
    
    {/* Active Indicator Strip (Only when expanded) */}
    {active && showLabel && (
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/20 rounded-r-full"></div>
    )}
  </button>
);

export default HomePage;