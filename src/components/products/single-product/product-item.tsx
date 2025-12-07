"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";

export default function GadgetProductCard({ product, setLoading }: any) {
  const discountPercent = product.productAttributes?.[0]?.discountPercent || 0;
  const stock = product.productAttributes?.[0]?.stockAmount ?? 0;

  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ===== 3D TILT ===== */
  const handleMouseMove = (e: any) => {
    if (!cardRef.current || isMobile) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rx = -(y / rect.height - 0.5) * 7;
    const ry =  (x / rect.width - 0.5) * 7;

    cardRef.current.style.transform = `
      perspective(900px)
      rotateX(${rx}deg)
      rotateY(${ry}deg)
      translateY(-4px)
    `;
  };

  const resetTilt = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  const handleNavigateToDetails = () => {
    setLoading && setLoading(true);
    window.location.href = `/product-details/${product.slug}`;
  };

  return (
    <div
      ref={cardRef}
      className="product-card-theme"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
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

        {/* IMAGE WHITE SHINE */}
        <span className="image-shine" />

        {discountPercent > 0 && (
          <div className="discount-badge">{discountPercent}% OFF</div>
        )}

        {stock <= 0 && <div className="out-stock-badge">Out of Stock</div>}
      </div>

      {/* INFO */}
      <div className="info-wrapper">
        <h3 className="product-title">{product.name}</h3>

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

        <button className="quick-view-btn">
          <Eye size={18} />
          <span>Quick View</span>
        </button>
      </div>

      {/* ================= CSS ================= */}
      <style jsx>{`
        /* ---------------- CARD ---------------- */
        .product-card-theme {
          width: 100%;
          height: 520px;
          background: white;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }

        .product-card-theme:hover {
          box-shadow: 0 10px 26px rgba(0,0,0,0.12);
        }

        /* ---------------- SHINE SWEEP ON CARD ---------------- */
        .product-card-theme::before {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            130deg,
            transparent,
            rgba(255,255,255,0.45),
            transparent
          );
          transform: skewX(-20deg);
          pointer-events: none;
          z-index: 2;
        }

        .product-card-theme:hover::before {
          animation: shineCard 0.9s ease forwards;
        }

        @keyframes shineCard {
          to { left: 140%; }
        }

        /* ---------------- IMAGE ---------------- */
        .product-image-wrapper{
          width:100%;
          aspect-ratio: 1 / 1.1;
          position: relative;
          overflow: hidden;
        }

        .product-image {
          object-fit: cover;
          transition: transform .35s ease;
        }

        .product-card-theme:hover .product-image {
          transform: scale(1.07);
        }

        /* ---------------- IMAGE SHINE ---------------- */
        .image-shine{
          position:absolute;
          inset:0;
          left:-120%;
          width:45%;
          height:100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255,255,255,0.55),
            transparent
          );
          transform: skewX(-18deg);
          pointer-events:none;
          z-index:2;
        }

        .product-card-theme:hover .image-shine{
          animation: shineImage .7s ease forwards;
        }

        @keyframes shineImage{
           to { left:150%; }
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
          z-index:3;
        }

        .out-stock-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: black;
          color: white;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 12px;
          z-index:3;
        }

        /* ---------------- INFO ---------------- */
        .info-wrapper {
          padding: 14px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .product-title {
          font-size: ${isMobile ? "14px" : "18px"};
          font-weight: 600;
          color: #0b3d0b;
          min-height: ${isMobile ? "36px" : "44px"};
          margin-bottom:6px;
        }

        .price-row{
          display:flex;
          gap:8px;
          margin-bottom:10px;
        }

        .sale-price {
          font-size: ${isMobile ? "18px" : "22px"};
          font-weight:700;
          color:#0b3d0b;
        }

        .regular-price{
          font-size:${isMobile ? "12px":"14px"};
          color:#94a3b8;
          text-decoration: line-through;
        }

        /* ---------------- BUTTON ---------------- */
        .quick-view-btn{
          width:100%;
          background:linear-gradient(135deg,#0b3d0b,#1abc9c);
          color:#fff;
          border:none;
          padding:10px 0;
          border-radius:14px;
          display:flex;
          gap:8px;
          justify-content:center;
          align-items:center;
          cursor:pointer;
          transition: transform .2s ease;
        }

        .quick-view-btn:hover{
          transform: scale(1.04);
        }

        @media(max-width:767px){
          .product-card-theme{
            height:350px;
          }
        }
      `}</style>
    </div>
  );
}
