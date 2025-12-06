"use client";

import { ShoppingCart, Truck, Shield, Tag } from "lucide-react";

export default function ShopFeatures3D() {
  const features = [
    {
      title: "Easy Shopping",
      desc: "Browse and order products easily from our user-friendly platform.",
      icon: <ShoppingCart size={24} />,
    },
    {
      title: "Fast Delivery",
      desc: "Get your products delivered quickly at your doorstep.",
      icon: <Truck size={24} />,
    },
    {
      title: "Secure Payment",
      desc: "Pay safely via online payment or cash on delivery.",
      icon: <Shield size={24} />,
    },
    {
      title: "Best Offers",
      desc: "Enjoy amazing discounts and exclusive deals on popular items.",
      icon: <Tag size={24} />,
    },
  ];

  return (
    <section style={{ padding: "60px 15px", background: "#f0f4f3" }}>
      <div className="features-3d-container">
        <h2 className="features-heading">Our Online Shop Features</h2>
        <div className="features-grid">
          {features.map((item, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .features-3d-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .features-heading {
          font-size: 28px;
          font-weight: 700;
          color: #0b3d0b;
          margin-bottom: 50px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .feature-card {
          background: #fff;
          padding: 30px 20px;
          border-radius: 20px;
          border: 1px solid #e5e5e5;
          box-shadow: 0 6px 25px rgba(11, 61, 11, 0.1);
          transform-style: preserve-3d;
          transition: all 0.35s ease;
          cursor: pointer;
        }

        .feature-card:hover {
          transform: translateY(-10px) rotateX(1deg) rotateY(1deg) scale(1.03);
          box-shadow:
            0 15px 50px rgba(11, 61, 11, 0.2),
            0 0 20px rgba(11, 61, 11, 0.15);
        }

        .feature-icon {
          width: 50px;
          height: 50px;
          margin: 0 auto 15px auto;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0b3d0b, #1abc9c);
          color: #fff;
          border-radius: 50%;
        }

        .feature-card h4 {
          font-size: 18px;
          font-weight: 600;
          color: #0b3d0b;
          margin-bottom: 10px;
        }

        .feature-card p {
          font-size: 14px;
          color: #555;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .features-heading {
            font-size: 22px;
            margin-bottom: 35px;
          }

          .feature-card {
            padding: 25px 15px;
          }

          .feature-icon {
            width: 40px;
            height: 40px;
          }

          .feature-card h4 {
            font-size: 16px;
          }

          .feature-card p {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}
