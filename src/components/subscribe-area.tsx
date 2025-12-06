"use client";

import { postData } from "@/api/api";
import { useState } from "react";

type IProps = {
  style_2?: boolean;
  style_3?: boolean;
};

const SubscribeArea = ({ style_2, style_3 }: IProps) => {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email) {
        setToastMessage("Please enter your email");
        return;
      }

      const resp = await postData(`/newsletters`, { email });

      if (!resp.success) {
        setToastMessage(resp?.message || "Something went wrong!");
        return;
      }

      setToastMessage(resp?.message || "Subscribed successfully!");
    } catch {
      setToastMessage("Something went wrong!");
    } finally {
      setLoading(false);
      setEmail("");
      setTimeout(() => setToastMessage(""), 4000);
    }
  };

  return (
    <section style={{ padding: "90px 12px", background: "#f5f8f7" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-8">
            <div className="subscribe-modern-card">
              <h2>Get Discount Info</h2>
              <p>
                Subscribe to receive updates on new arrivals and exclusive
                discount offers.
              </p>

              <form onSubmit={handleSubmit} className="subscribe-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>

              {toastMessage && <div className="toast">{toastMessage}</div>}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .subscribe-modern-card {
          background: linear-gradient(135deg, #ffffff, #e6f0ec);
          border-radius: 20px;
          padding: 50px 35px;
          text-align: center;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
          transform-style: preserve-3d;
        }

        .subscribe-modern-card:hover {
          transform: translateY(-8px) rotateX(2deg);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        h2 {
          color: #0b3d0b;
          font-weight: 700;
          margin-bottom: 15px;
          font-size: 28px;
        }

        p {
          color: #555;
          font-size: 16px;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .subscribe-form {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .subscribe-form input {
          flex: 1;
          min-width: 200px;
          padding: 14px 18px;
          border-radius: 12px;
          border: 1px solid #cfd8dc;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .subscribe-form input:focus {
          outline: none;
          border-color: #0b3d0b;
          box-shadow: 0 0 12px rgba(11, 61, 11, 0.2);
        }

        .subscribe-form button {
          padding: 14px 36px;
          border-radius: 12px;
          background: linear-gradient(135deg, #0b3d0b, #1abc9c);
          color: #fff;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .subscribe-form button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(11, 61, 11, 0.3);
          background: linear-gradient(135deg, #0a350a, #17a88c);
        }

        .subscribe-form button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .toast {
          margin-top: 20px;
          display: inline-block;
          background: #d6f5e1;
          border: 1px solid #0b3d0b;
          color: #0b3d0b;
          font-weight: 500;
          padding: 10px 15px;
          border-radius: 10px;
          font-size: 14px;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .subscribe-modern-card {
            padding: 40px 20px;
          }
          .subscribe-form input,
          .subscribe-form button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default SubscribeArea;
