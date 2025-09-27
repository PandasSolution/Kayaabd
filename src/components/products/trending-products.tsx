"use client";

import { IProduct } from "@/types/product-d-t";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import ProductItem from "./single-product/product-item";

// props type
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
  const [visibleCount, setVisibleCount] = useState<number>(12); // default desktop 12
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // check window width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // mobile breakpoint
      setVisibleCount(window.innerWidth < 768 ? 10 : 12);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSeeMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount(trendingProd.length); // all products
      setLoading(false);
    }, 500); // loading effect
  };

  return (
    <>
      {loading && <Loader />}
      <section className="product__area pt-60 pb-100">
        <div className={`${container}`}>
          <div className="row">
            <div className="section__title-wrapper text-center mb-55">
              <div className="section__title mb-10">
                <h2>Elegant & Trending Sarees</h2>
              </div>
              <div className="section__sub-title">
                <p>
                Wrap yourself in beauty and grace with our curated collection of trending sharees.
                </p>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="row g-4">
            {trendingProd?.slice(0, visibleCount).map((item: any, index: number) => {
              const firstImage = item.images?.[0]?.image || "/placeholder.png";
              const product = { ...item, image: firstImage };

              return (
                <div
                  key={index}
                  className="col-xl-4 col-lg-4 col-md-12 col-sm-6"
                >
                  <ProductItem product={product} setLoading={setLoading} />
                </div>
              );
            })}
          </div>

          {/* See More Button */}
          {visibleCount < trendingProd.length && (
            <div className="row mt-25">
              <div className="col-xl-12 text-center">
                <button
                  onClick={handleSeeMore}
                  className="os-btn os-btn-3 cursor-pointer"
                >
                  See More
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default TrendingProducts;
