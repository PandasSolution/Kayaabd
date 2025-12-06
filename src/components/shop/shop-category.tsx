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
      <div className={`shop-category-area ${spacing}`}>
        <div className="container">
          {/* Section Title */}
          <div className="section-title">
            <div className="title-badge">
              <span className="badge-dot"></span>
              <span>Shop Categories</span>
              <span className="badge-dot"></span>
            </div>
            <h2>Welcome To Kayaa</h2>
            <p>Explore our most popular and latest categories</p>
            <div className="title-underline">
              <span className="underline-animated"></span>
            </div>
          </div>

          {/* Category Grid */}
          <div className="category-grid">
            {categories.map((item, index) => (
              <Link
                key={item.id}
                href={`/shop?category=${item.id}`}
                onClick={() => setLoading(true)}
                className="category-card-link"
                style={{
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                <div className="category-card">
                  {/* Geometric Background Pattern */}
                  <div className="pattern-bg">
                    <div className="pattern-circle circle-1"></div>
                    <div className="pattern-circle circle-2"></div>
                    <div className="pattern-circle circle-3"></div>
                  </div>

                  {/* Shine Effect */}
                  <div className="shine-effect"></div>
                  
                  {/* Image Container with Clip Path */}
                  <div className="image-container">
                    <div className="image-wrapper">
                      <Image
                        src={item.image ?? "/noimage.png"}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div className="image-gradient"></div>
                    </div>
                    
                    {/* Floating Badge */}
                    <div className="floating-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 7h-9M14 17H5M15 4l5 5-5 5M9 20l-5-5 5-5"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="card-content">
                    {/* Decorative Line */}
                    <div className="deco-line">
                      <span className="line-dot"></span>
                      <span className="line-bar"></span>
                    </div>

                    {/* Name */}
                    <div className="category-name">
                      <h3>{item.name}</h3>
                      <div className="name-accent"></div>
                    </div>
                    
                    {/* Shop Now Button */}
                    <div className="button-wrapper">
                      <button className="shop-btn">
                        <span className="btn-content">
                          <span className="btn-text">Shop Now</span>
                          <span className="btn-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Side Accent */}
                  <div className="side-accent"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Background Decorations */}
        <div className="bg-decoration decoration-1"></div>
        <div className="bg-decoration decoration-2"></div>
        <div className="bg-decoration decoration-3"></div>
      </div>

      <style jsx>{`
        .shop-category-area {
          padding: 100px 0;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafb 100%);
          position: relative;
          overflow: hidden;
        }

        .bg-decoration {
          position: absolute;
          border-radius: 50%;
          opacity: 0.4;
          animation: float 20s ease-in-out infinite;
        }

        .decoration-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
          top: -100px;
          right: -100px;
        }

        .decoration-2 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(6, 78, 59, 0.1) 0%, transparent 70%);
          bottom: 100px;
          left: -50px;
          animation-delay: 5s;
        }

        .decoration-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%);
          top: 50%;
          right: 10%;
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .section-title {
          text-align: center;
          margin-bottom: 70px;
        }

        .title-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 78, 59, 0.1) 100%);
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #059669;
          margin-bottom: 20px;
          animation: badgeFadeIn 0.8s ease-out;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes badgeFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.7; }
        }

        .section-title h2 {
          font-size: 3.2rem;
          background: linear-gradient(135deg, #064e3b 0%, #10b981 50%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 15px;
          font-weight: 800;
          letter-spacing: -1px;
          animation: slideUp 0.8s ease-out 0.2s backwards;
        }

        .section-title p {
          font-size: 1.15rem;
          color: #6b7280;
          animation: fadeIn 1s ease-out 0.4s backwards;
          margin-bottom: 20px;
        }

        .title-underline {
          display: flex;
          justify-content: center;
          margin-top: 15px;
        }

        .underline-animated {
          height: 4px;
          width: 80px;
          background: linear-gradient(90deg, transparent, #10b981, transparent);
          border-radius: 10px;
          animation: expandWidth 1.2s ease-out 0.6s backwards;
        }

        @keyframes expandWidth {
          from { width: 0; }
          to { width: 80px; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 3rem;
        }

        .category-card-link {
          text-decoration: none;
          animation: cardFadeIn 0.8s ease-out backwards;
        }

        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .category-card {
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          border: 2px solid transparent;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .pattern-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .category-card:hover .pattern-bg {
          opacity: ;
        }

        .pattern-circle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
        }

        .circle-1 { width: 150px; height: 150px; top: -50px; right: -50px; animation: rotate 15s linear infinite; }
        .circle-2 { width: 100px; height: 100px; bottom: -30px; left: -30px; animation: rotate 20s linear infinite reverse; }
        .circle-3 { width: 80px; height: 80px; top: 50%; left: 50%; animation: rotate 25s linear infinite; }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .shine-effect {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
          z-index: 3;
          transform: skewX(-20deg);
          transition: left 0.7s ease;
        }

        .category-card:hover .shine-effect {
          left: 150%;
        }

        .category-card:hover {
          transform: translateY(-18px) scale(1.03);
          box-shadow: 0 25px 60px rgba(16, 185, 129, 0.2);
          border-color: #10b981;
        }

        .image-container {
          position: relative;
          padding: 20px 20px 0;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
          border-radius: 16px;
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60%;
          background: linear-gradient(to top, rgba(16, 185, 129, 0.3), transparent);
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1;
        }

        .category-card:hover .image-gradient { opacity: 1; }

        .image-wrapper img {
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .category-card:hover .image-wrapper img {
          transform: scale(1.15) rotate(2deg);
        }

        .floating-badge {
          position: absolute;
          top: 35px;
          right: 35px;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
          z-index: 2;
          opacity: 0;
          transform: scale(0) rotate(-180deg);
          transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .category-card:hover .floating-badge {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        .floating-badge svg {
          width: 24px;
          height: 24px;
          color: white;
          animation: iconFloat 2s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .card-content {
          padding: 25px;
          position: relative;
          z-index: 2;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .deco-line {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 15px;
          opacity: 0;
          transform: translateX(-20px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
        }

        .category-card:hover .deco-line {
          opacity: 1;
          transform: translateX(0);
        }

        .line-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
        }

        .line-bar {
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #10b981, transparent);
          border-radius: 10px;
        }

        .category-name {
          margin-bottom: 20px;
        }

        .category-name h3 {
          font-size: 1.6rem;
          color: #1f2937;
          font-weight: 700;
          margin: 0 0 8px 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: -0.5px;
          line-height: 1.3;
        }

        .category-card:hover .category-name h3 {
          color: #10b981;
          transform: translateX(5px);
        }

        .name-accent {
          width: 0;
          height: 4px;
          background: linear-gradient(90deg, #10b981, #059669);
          border-radius: 10px;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }

        .category-card:hover .name-accent {
          width: 70px;
        }

        /* ===================== */
        /* Updated Button CSS */
        .button-wrapper {
          position: relative;
          margin-top: auto;
        }

        .shop-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 28px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: #fff;
          border: none;
          border-radius: 14px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .shop-btn:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 10px 20px rgba(16, 185, 129, 0.4);
        }

        .btn-content {
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .btn-text {
          font-weight: 700;
        }

        .btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s ease;
        }

        .shop-btn:hover .btn-icon {
          transform: translateX(5px);
          animation: arrowBounce 0.8s ease-in-out infinite;
        }

        @keyframes arrowBounce {
          0%, 100% { transform: translateX(5px); }
          50% { transform: translateX(10px); }
        }

        .side-accent {
          position: absolute;
          right: -8px;
          top: 20px;
          width: 8px;
          height: 80%;
          background: linear-gradient(180deg, #10b981, #059669);
          border-radius: 10px;
          opacity: 0.6;
        }
      `}</style>
    </>
  );
};

export default ShopCategory;
