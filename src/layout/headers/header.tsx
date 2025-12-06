"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useCookies } from "next-client-cookies";
import { ShoppingCart, Heart, Search, Menu, Truck, User, Home, Phone } from "lucide-react";
import Loader from "@/components/Loader";
import useCartInfo from "@/hooks/use-cart-info";
import useSticky from "@/hooks/use-sticky";
import HeaderNavigation from "./HeaderNavigation";

const OffCanvas = dynamic(() => import("@/components/common/offcanvas"), { ssr: false });
const MiniCart = dynamic(() => import("./header-com/mini-cart"), { ssr: false });
const TrackOrderModal = dynamic(() => import("@/utils/TrackOrderModal"), { ssr: false });
const SearchPopup = dynamic(() => import("./header-com/search-popup"), { ssr: false });

type IProps = {
  white_bg?: boolean;
};

const Header = ({ white_bg }: IProps) => {
  const cookies = useCookies();
  const { sticky } = useSticky();
  const { quantity } = useCartInfo();

  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showTrack, setShowTrack] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      // Set mobile breakpoint to 1024px
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isLoggedIn = mounted && cookies.get("userinfo") && cookies.get("token");

  const handleCartClick = () => {
    if (quantity > 0) setShowCart(!showCart);
  };

  const handleLogout = () => {
    cookies.remove("userinfo");
    cookies.remove("token");
    window.location.reload();
  };

  return (
    <>
      {loading && <Loader />}

      {/* Top Header (Mobile Alignment Fixed via Flex Ratios) */}
      <header
        style={{
          position: sticky ? "fixed" : "relative",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 999,
          background: white_bg ? "#fff" : "#fafafa",
          boxShadow: sticky
            ? "0 4px 15px rgba(0, 0, 0, 0.15)"
            : "0 2px 6px rgba(196, 196, 196, 0.79)",
          transition: "all 0.3s ease",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: isMobile ? "12px 16px" : "16px 40px",
            gap: "12px",
          }}
          className="header-container"
        >
          {/* Left Group (Search Icon) - Flex: 1 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-start',
            flex: isMobile ? '1' : 'none', 
          }}>
            {isMobile && (
              <button className="white-btn" onClick={() => setShowSearch(true)}>
                <Search style={{ color: "#000", width: "22px", height: "22px" }} />
              </button>
            )}
          </div>

          {/* Logo (Centered) - Flex: 1 */}
          <div style={{ 
            flex: isMobile ? '1' : 'none', // Takes equal space to side groups
            textAlign: "center" 
          }}>
        <Link href="/">
  <span className="text-logo"
    style={{
      fontSize: isMobile
        ? "clamp(20px, 6vw, 28px)"  // smaller min size to fit mobile
        : "clamp(28px, 4vw, 32px)",
      fontWeight: 900,
      letterSpacing: "2px",
      fontFamily: "'Poppins', sans-serif",
      textDecoration: "none",
      color: "#0f3a16ff",
      display: "inline-block",
      transition: "transform 0.3s ease",
      textAlign: "center",
      whiteSpace: "nowrap",          // prevent wrapping
      overflow: "hidden",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    KAYAA
  </span>
</Link>

          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav style={{ flex: 1, display: "flex", justifyContent: "center", gap: "16px" }}>
              <HeaderNavigation setLoading={setLoading} />
            </nav>
          )}

          {/* Right Group (Menu Icon) - Flex: 1 */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: isMobile ? 'flex-end' : 'flex-start', // Pushes menu icon to the right edge
            gap: isMobile ? "8px" : "12px",
            flex: isMobile ? '1' : 'none', 
          }}>
            
            {/* Desktop Icons (omitted for brevity here, included in the full code) */}
            {!isMobile && (
              <>
                <button className="white-btn" onClick={() => setShowSearch(true)}>
                  <Search style={{ color: "#045a36ff", width: "18px", height: "18px" }} />
                </button>
                <button className="white-btn" onClick={() => setShowTrack(true)}>
                  <Truck style={{ color: "#045a36ff", width: "18px", height: "18px" }} />
                </button>
                <button className="white-btn">
                  <Heart style={{ color: "#e9052f", width: "20px", height: "20px" }} />
                </button>
                <div style={{ position: "relative" }}>
                  <button className="white-btn" onClick={handleCartClick}>
                    <ShoppingCart style={{ color: "#045a36ff", width: "20px", height: "20px" }} />
                    {mounted && quantity > 0 && <span className="cart-badge">{quantity}</span>}
                  </button>
                  {mounted && quantity > 0 && showCart && (
                    <MiniCart showCart={showCart} setShowCart={setShowCart} setLoading={setLoading} />
                  )}
                </div>
                {isLoggedIn && (
                  <div style={{ position: "relative" }} ref={userDropdownRef}>
                    <button className="white-btn" onClick={() => setShowUserDropdown(!showUserDropdown)}>
                      <User style={{ color: "#045a36ff", width: "18px", height: "18px" }} />
                    </button>
                    {showUserDropdown && (
                      <div className="user-dropdown">
                        <Link href="/account">My Account</Link>
                        <Link href="/orders">My Orders</Link>
                        <button onClick={handleLogout}>Logout</button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu */}
            {isMobile && (
              <button className="white-btn" onClick={() => setShowSidebar(true)}>
                <Menu style={{ color: "#045a36ff", width: "22px", height: "22px" }} />
              </button>
            )}
          </div>
        </div>
      </header>

    {isMobile && (
  <div className="mobile-bottom-nav">
    {/* Left side */}
    <div className="nav-group">
      <button onClick={() => setShowSidebar(true)} className="nav-button">
        <Menu size={20} />
        <span>Category</span>
      </button>

      <button className="nav-button" onClick={() => setShowTrack(true)}>
        <Truck size={20} />
        <span>Track</span>
      </button>
    </div>

    {/* Center Home Button */}
    <Link href="/" className="home-btn">
      <div className="home-circle">
        <Home size={26} />
      </div>
      <span>Home</span>
    </Link>

    {/* Right side */}
    <div className="nav-group">
  <button onClick={handleCartClick} className="nav-button">
  <ShoppingCart size={20} />
  <span>Cart</span>
  {quantity > 0 && <span className="cart-count">{quantity}</span>}
</button>

{mounted && quantity > 0 && showCart && (
  <MiniCart
    showCart={showCart}
    setShowCart={setShowCart}
    setLoading={setLoading}
  />
)}

      {isLoggedIn ? (
        <Link href="/account" className="nav-button">
          <User size={20} />
          <span>Account</span>
        </Link>
      ) : (
        <Link href="/login" className="nav-button">
          <User size={20} />
          <span>Login</span>
        </Link>
      )}
    </div>
  </div>
)}


      {/* Popups & Sidebar */}
      {mounted && (
        <>
          <SearchPopup showSearch={showSearch} setShowSearch={setShowSearch} />
          <TrackOrderModal show={showTrack} setShow={setShowTrack} />
          <OffCanvas openMobileMenus={showSidebar} setOpenMobileMenus={setShowSidebar} />
        </>
      )}

      {/* Styles (Containing all animations and fixed mobile nav CSS) */}
      <style jsx>{`
        /* General Button Styling */
        .white-btn {
          border: none;
          background: #fff;
          border-radius: 50%;
          padding: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }
        .white-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
        }
        /* Cart Badge (Top Bar) */
        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #0d0d0eff;
          color: #fff;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          border: 2px solid #fff;
        }
        /* User Dropdown */
        .user-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          min-width: 180px;
          overflow: hidden;
          z-index: 1000;
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .user-dropdown.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
        .user-dropdown a,
        .user-dropdown button {
          display: block;
          padding: 12px 20px;
          text-decoration: none;
          color: #333;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          transition: background 0.2s ease;
          border: none;
          background: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
        }
        .user-dropdown a:hover,
        .user-dropdown button:hover {
          background: #f3f3f3;
        }
        
        /* ============================================== */
        /* --- MOBILE BOTTOM NAV ALIGNMENT FIX --- */
        /* ============================================== */

    /* MOBILE BOTTOM NAV */
.mobile-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 75px;
  background: #fff;
  border-top: 1px solid #e5e5e5;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  z-index: 999;
}

/* LEFT + RIGHT GROUP WITH RESPONSIVE BEHAVIOR */
.mobile-nav-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  min-width: 130px;
}

/* NAV ITEM */
.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  color: #045a36ff;
  border: none;
  background: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.mobile-nav-item svg {
  width: 20px;
  height: 20px;
}

.mobile-nav-item:hover {
  transform: scale(1.08);
}

.mobile-nav-text {
  font-size: 11px;
}

/* CENTER HOME BUTTON — ALWAYS PERFECT CENTER */
.mobile-nav-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-28px);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* HOME BUTTON */
.mobile-home-btn-link {
  text-decoration: none;
  color: #fff; /* neon text color */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mobile-home-btn-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000; /* dark background for neon contrast */
  box-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff;
  transition: all 0.3s ease;
  animation: neon-glow 1.5s ease-in-out infinite alternate;
}

/* Neon glow animation */
@keyframes neon-glow {
  0% {
    box-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff;
  }
  50% {
    box-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff, 0 0 50px #0ff;
  }
  100% {
    box-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff;
  }
}

/* Hover effect to intensify neon */
.mobile-home-btn-link:hover .mobile-home-btn-icon {
  transform: scale(1.15);
  box-shadow: 0 0 20px #0ff, 0 0 30px #0ff, 0 0 50px #0ff, 0 0 80px #0ff;
}

/* Optional: neon text glow */
.mobile-home-btn-link span {
  color: #0ff;
  text-shadow: 0 0 5px #0ff, 0 0 10px #0ff;
}


/* CART BADGE */
.mobile-cart-badge-inline {
  position: absolute;
  top: -6px;
  right: -4px;
  background: #d4a574;
  color: #fff;
  width: 17px;
  height: 17px;
  font-size: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* FULL RESPONSIVE FIX: SMALL SCREENS */
@media (max-width: 420px) {
  .mobile-nav-group {
    width: 42%;
  }

  .mobile-nav-item svg {
    width: 18px;
    height: 18px;
  }

  .mobile-home-btn-icon {
    width: 52px;
    height: 52px;
  }
}

/* VERY SMALL DEVICES */
@media (max-width: 360px) {
  .mobile-nav-group {
    width: 44%;
  }

  .mobile-nav-text {
    font-size: 10px;
  }

  .mobile-home-btn-icon {
    width: 48px;
    height: 48px;
  }
}

      `}</style>
    </>
  );
};

export default Header;