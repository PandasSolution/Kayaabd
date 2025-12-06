"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingCart, Zap } from "lucide-react";

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
  style={{
    width: "100%",
    borderRadius: "16px",
    background: "#ffffff",
    border: "1px solid #e5e5e5",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative",
  }}
  onClick={handleNavigateToDetails}
>
  {/* Shiny overlay */}
  <div
    className="shiny-overlay"
    style={{
      position: "absolute",
      top: 0,
      left: "-75%",
      width: "50%",
      height: "100%",
      background:
        "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
      transform: "skewX(-25deg)",
      transition: "all 0.7s ease",
      zIndex: 2,
      pointerEvents: "none",
    }}
  />


      {/* IMAGE */}
      <div
        onClick={handleNavigateToDetails}
        className="product-image-wrapper"
        style={{
          width: "100%",
          aspectRatio: "1 / 1.1", // maintain ratio
          overflow: "hidden",
          position: "relative",
          borderRadius: "16px 16px 0 0",
          cursor: "pointer",
        }}
      >
        <Image
          src={product?.images?.[0]?.image ?? "/noimage.png"}
          alt={product.name}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
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
      <div
        style={{
          flex: 1,
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{
            fontSize: isMobile ? "14px" : "20px",
            fontWeight: 600,
            color: "#0b3d0b", // theme color
            lineHeight: 1.2,
            minHeight: isMobile ? "36px" : "44px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            marginBottom: "8px",
          }}
        >
          {product.name}
        </h3>

        {/* PRICE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: isMobile ? "18px" : "25px",
              fontWeight: 700,
              color: "#0b3d0b", // theme color
            }}
          >
            {product.productAttributes?.[0]?.discountedRetailPrice} TK
          </span>
          {discountPercent > 0 && (
            <span
              style={{
                fontSize: isMobile ? "12px" : "14px",
                fontWeight: 500,
                color: "#94a3b8",
                textDecoration: "line-through",
              }}
            >
              {product.productAttributes?.[0]?.retailPrice}
            </span>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          <button
            onClick={handleNavigateToDetails}
            disabled={stock <= 0}
            className="add-cart-btn-theme"
          >
            <ShoppingCart size={16} /> Add
          </button>

          <button
            onClick={handleNavigateToDetails}
            disabled={stock <= 0}
            className="buy-now-btn-theme"
          >
            <Zap size={16} /> Buy
          </button>
        </div>
      </div>

      {/* CSS for zoom and theme */}
     <style jsx>{`
  .product-card-theme {
    width: 100%;
    border-radius: 16px;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    height: 520px; /* Desktop height */
  }

  /* ✅ MOBILE RESPONSIVE HEIGHT */
  @media (max-width: 767px) {
    .product-card-theme {
      height: 390px;   /* Mobile compact height */
    }

    .product-image-wrapper {
      aspect-ratio: 1 / 1;
    }

    .product-image {
      transform: scale(1);
    }
  }

  /* Desktop hover zoom */
  .product-card-theme:hover .product-image {
    transform: scale(1.08);
  }

  /* Shining effect */
  .product-card-theme::after {
    content: "";
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      120deg,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0.2) 50%,
      rgba(255,255,255,0) 100%
    );
    transform: skewX(-25deg);
    transition: all 0.7s ease;
    z-index: 2;
  }

  .product-card-theme:hover::after {
    left: 125%;
  }

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
    z-index: 10;
  }

  .out-stock-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #000;
    color: #fff;
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    z-index: 10;
  }

  .add-cart-btn-theme {
    flex: 1;
    padding: 10px 0;
    border-radius: 12px;
    background: #ffffff;
    border: 1px solid #0b3d0b;
    color: #0b3d0b;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    transition: all 0.3s ease;
  }

  .add-cart-btn-theme:hover {
    background: rgba(11,61,11,0.05);
    transform: translateY(-2px);
  }

  .buy-now-btn-theme {
    flex: 1;
    padding: 10px 0;
    border-radius: 12px;
    background: linear-gradient(135deg, #0b3d0b, #1abc9c);
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border: none;
    transition: all 0.3s ease;
  }

  .buy-now-btn-theme:hover {
    background: linear-gradient(135deg, #0a350a, #16a085);
    transform: translateY(-2px);
  }
`}</style>
    </div>
  );
}
