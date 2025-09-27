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
    setVisibleCount((prev) => Math.min(prev + PRODUCTS_PER_LOAD, allProducts.length));
  };

  const productsToShow = allProducts.slice(0, visibleCount);

  return (
    <section className="shop__area pt-100 pb-100">
      <div className="container">
        {/* Category Headline */}
        {categoryName && (
          <div className="section__title-wrapper text-center mb-55">
            <div className="section__title mb-10">
              <h2>{categoryName}</h2>
            </div>
            <div className="section__sub-title">
              <p>Check out all products under {categoryName}</p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {allProducts.length === 0 ? (
          <p className="text-center">No products found in this category.</p>
        ) : (
          <>
            <div className="row g-4">
              {productsToShow.map((product: any) => (
                <div
                  key={product.id}
                  className="col-xl-4 col-lg-4 col-md-6 col-sm-12"
                >
                  <ProductItem product={product} />
                </div>
              ))}
            </div>

            {/* See More Button */}
            {visibleCount < allProducts.length && (
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
          </>
        )}
      </div>
    </section>
  );
};

export default ShopArea;
