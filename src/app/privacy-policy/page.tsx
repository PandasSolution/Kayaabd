"use client";

import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "./loading";

export default function PrivacyPolicyPage() {
  return (
    <Wrapper>
      <Header />

      <main>
        <Suspense fallback={<Loading />}>
          <section
            style={{
              padding: "80px 16px",
              background: "linear-gradient(135deg,#f5f8f7,#ffffff)",
            }}
          >
            <div className="container d-flex justify-content-center">

              <div className="policy-card">

                {/* TITLE */}
                <h1 className="policy-title">
                  Kayaa Privacy Policy
                </h1>

                <p className="policy-sub">
                  আপনার গোপনীয়তা ও তথ্য সুরক্ষা আমাদের সর্বোচ্চ অগ্রাধিকার
                </p>

                {/* SECTION */}
                <div className="policy-section">
                  <h4>🔐 আমরা কীভাবে ডেটা ব্যবহার করি</h4>
                  <ul>
                    <li>পণ‍্য ডেলিভারি সম্পন্ন করতে</li>
                    <li>কাস্টমাইজড প্রোডাক্ট রিকমেন্ড দিতে</li>
                    <li>আমাদের অফার ও সার্ভিস আপডেট জানাতে</li>
                    <li>পেমেন্ট ভেরিফিকেশন করতে</li>
                    <li>ইউজার অভিজ্ঞতা বিশ্লেষণের জন্য</li>
                  </ul>
                </div>

                {/* SECTION */}
                <div className="policy-section">
                  <h4>📋 আমরা কী তথ্য সংগ্রহ করি</h4>
                  <ul>
                    <li>নাম, প্রোফাইল ছবি ও জন্মতারিখ</li>
                    <li>মোবাইল নম্বর, ইমেইল ও বিলিং/ডেলিভারি ঠিকানা</li>
                    <li>পেমেন্ট তথ্য (ব্যাংক ও কার্ড ইনফো)</li>
                    <li>সাইট ভিজিটের ডেটা (ডিভাইস, ব্রাউজার, ক্লিক হিস্ট্রি)</li>
                    <li>লগইন ইনফো ও অর্ডার হিস্ট্রি</li>
                    <li>লোকেশন ও আইডি সংক্রান্ত তথ্য</li>
                  </ul>
                </div>

                {/* SECTION */}
                <div className="policy-section">
                  <h4>🍪 Cookies</h4>
                  <p>
                    Cookies ইউজারের অভিজ্ঞতা উন্নত করতে ব্যবহৃত হয়।  
                    এটি বাধ্যতামূলক নয় এবং ব্রাউজার থেকেই পরিবর্তন করা যায়।
                  </p>
                </div>

                {/* SECTION */}
                <div className="policy-section">
                  <h4>🛡️ Security</h4>
                  <p>
                    আমরা আধুনিক Firewall ও Security System ব্যবহার করে
                    আপনার ডেটা নিরাপদ সার্ভারে সংরক্ষণ করি।
                  </p>
                </div>

                {/* SECTION */}
                <div className="policy-section">
                  <h4>📝 আপনার অধিকার</h4>
                  <ul>
                    <li>আপনার তথ্য দেখার অধিকার</li>
                    <li>ডাটা সংশোধন বা ডিলিটের অনুরোধ করা</li>
                    <li>ডেটা ব্যবহারের সীমা নির্ধারণ করা</li>
                  </ul>
                </div>

                {/* NOTE */}
                <div className="policy-note">
                  ⚠️ আমরা ১৮ বছরের নিচে কারো ব্যক্তিগত তথ্য সংরক্ষণ করি না।
                </div>

              </div>

            </div>
          </section>
        </Suspense>
      </main>

      <Footer />

      {/* ========== THEME CSS ========== */}
      <style jsx>{`
        .policy-card {
          max-width: 860px;
          background: rgba(255,255,255,0.92);
          padding: 50px 40px;
          border-radius: 18px;
          border: 1px solid rgba(26,188,156,0.15);
          box-shadow: 0 12px 36px rgba(11,61,11,.12);
          transition: .35s ease;
          backdrop-filter: blur(4px);
        }

        .policy-card:hover{
          transform: translateY(-4px) scale(1.01);
          // box-shadow:
          //   0 16px 45px rgba(11,61,11,.18),
          //   0 0 20px rgba(26,188,156,.12);
        }

        .policy-title{
          text-align:center;
          font-size:36px;
          font-weight:800;
          letter-spacing:1.5px;
          background: linear-gradient(135deg,#0b3d0b,#1abc9c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom:8px;
        }

        .policy-sub{
          text-align:center;
          color:#555;
          margin-bottom:35px;
          font-size:14px;
          letter-spacing:.6px;
        }

        .policy-section{
          margin-bottom:28px;
        }

        .policy-section h4{
          font-weight:700;
          margin-bottom:10px;
          color:#0b3d0b;
        }

        .policy-section ul{
          padding-left:22px;
          margin:0;
        }

        .policy-section li{
          margin-bottom:6px;
          font-size:15px;
          color:#333;
          line-height:1.7;
        }

        .policy-section p{
          margin:0;
          font-size:15px;
          color:#444;
          line-height:1.7;
        }

        .policy-note{
          background:rgba(231,76,60,0.1);
          color:#a93226;
          padding:12px 16px;
          border-radius:12px;
          font-size:14px;
          margin-top:15px;
          border-left:4px solid #e74c3c;
        }

        @media(max-width:576px){
          .policy-card{
            padding:28px 18px;
          }
          .policy-title{
            font-size:26px;
          }
        }
      `}</style>

    </Wrapper>
  );
}
