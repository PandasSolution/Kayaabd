"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Loader from "../Loader";

type Category = {
  id: string;
  name: string;
  image?: string;
  discount?: number;
  smDesc?: string;
};

type ShopCategoryProps = {
  spacing?: string;
  categories?: Category[];
};

const ShopCategory = ({
  spacing = "80px 0 60px 0",
  categories = [],
}: ShopCategoryProps) => {
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!categories || categories.length === 0) return null;

  return (
    <>
      {loading && <Loader />}

      <section style={{ padding: spacing, background: "#fafafa",marginTop:"-50px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
          
          {/* ===== SECTION HEADER ===== */}
          <div style={{ textAlign: "center", marginBottom: "55px" }}>
            <p
              style={{
                fontSize: "14px",
                color: "#b45309",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              Kayaa Saree Collection
            </p>

            <h2
              style={{
                fontSize: isMobile ? "30px" : "42px",
                fontWeight: 800,
                color: "#0b3d0b",
                margin: "8px 0",
              }}
            >
              Premium Sarees for Every Occasion
            </h2>

            <p
              style={{
                maxWidth: "720px",
                margin: "0 auto",
                fontSize: isMobile ? "14px" : "16px",
                color: "#555",
                lineHeight: 1.75,
              }}
            >
              Discover elegant hand-picked sarees for wedding, party & daily wear.
              Authentic designs, premium fabrics and unbeatable comfort —
              only from <strong>Kayaa</strong>.
            </p>
          </div>

          {/* ===== CATEGORY GRID ===== */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2, 1fr)"
                : "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {categories.map((item) => (
              <Link
                key={item.id}
                href={`/shop?category=${item.id}`}
                onClick={() => setLoading(true)}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="category-card">

                  {/* IMAGE */}
                  <div className="image-box">
                    <Image
                      src={item.image ?? "/noimage.png"}
                      alt={item.name}
                      fill
                      style={{
                        objectFit: "cover",
                        transition: "all 0.4s ease",
                      }}
                    />

                    {/* Discount */}
                    {item.discount ? (
                      <div className="discount-badge">
                        {item.discount}% OFF
                      </div>
                    ) : null}
                  </div>

                  {/* TEXT */}
                  <div className="content">
                    <h3>{item.name}</h3>

                    {item.smDesc && (
                      <p>
                        {item.smDesc.length > 55
                          ? `${item.smDesc.slice(0, 55)}...`
                          : item.smDesc}
                      </p>
                    )}

                    <span className="shop-btn">
                      Shop Now →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: "center", marginTop: "35px" }}>
            <Link
              href="/shop"
              style={{
                fontSize: "15px",
                color: "#0b3d0b",
                fontWeight: 700,
                textDecoration: "underline",
              }}
            >
              Browse All Sarees →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STYLES ===== */}
      <style jsx>{`
        .category-card {
          background: #ffffff;
          border-radius: 18px;
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: all 0.4s ease;
          height: 100%;
          cursor: pointer;
          border: 1px solid rgba(11, 61, 11, 0.08);
        }

        .category-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 18px 55px rgba(16, 185, 129, 0.25);
        }

        .image-box {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #f2f2f2;
        }

        .category-card:hover .image-box img {
          transform: scale(1.1);
        }

        .discount-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: linear-gradient(135deg, #0b3d0b, #1abc9c);
          color: #fff;
          padding: 6px 14px;
          font-size: 12px;
          border-radius: 30px;
          font-weight: 600;
          z-index: 2;
        }

        .content {
          padding: 16px 14px 22px;
          text-align: center;
        }

        .content h3 {
          font-size: 17px;
          font-weight: 700;
          color: #0b3d0b;
          margin-bottom: 6px;
        }

        .content p {
          font-size: 13px;
          color: #555;
          min-height: 32px;
          margin-bottom: 12px;
        }

        .shop-btn {
          display: inline-block;
          padding: 9px 22px;
          border-radius: 30px;
          background: linear-gradient(135deg, #0b3d0b, #1abc9c);
          color: white;
          font-size: 13px;
          font-weight: 600;
          transition: all .3s ease;
        }

        .category-card:hover .shop-btn {
          transform: scale(1.08);
          box-shadow: 0 6px 20px rgba(16,185,129,0.35);
        }

        @media (max-width: 600px) {
         
        .
        
          .content h3 {
            font-size: 15px;
          }
          .content p {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default ShopCategory;
