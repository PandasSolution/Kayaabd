"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";

// internal
import logo from "@/assets/img/logo/strike_logo.jpeg";
import Loader from "@/components/Loader";
import useCartInfo from "@/hooks/use-cart-info";
import useSticky from "@/hooks/use-sticky";
import ExtraInfo from "./header-com/extra-info";
import NavManus from "./header-com/nav-manus";
import SearchPopup from "./header-com/search-popup";

// Dynamic imports
const OffCanvas = dynamic(() => import("@/components/common/offcanvas"), { ssr: false });
const MiniCart = dynamic(() => import("./header-com/mini-cart"), { ssr: false });
const TrackOrderModal = dynamic(() => import("@/utils/TrackOrderModal"), { ssr: false });

type IProps = {
  header_big?: boolean;
};

const Header = ({ header_big }: IProps) => {
  const cookies = useCookies();
  const { sticky } = useSticky();
  const { quantity } = useCartInfo();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTrack, setShowTrack] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoggedIn = mounted && cookies.get("userinfo") && cookies.get("token");

  const handleCartClick = () => {
    if (mounted && quantity > 0) {
      setShowCart(!showCart);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <header>
        <div
          id="header-sticky"
          className={`header__area ${header_big ? "box-25" : ""} ${sticky ? "sticky slim" : ""}`}
        >
          <div className={`${header_big ? "container-fluid" : "container"}`}>
            <div className="row align-items-center">
              {/* Logo */}
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
                <div className="logo">
                  <Link href="/">
                    {/* <Image
                      src={logo}
                      alt="logo"
                      priority
                      width={sticky ? 140 : 180}
                      className="d-none d-md-block"
                    />
                    <Image
                      src={logo}
                      alt="logo"
                      priority
                      width={sticky ? 90 : 120}
                      className="d-md-none"
                    /> */}

                                        <div className="logo-text">KAYAA</div>

                  </Link>
                </div>
              </div>

              {/* Menus */}
              <div className="col-xl-9 col-lg-9 col-md-8 col-sm-8">
                <div className="header__right p-relative d-flex justify-content-between align-items-center">
                  <div className="main-menu d-none d-lg-block">
                    <nav>
                      <NavManus setLoading={setLoading} />
                    </nav>
                  </div>

                  {/* Actions */}
                  <div className="header__action d-flex align-items-center">
                    <ul className="d-flex align-items-center m-0 p-0 list-unstyled">
                      {/* Search */}
                      <li className="me-3">
                        <button
                          className="search-toggle btn-link border-0 bg-transparent p-2 d-flex align-items-center header-icon"
                          onClick={() => mounted && setShowSearch(true)}
                          aria-label="Search"
                        >
                          <i className="ion-ios-search-strong me-1 fs-5"></i>
                          <span className="d-none d-md-inline">Search</span>
                        </button>
                      </li>

                      {/* Track Order */}
                      <li className="me-3">
                        <button
                          className="btn-link border-0 bg-transparent p-2 header-icon"
                          onClick={() => mounted && setShowTrack(true)}
                          aria-label="Track Order"
                          title="Track Your Order"
                        >
                          <i className="fas fa-truck fs-5"></i>
                        </button>
                      </li>

                      {/* Cart */}
                      <li className="me-3 position-relative">
                        <button
                          className={`cart btn-link border-0 bg-transparent p-2 d-flex align-items-center header-icon ${
                            quantity === 0 ? "opacity-50" : ""
                          }`}
                          onClick={handleCartClick}
                          aria-label="Shopping Cart"
                        >
                          <i className="ion-bag me-1 fs-5"></i>
                          <span className="d-none d-md-inline">Cart</span>
                          {mounted && quantity > 0 && (
                            <span className="badge bg-dark rounded-pill ms-2">
                              {quantity}
                            </span>
                          )}
                        </button>

                        {mounted && quantity > 0 && showCart && <MiniCart setLoading={setLoading} />}
                      </li>

                      {/* User Account */}
                      <li className="me-2">
                        <button className="btn-link border-0 bg-transparent p-2 header-icon" aria-label="User Account">
                          {mounted ? (
                            isLoggedIn ? (
                              <i className="far fa-user fs-5"></i>
                            ) : (
                              <i className="fas fa-sign-in-alt fs-5"></i>
                            )
                          ) : (
                            <i className="fas fa-sign-in-alt fs-5"></i>
                          )}
                        </button>
                        {mounted && <ExtraInfo setLoading={setLoading} />}
                      </li>
                    </ul>

                    {/* Mobile Menu */}
                    <div className="mobile-menu-btn d-lg-none ms-2">
                      <button
                        onClick={() => mounted && setShowSidebar(true)}
                        className="mobile-menu-toggle btn-link border-0 bg-transparent p-2 header-icon"
                        aria-label="Mobile Menu"
                      >
                        <i className="fas fa-bars fs-5"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {mounted && (
        <>
          <SearchPopup showSearch={showSearch} setShowSearch={setShowSearch} />
          <TrackOrderModal show={showTrack} setShow={setShowTrack} />
          <OffCanvas openMobileMenus={showSidebar} setOpenMobileMenus={setShowSidebar} />
        </>
      )}
    </>
  );
};

export default Header;
