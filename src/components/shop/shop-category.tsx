"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Loader from "../Loader";

type IProps = {
  spacing?: string;
  categories?: any[];
};

const ShopCategory = ({ spacing = "", categories = [] }: IProps) => {
  const [loading, setLoading] = useState(false);

  if (!categories || categories.length === 0) return null;

  return (
    <>
      {loading && <Loader />}
      <div
        className={`banner__area ${spacing}`}
        style={{ padding: "4rem 0 2rem 0" }}
      >
        <div className="container">
          {/* Section Title */}
          <div className="section__title-wrapper text-center mb-55">
            <div className="section__title mb-10">
              <h2>Welcome To kayaa</h2>
            </div>
            <div className="section__sub-title p-relative">
              <p>Check out our most popular and latest categories</p>
            </div>
          </div>

          {/* Category Cards */}
          <div className="row g-4">
            {categories.map((item) => (
              <div
                key={item.id}
                className="col-xl-4 col-lg-4 col-md-12 col-sm-12"
              >
                <Link
                  href={`/shop?category=${item.id}`}
                  onClick={() => setLoading(true)}
                  className="category-card-link"
                >
                  <div className="category-card">
                    {/* Image Wrapper */}
                    <div className="category-image">
                      <Image
                        src={item.image ?? "/noimage.png"}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    {/* Overlay Content */}
                    <div className="card-overlay">
                      <h5>{item.name}</h5>
                      <h4 className="shop-btn">Shop Now</h4>
                      {item.smDesc && (
                        <p>
                          {item.smDesc.length > 60
                            ? item.smDesc.slice(0, 60) + "..."
                            : item.smDesc}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCategory;
