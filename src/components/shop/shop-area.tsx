"use client";

import { IProduct } from "@/types/product-d-t";
import ProductItem from "../products/single-product/product-item";
import { useState } from "react";

type IProps = {
  allProducts: IProduct[];
  categoryName?: string;
};

const ShopArea = ({ allProducts, categoryName }: IProps) => {
  const PRODUCTS_PER_LOAD = 12;
  const [visibleCount, setVisibleCount] = useState<number>(PRODUCTS_PER_LOAD);

  const handleSeeMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + PRODUCTS_PER_LOAD, allProducts.length)
    );
  };

  const productsToShow = allProducts.slice(0, visibleCount);

  return (
    <section className="shop__area pt-100 pb-100 ml-25">
      <div className="container">

        {/* ===== CATEGORY TITLE ===== */}
        {categoryName && (
          <div className="theme-title-wrapper text-center mb-55">
            <h2 className="theme-section-title">{categoryName}</h2>
            <p className="theme-section-subtitle">
              Explore premium products under {categoryName}
            </p>
          </div>
        )}

        {allProducts.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          <>
            {/* ===== PRODUCTS GRID ===== */}
            <div className="row g-4 justify-content-center product-row">
              {productsToShow.map((product: any) => (
                <div
                  key={product.id}
                  className="col-xl-3 col-lg-3 col-md-6 col-6 product-col"
                >
                  <ProductItem product={product} />
                </div>
              ))}
            </div>

            {/* ===== SEE MORE BUTTON ===== */}
            {visibleCount < allProducts.length && (
              <div className="row mt-45">
                <div className="col-12 text-center">
                  <button
                    onClick={handleSeeMore}
                    className="theme-see-more-btn"
                  >
                    See More Products
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ================= CSS ================= */}
      <style jsx>{`

        /* ---------- PRODUCT GRID CENTER ---------- */
        .product-row {
          justify-content: center;
        }

        .product-col {
          display: flex;
          justify-content: center;
        }

        /* ---------- MOBILE GRID GAP FIX ---------- */
        @media (max-width: 767px) {
          .product-col {
            padding-left: 8px;
            padding-right: 8px;
          }
        }

        /* ---------- SEE MORE BUTTON ---------- */
        .theme-see-more-btn {
          background: linear-gradient(135deg, #0b3d0b, #1abc9c);
          color: #fff;
          border: none;
          padding: 14px 46px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: .5px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.35s ease;
          box-shadow: 0 8px 20px rgba(11,61,11,0.35);
            margin-top:40px
        }

        .theme-see-more-btn:hover {
          transform: translateY(-3px) scale(1.05);
          background: linear-gradient(135deg, #083208, #17a88c);
          box-shadow:
            0 12px 28px rgba(11,61,11,0.45),
            0 0 18px rgba(26,188,156,0.40);
        }

        /* ---------- MOBILE BUTTON ---------- */
        @media (max-width: 576px) {
          .theme-see-more-btn {
            width: 50%;
            max-width: 280px;
            padding: 13px 10px;
            font-size: 14px;
            margin-top:30px
          }
        }

        /* ---------- TITLE ---------- */

        .theme-title-wrapper {
          margin-bottom: 55px;
          text-align: center;
        }

        .theme-section-title {
          font-size: 44px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #0b3d0b, #01634dff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeUp 0.6s ease;
        }

        .theme-section-subtitle {
          font-size: 16px;
          color: #555;
          letter-spacing: .5px;
          max-width: 520px;
          margin: 0 auto;
        }

        /* ---------- MOBILE FONT ---------- */
        @media (max-width: 576px) {
          .theme-section-title {
            font-size: 28px;
          }

          .theme-section-subtitle {
            font-size: 14px;
          }
        }

        /* ---------- TITLE ENTRY ANIMATION ---------- */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ShopArea;
