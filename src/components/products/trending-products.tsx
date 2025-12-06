"use client";

import { IProduct } from "@/types/product-d-t";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import ProductItem from "./single-product/product-item";

type IProps = {
  trendingProd?: IProduct[];
  style_2?: boolean;
  container?: string;
};

function TrendingProducts({
  trendingProd = [],
  style_2 = false,
  container = "container",
}: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showAllMobile, setShowAllMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setVisibleCount(6);
      } else {
        setVisibleCount(8);
        setShowAllMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSeeMore = () => {
    if (isMobile) {
      setShowAllMobile((prev) => !prev);
    } else {
      setLoading(true);
      setTimeout(() => {
        setVisibleCount(trendingProd.length);
        setLoading(false);
      }, 300);
    }
  };

  const productsToShow = isMobile
    ? showAllMobile
      ? trendingProd
      : trendingProd.slice(0, visibleCount)
    : trendingProd.slice(0, visibleCount);

  return (
    <>
      {loading && <Loader />}

      <section className="product__area themed-trending-section">
        <div className={container}>
          {/* TITLE */}
          <div className="row">
            <div className="col-12 text-center mb-45">
              <h2 className="trending-title">Trending Products</h2>
              <p className="trending-subtitle">
                Discover the hottest items everyone’s talking about – top
                quality, best deals.
              </p>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div className={`row g-3 ${isMobile ? "justify-content-center" : ""}`}>
            {productsToShow.map((item: any, index: number) => {
              const firstImage = item.images?.[0]?.image || "/placeholder.png";
              const product = { ...item, image: firstImage };

              return (
                <div
                  key={index}
                  className={
                    isMobile
                      ? "col-6"
                      : "col-xl-3 col-lg-3 col-md-6 col-sm-6"
                  }
                >
                  <ProductItem product={product} setLoading={setLoading} />
                </div>
              );
            })}
          </div>

          {/* SEE MORE */}
          {trendingProd.length > visibleCount && (
            <div className="row mt-40">
              <div className="col-12 text-center">
                <button
                  onClick={handleSeeMore}
                  disabled={loading}
                  className="see-more-btn-theme"
                >
                  {loading
                    ? "Loading..."
                    : isMobile
                    ? showAllMobile
                      ? "Show Less"
                      : "See More"
                    : "See More"}
                </button>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          .themed-trending-section {
            padding-top: 60px;
            padding-bottom: 90px;
          }

          .trending-title {
            font-size: 32px;
            font-weight: 700;
            color: #0b3d0b;
            margin-bottom: 10px;
            position: relative;
            display: inline-block;
          }

          .trending-title::after {
            content: "";
            position: absolute;
            width: 60%;
            height: 3px;
            background: linear-gradient(135deg, #0b3d0b, #1abc9c);
            left: 20%;
            bottom: -6px;
            border-radius: 5px;
          }

          .trending-subtitle {
            margin-top: 12px;
            color: #64748b;
            font-size: 15px;
            max-width: 540px;
            margin-inline: auto;
          }

          .see-more-btn-theme {
            padding: 14px 42px;
            border-radius: 40px;
            border: none;
            color: #ffffff;
            font-size: 15px;
            font-weight: 600;
            margin-top: 30px;
            background: linear-gradient(135deg, #0b3d0b, #1abc9c);
            cursor: pointer;
            transition: all 0.35s ease;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
          }

          .see-more-btn-theme:hover {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 12px 26px rgba(0, 0, 0, 0.18);
          }

          .see-more-btn-theme:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          @media (max-width: 767px) {
            .themed-trending-section {
              padding-top: 40px;
              padding-bottom: 70px;
              Margin-left: 15px;
            }

            .trending-title {
              font-size: 24px;
            }

            .trending-subtitle {
              font-size: 14px;
            }

            .see-more-btn-theme {
              padding: 12px 34px;
              font-size: 14px;
              margin-top: 30px;
            }
          }
        `}</style>
      </section>
    </>
  );
}

export default TrendingProducts;
