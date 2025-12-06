"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type IProps = {
  spacing?: string;
  categories?: any[];
};

const ShopCategory = ({ spacing = "", categories = [] }: IProps) => {
  const [loading, setLoading] = useState(false);

  if (!categories || categories.length === 0) return null;

  return (
    <>
      <div className={`shop-categories ${spacing}`}>
        <div className="wrapper">
          <div className="header">
            <h2>Explore Our Collections</h2>
            <p>Discover the perfect saree for every occasion</p>
          </div>

          <div className="grid">
            {categories.map((item) => (
              <Link
                key={item.id}
                href={`/shop?category=${item.id}`}
                onClick={() => setLoading(true)}
                className="card-link"
              >
                <div className="card">
                  <div className="img-box">
                    <Image
                      src={item.image ?? "/noimage.png"}
                      alt={item.name}
                      fill
                      sizes="(max-width: 600px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="overlay"></div>
                  </div>
                  
                  <div className="info">
                    <h3>{item.name}</h3>
                    <button className="btn">
                      Shop Now
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .shop-categories {
          padding: 70px 0;
          background: #fff;
        }

        .wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 30px;
        }

        .header {
          text-align: center;
          margin-bottom: 50px;
        }

        .header h2 {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(120deg, #064e3b, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 10px;
        }

        .header p {
          font-size: 1.1rem;
          color: #64748b;
          margin: 0;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        .card-link {
          text-decoration: none;
          display: block;
        }

        .card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          border: 2px solid transparent;
        }

        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 2px;
          background: linear-gradient(135deg, #10b981, #059669, #10b981);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .card:hover::before {
          opacity: 1;
        }

        .card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 25px 60px rgba(230, 255, 251, 0.3);
        }

        .img-box {
          position: relative;
          width: 100%;
          padding-top: 100%;
          overflow: hidden;
          background: #f8fafc;
        }

        .img-box::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          z-index: 3;
        }

        .card:hover .img-box::after {
          transform: translate(-50%, -50%) scale(1);
        }

        .img-box img {
          position: absolute;
          top: 0;
          left: 0;
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .card:hover .img-box img {
          transform: scale(1.15) rotate(2deg);
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.4));
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .card:hover .overlay {
          opacity: 1;
        }

        .info {
          padding: 25px 20px;
          text-align: center;
        }

        .info h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 18px;
          transition: color 0.3s ease;
        }

        .card:hover .info h3 {
          color: #ebf0eeff;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: linear-gradient(120deg, #10b981, #059669);
          color: #fff;
          font-size: 0.95rem;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
        }

        .btn svg {
          transition: transform 0.3s ease;
        }

        .card:hover .btn svg {
          transform: translateX(4px);
        }

        @media (max-width: 1200px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 900px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .header h2 {
            font-size: 2rem;
          }
        }

        @media (max-width: 600px) {
          .shop-categories {
            padding: 50px 0;
          }

          .wrapper {
            padding: 0 16px;
          }

          .header {
            margin-bottom: 35px;
          }

          .header h2 {
            font-size: 1.6rem;
          }

          .header p {
            font-size: 0.95rem;
          }

          .grid {
            gap: 16px;
          }

          .info {
            padding: 18px 14px;
          }

          .info h3 {
            font-size: 1.1rem;
            margin: 0 0 14px;
          }

          .btn {
            padding: 10px 22px;
            font-size: 0.85rem;
          }

          .btn svg {
            width: 14px;
            height: 14px;
          }
        }

        @media (max-width: 400px) {
          .grid {
            gap: 12px;
          }

          .header h2 {
            font-size: 1.4rem;
          }

          .info {
            padding: 15px 12px;
          }

          .info h3 {
            font-size: 1rem;
          }

          .btn {
            padding: 9px 18px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </>
  );
};

export default ShopCategory;