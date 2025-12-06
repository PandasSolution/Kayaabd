"use client";

import { ShoppingCart, Zap, CreditCard, CheckCircle } from "lucide-react";

export default function InstructionCard3DWithIcons() {
  const instructions = [
    { title: "Select Product", desc: "Browse and choose your desired item.", icon: <ShoppingCart size={20} /> },
    { title: "Add to Cart", desc: "Click Add button to put the product into cart.", icon: <Zap size={20} /> },
    { title: "Choose Payment", desc: "Pay via Online or Cash on Delivery.", icon: <CreditCard size={20} /> },
    { title: "Confirm Order", desc: "Submit your order and get instant confirmation.", icon: <CheckCircle size={20} /> },
  ];

  return (
    <section style={{ padding: "50px 12px", background: "#f8fffaff" }}>
      <div className="instruction-3d-card">
        <h2 className="card-heading">How to Order</h2>
        <ul className="instruction-list">
          {instructions.map((item, index) => (
            <li key={index}>
              <div className="step-icon">{item.icon}</div>
              <div className="step-content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* INLINE CSS */}
      <style jsx>{`
        .instruction-3d-card {
          background: #e7f8f2ff;
          border-radius: 18px;
          padding: 40px 30px;
          max-width: 900px;
          margin: 0 auto;
          box-shadow: 0 6px 25px rgba(11, 61, 11, 0.1);
          transform-style: preserve-3d;
          transition: all 0.35s ease;
          border: 1px solid #e5e5e5;
        }

        .instruction-3d-card:hover {
          transform: translateY(-8px) rotateX(1deg) rotateY(1deg) scale(1.02);
          box-shadow:
            0 15px 50px rgba(59, 126, 59, 0.2),
            0 0 20px rgba(193, 218, 193, 0.15);
        }

        .card-heading {
          color: #0b3d0b;
          font-size: 26px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 30px;
        }

        .instruction-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .instruction-list li {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 20px;
        }

        .step-icon {
          width: 36px;
          height: 36px;
          min-width: 36px;
          background: linear-gradient(135deg, #0b3d0b, #1abc9c);
          color: #fff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .step-content h4 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
          color: #0b3d0b;
        }

        .step-content p {
          margin: 0;
          font-size: 14px;
          color: #555;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .instruction-3d-card {
            padding: 25px 20px;
          }

          .card-heading {
            font-size: 22px;
            margin-bottom: 20px;
          }

          .step-icon {
            width: 28px;
            height: 28px;
          }

          .step-content h4 {
            font-size: 14px;
          }

          .step-content p {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}
