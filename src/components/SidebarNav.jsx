import React from "react";
import { useLocation } from "react-router-dom";
import PillNav from "./PillNav";

const TAB_ROUTES = {
  home: "/home",
  history: "/search-history",
  account: "/account",
  about: "/about-help",
};

const SidebarNav = ({
  activeTab,
  onLogout,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const location = useLocation();
  const activeHref = TAB_ROUTES[activeTab] || location.pathname;

  const items = [
    { label: "Home", href: "/home" },
    { label: "Search History", href: "/search-history" },
    { label: "My Account", href: "/account" },
    { label: "About & Help", href: "/about-help" },
    { label: "Sign Out", onClick: onLogout },
  ];

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <PillNav
        logo="/images/awfarlak-logo.png"
        logoAlt="Awfarlak"
        items={items}
        activeHref={activeHref}
        className="awfarlak-pill-nav"
        ease="power2.easeOut"
        baseColor="var(--color-bg)"
        pillColor="var(--color-surface-strong)"
        hoveredPillTextColor="var(--color-bg)"
        pillTextColor="var(--color-bg)"
        initialLoadAnimation={false}
        mobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setIsMobileMenuOpen}
      />
    </>
  );
};

export default SidebarNav;
