"use client";

import { IProduct } from "@/types/product-d-t";
import { useState, useEffect } from "react";
import ProductItem from "./single-product/product-item";

type IProps = {
  products?: IProduct[];
  spacing?: string;
  style_2?: boolean;
  featuredProducts?: IProduct[];
};

const SaleOffProducts = ({
  products = [],
  spacing = "pb-100",
  style_2 = false,
  featuredProducts = [],
}: IProps) => {
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSeeMore = () => {
    const total = featuredProducts.length || products.length;
    setVisibleCount(total);
  };

  const productsToShow =
    (featuredProducts.length ? featuredProducts : products).slice(
      0,
      visibleCount
    );

  return (
    <>
      <section className={`sale__area themed-sale-section ${spacing}`}>
        <div className="container">
          {/* TITLE */}
          <div className="row">
            <div className="col-12 text-center mb-45">
              <h2 className="sale-title">Featured Products</h2>
              <p className="sale-subtitle">
                Discover our featured products with amazing discounts and offers.
              </p>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className="row g-3">
            {productsToShow.map((product: any, i: number) => {
              const firstImage =
                product.images?.[0]?.image || "/placeholder.png";
              const normalizedProduct = { ...product, image: firstImage };

              return (
                <div
                  key={i + product?.id}
                  className="col-6 col-md-4 col-lg-4"
                >
                  <ProductItem product={normalizedProduct} />
                </div>
              );
            })}
          </div>

          {/* SEE MORE BUTTON */}
          {visibleCount <
            (featuredProducts.length || products.length) && (
            <div className="row mt-30">
              <div className="col-12 text-center">
                <button
                  onClick={handleSeeMore}
                  className="see-more-btn-theme"
                >
                  See More
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ===== THEME CSS ===== */}
        <style jsx>{`
          .themed-sale-section {
            padding-top: 60px;
          }

          .sale-title {
            font-size: 32px;
            font-weight: 700;
            color: #0b3d0b;
            margin-bottom: 10px;
            position: relative;
            display: inline-block;
          }

          .sale-title::after {
            content: "";
            position: absolute;
            width: 60%;
            height: 3px;
            left: 20%;
            bottom: -6px;
            background: linear-gradient(135deg, #0b3d0b, #1abc9c);
            border-radius: 5px;
          }

          .sale-subtitle {
            margin-top: 12px;
            color: #64748b;
            font-size: 15px;
            max-width: 520px;
            margin-inline: auto;
          }

          .see-more-btn-theme {
            padding: 14px 42px;
            border-radius: 40px;
            border: none;
            color: #fff;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            background: linear-gradient(135deg, #0b3d0b, #1abc9c);
            transition: all 0.35s ease;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
          }

          .see-more-btn-theme:hover {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
          }

          /* MOBILE ADJUST */
          @media (max-width: 767px) {
            .themed-sale-section {
              padding-top: 40px;
            }

            .sale-title {
              font-size: 24px;
            }

            .sale-subtitle {
              font-size: 14px;
            }

            .see-more-btn-theme {
              padding: 12px 34px;
              font-size: 14px;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default SaleOffProducts;
