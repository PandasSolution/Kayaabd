"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function GadgetProductCard({ product, setLoading }: any) {
  const discountPercent = product.productAttributes?.[0]?.discountPercent || 0;
  const stock = product.productAttributes?.[0]?.stockAmount ?? 0;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigateToDetails = () => {
    setLoading && setLoading(true);
    window.location.href = `/product-details/${product.slug}`;
  };

  return (
    <div
      className="product-card-theme"
      onClick={handleNavigateToDetails}
    >
      {/* IMAGE */}
      <div className="product-image-wrapper">
        <Image
          src={product?.images?.[0]?.image ?? "/noimage.png"}
          alt={product.name}
          fill
          className="product-image"
        />

        {discountPercent > 0 && (
          <div className="discount-badge">{discountPercent}% OFF</div>
        )}

        {stock <= 0 && (
          <div className="out-stock-badge">Out of Stock</div>
        )}
      </div>

      {/* INFO */}
      <div className="info-wrapper">
        <h3 className="product-title">{product.name}</h3>

        {/* PRICE */}
        <div className="price-row">
          <span className="sale-price">
            {product.productAttributes?.[0]?.discountedRetailPrice} TK
          </span>

          {discountPercent > 0 && (
            <span className="regular-price">
              {product.productAttributes?.[0]?.retailPrice}
            </span>
          )}
        </div>

        {/* ✅ QUICK VIEW BUTTON (PRICE ER NICHE) */}
        <button
          className="quick-view-btn"
          onClick={handleNavigateToDetails}
        >
          <Eye size={18} />
          <span>Quick View</span>
        </button>
      </div>

      {/* ================= CSS ================= */}
      <style jsx>{`
        .product-card-theme {
          width: 100%;
          height: 520px;
          background: #fff;
          border-radius: 16px;
          border: 1px solid #e5e5e5;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 767px) {
          .product-card-theme {
            height: 350px;
          }
        }

        /* IMAGE */
        .product-image-wrapper {
          width: 100%;
          aspect-ratio: 1 / 1.1;
          position: relative;
          overflow: hidden;
          border-radius: 16px 16px 0 0;
        }

        .product-image {
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .product-card-theme:hover .product-image {
          transform: scale(1.06);
        }

        /* BADGES */
        .discount-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: linear-gradient(135deg, #0b3d0b, #1abc9c);
          color: white;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 700;
        }

        .out-stock-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #000;
          color: white;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        /* INFO */
        .info-wrapper {
          padding: 14px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .product-title {
          font-size: ${isMobile ? "14px" : "20px"};
          font-weight: 600;
          color: #0b3d0b;
          line-height: 1.2;
          min-height: ${isMobile ? "36px" : "44px"};
          margin-bottom: 6px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .price-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px; /* ✅ price niche gap */
        }

        .sale-price {
          font-size: ${isMobile ? "18px" : "24px"};
          font-weight: 700;
          color: #0b3d0b;
        }

        .regular-price {
          font-size: ${isMobile ? "12px" : "14px"};
          color: #94a3b8;
          text-decoration: line-through;
        }

        /* QUICK VIEW BUTTON */
        .quick-view-btn {
          width: 100%;
          background: linear-gradient(135deg, #0b3d0b, #1abc9c);
          color: #fff;
          border: none;
          padding: 10px 0;
          border-radius: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 8px 18px rgba(0,0,0,0.25);
          transition: 0.3s ease;
        }

        .quick-view-btn:hover {
          transform: translateY(-2px) scale(1.04);
          background: linear-gradient(135deg, #083208, #16a085);
        }
      `}</style>
    </div>
  );
}
