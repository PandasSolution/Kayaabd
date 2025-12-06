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
    <section className="shop__area pt-100 pb-100">
      <div className="container">

        {/* Category Headline */}
      {/* Category Headline */}
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
            {/* Products Grid */}
            <div className="row g-4">
              {productsToShow.map((product: any) => (
                <div
                  key={product.id}
                  className="col-xl-4 col-lg-4 col-md-6 col-6 product-col"
                >
                  <ProductItem product={product} />
                </div>
              ))}
            </div>

            {/* SEE MORE BUTTON */}
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

        /* ---------- Responsive 2 Column Mobile ---------- */
        @media (max-width: 767px) {
          .product-col {
            padding-left: 6px;
            padding-right: 6px;
          }
        }

        /* ---------- See More Button Theme ---------- */
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
        }

        /* Hover Animation */
        .theme-see-more-btn:hover {
          transform: translateY(-3px) scale(1.05);
          background: linear-gradient(135deg, #083208, #17a88c);
          box-shadow:
            0 12px 28px rgba(11,61,11,0.45),
            0 0 18px rgba(26,188,156,0.40);
        }

        /* Mobile Button Size */
        @media (max-width: 576px) {
          .theme-see-more-btn {
            width: 100%;
            padding: 14px 10px;
            font-size: 14px;
          }
        }

        /* ---------- THEME TITLE ---------- */

.theme-title-wrapper {
  margin-bottom: 55px;
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
}

/* MOBILE FONT */
@media (max-width: 576px) {
  .theme-section-title {
    font-size: 28px;
  }
}

/* TITLE ENTRY ANIMATION */
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
