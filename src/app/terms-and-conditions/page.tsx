"use client";

import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "./loading";

export default function TermsAndConditionsPage() {
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
                  Kayaa Terms & Conditions
                </h1>

                <p className="policy-sub">
                  আমাদের ওয়েবসাইট ব্যবহার করার আগে শর্তাবলী মনোযোগ সহকারে পড়ুন
                </p>


                {/* ---- SECTION ---- */}
                <div className="policy-section">
                  <h4>📜 সাধারণ শর্ত</h4>
                  <p>
                    Kayaa একটি অনলাইন মার্কেটপ্লেস। আমাদের
                    ওয়েবসাইটে প্রবেশ বা ব্যবহার করার মাধ্যমে আপনি
                    এই শর্তাবলী মেনে সম্মত হচ্ছেন। এই শর্তাবলীতে অসম্মত হলে
                    অনুগ্রহ করে সাইট ব্যবহার থেকে বিরত থাকুন।
                  </p>
                </div>

                {/* ---- SECTION ---- */}
                <div className="policy-section">
                  <h4>🔁 নীতিমালা পরিবর্তন</h4>
                  <p>
                    পূর্ব নোটিশ ছাড়াই আমরা যেকোনো সময় শর্তাবলী
                    সংযোজন, সংশোধন বা বাতিল করার অধিকার সংরক্ষণ করি।
                    সর্বশেষ আপডেট জানতে নিয়মিত এই পেইজ দেখুন।
                  </p>
                </div>

                {/* ---- SECTION ---- */}
                <div className="policy-section">
                  <h4>👤 একাউন্ট দায়বদ্ধতা</h4>
                  <ul>
                    <li>সঠিক তথ্য দিয়ে একাউন্ট তৈরি করা আবশ্যক</li>
                    <li>পাসওয়ার্ড ও লগইন তথ্য গোপন রাখা আপনার দায়িত্ব</li>
                    <li>কোনোরূপ সন্দেহজনক কার্যকলাপ হলে আমাদের জানাতে হবে</li>
                  </ul>
                </div>

                {/* ---- SECTION ---- */}
                <div className="policy-section">
                  <h4>🛍️ পণ্য ও কন্টেন্ট</h4>
                  <ul>
                    <li>সাইটের ছবি এবং তথ্য তথ্য প্রদানের উদ্দেশ্যে</li>
                    <li>সাপ্লায়ারের ভুলের কারণে তথ্য হালনাগাদ নাও থাকতে পারে</li>
                    <li>যাচাই করে অর্ডার করার অনুরোধ করা হচ্ছে</li>
                    <li>অনুমতি ছাড়া কন্টেন্ট বাণিজ্যিকভাবে ব্যবহার আইনত দণ্ডনীয়</li>
                  </ul>
                </div>

                {/* ---- SECTION ---- */}
                <div className="policy-section">
                  <h4>📦 স্টক ও অর্ডার</h4>
                  <ul>
                    <li>স্টক তথ্য রিয়েল টাইমে পরিবর্তিত হতে পারে</li>
                    <li>অপ্রাপ্য হলে অর্ডার ক্যানসেল হতে পারে</li>
                    <li>SMS অথবা Email দ্বারা গ্রাহককে জানানো হবে</li>
                  </ul>
                </div>

                {/* ---- SECTION ---- */}
                <div className="policy-section">
                  <h4>✅ অর্ডার যাচাইকরণ</h4>
                  <p>
                    প্রতারণা প্রতিরোধে Kayaa পেমেন্ট
                    ও ব্যক্তিগত তথ্য যাচাই করার অধিকার রাখে।
                    সঠিক তথ্য না দিলে পূর্ব নোটিশ ছাড়াই
                    অর্ডার বাতিল করা হতে পারে।
                  </p>
                </div>


                {/* ---- NOTE ---- */}
                <div className="policy-note">
                  ⚠️ Kayaa যেকোনো সময় একাউন্ট বাতিল বা পরিষেবা বন্ধ করার অধিকার সংরক্ষণ করে।
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
