"use client";

import { fetchData } from "@/api/api";
import menuData from "@/data/menu-data";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  setLoading: (loading: boolean) => void;
};

const HeaderNavigation = ({ setLoading }: Props) => {
  const [menusData, setMenusData] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [desktopDropdown, setDesktopDropdown] = useState<number | null>(null);

  const getCategoriesAndBrands = async () => {
    try {
      setLoading(true);
      setLoadingData(true);

      const [catRes, brandRes] = await Promise.all([
        fetchData({ url: `/customer/categories`, cache: "force-cache" }),
        fetchData({ url: `/customer/brands`, cache: "force-cache" }),
      ]);

      const categories = catRes?.data || [];
      const brands = brandRes?.data || [];

      const categoryMenu = {
        link: `/shop`,
        title: "Categories",
        hasDropdown: true,
        dropdownItems: categories.map((cat: any) => ({
          link: `/shop?category=${cat.id}&price=1000000`,
          title: cat.name,
        })),
      };

      const brandMenu = {
        link: `/shop`,
        title: "Brands",
        hasDropdown: true,
        dropdownItems: brands.map((brand: any) => ({
          link: `/shop?brand=${brand.id}&price=1000000`,
          title: brand.name,
        })),
      };

      setMenusData([...menuData, categoryMenu, brandMenu]);
    } catch (err) {
      console.error("Navigation fetch error:", err);
      setMenusData(menuData);
    } finally {
      setLoading(false);
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getCategoriesAndBrands();
  }, []);

  const cardBackground = "rgba(255, 255, 255, 1)";
  const cardShadow = "8px 8px 20px rgba(0,0,0,0.1), -8px -8px 20px rgba(255,255,255,0.7)";
  const blurStyle = "blur(10px)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "white",
        borderRadius: "50px",
        padding: "8px 16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {loadingData ? (
        <span
          style={{
            color: "#6b7280",
            fontSize: "14px",
            fontFamily: "'Poppins', sans-serif",
            padding: "8px 16px",
          }}
        >
          Loading...
        </span>
      ) : (
        menusData.map((item, idx) => (
          <div
            key={idx}
            style={{ position: "relative" }}
            onMouseEnter={() => setDesktopDropdown(idx)}
            onMouseLeave={() => setDesktopDropdown(null)}
          >
            <Link
              href={item.link}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "8px 20px",
                borderRadius: "30px",
                textDecoration: "none",
                color: desktopDropdown === idx ? "#fff" : "#333",
                fontSize: "15px",
                fontWeight: "500",
                fontFamily: "'Poppins', sans-serif",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
                background:
                  desktopDropdown === idx
                    ? "linear-gradient(135deg, #0a2c03ff, #093603ff)"
                    : "transparent",
                boxShadow:
                  desktopDropdown === idx
                    ? "0 4px 12px rgba(15, 15, 15, 0.4)"
                    : "none",
              }}
            >
              {item.title}
              {item.hasDropdown && (
                <ChevronDown
                  style={{
                    width: "16px",
                    height: "16px",
                    transition: "transform 0.3s ease",
                    transform:
                      desktopDropdown === idx ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              )}
            </Link>

            {item.hasDropdown && desktopDropdown === idx && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: cardBackground,
                  backdropFilter: blurStyle,
                  borderRadius: "12px",
                  padding: "8px",
                  boxShadow: cardShadow,
                  minWidth: "220px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  zIndex: 1000,
                }}
              >
                {item.dropdownItems.map((menu: any, i: number) => (
                  <Link
                    key={i}
                    href={menu.link}
                    style={{
                      display: "block",
                      padding: "10px 16px",
                      fontSize: "14px",
                      color: "#374151",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      borderRadius: "8px",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.background = "rgba(255,255,255,0.25)";
                      (e.target as HTMLElement).style.color = "#063d09ff";
                      (e.target as HTMLElement).style.paddingLeft = "20px";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.background = "transparent";
                      (e.target as HTMLElement).style.color = "#374151";
                      (e.target as HTMLElement).style.paddingLeft = "16px";
                    }}
                  >
                    {menu.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default HeaderNavigation;