"use client";

import { IProduct } from "@/types/product-d-t";
import { useState, useEffect } from "react";
import ProductItem from "./single-product/product-item";

type IProps = {
  products?: IProduct[];          // optional
  spacing?: string;
  style_2?: boolean;
  featuredProducts?: IProduct[];  // array of products
};

const SaleOffProducts = ({
  products = [],
  spacing = "pb-100",
  style_2 = false,
  featuredProducts = [],
}: IProps) => {
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisibleCount(mobile ? 10 : 12);
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
    (featuredProducts.length > 0 ? featuredProducts : products).slice(
      0,
      visibleCount
    );

  return (
    <section className={`sale__area ${spacing}`}>
      <div className="container">
        {/* Section Title */}
        <div className="row">
          <div className="col-12">
            <div className="section__title-wrapper text-center mb-55">
              <div className="section__title mb-10">
                <h2>Top Picks for You</h2>
              </div>
              <div className="section__sub-title">
                <p>
                 Explore our featured collection and grab the best deals before they’re gone!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          {productsToShow.map((product: any, i: number) => {
            const firstImage = product.images?.[0]?.image || "/placeholder.png";
            const normalizedProduct = { ...product, image: firstImage };
            return (
              <div
                key={i + product?.id}
                className="col-12 col-sm-6 col-md-4 col-lg-4 sale__item"
              >
                <ProductItem product={normalizedProduct} />
              </div>
            );
          })}
        </div>

        {/* See More Button */}
        {visibleCount < (featuredProducts.length || products.length) && (
          <div className="row mt-25">
            <div className="col-12 text-center">
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
  );
};

export default SaleOffProducts;
