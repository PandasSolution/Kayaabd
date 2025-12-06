"use client";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "./loading";

export default async function ReturnsAndRefundsPage() {
  return (
    <Wrapper>
      <Header />

      <main>
        <Suspense fallback={<Loading />}>
          <section className="product__area pt-30 pb-100">
            <div className="container">

              {/* Title */}
              <div className="section__title-wrapper text-center mb-40">
                <h2 className="mb-10">Return & Refund Policy</h2>
                <p>আমাদের সহজ ও গ্রাহকবান্ধব রিটার্ন এবং রিফান্ড নিয়মাবলী</p>
              </div>

              <div className="row justify-content-center">
                <div className="col-xl-9 col-lg-10 col-md-11 col-12">

                  {/* MAIN CARD */}
                  <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">

                    {/* Return Section */}
                    <div className="mb-4">
                      <h4 className="mb-3">🔄 রিটার্ন পলিসি</h4>

                      <p>
                        প্রোডাক্ট ডেলিভারির <strong>৭ দিনের মধ্যে</strong> রিটার্ন প্রযোজ্য –
                      </p>

                      <ul className="list-unstyled policy-list mt-2">
                        <li>✅ নষ্ট বা ভাঙ্গা পণ্য</li>
                        <li>✅ ভুল সাইজ</li>
                        <li>✅ ভুল প্রোডাক্ট পাঠানো</li>
                        <li>✅ ছবির সাথে মিল না থাকা</li>
                        <li>✅ পরিমাণ কম পাওয়া</li>
                      </ul>

                      <p className="mt-3">
                        রিটার্ন করতে অর্ডার নাম্বার এবং সমস্যার বিস্তারিত উল্লেখ করে যোগাযোগ করতে হবে।
                      </p>

                      <div className="alert alert-warning mt-3">
                        ⚠️ পার্সেল পাঠানোর সময় অবশ্যই <strong>Order No</strong> ও
                        <strong> Return Tracking No</strong> প্যাকেটে লিখে পাঠাতে হবে।
                      </div>
                    </div>

                    <hr />

                    {/* Refund Section */}
                    <div className="mt-4">
                      <h4 className="mb-3">💳 রিফান্ড পলিসি</h4>

                      <ul className="list-unstyled policy-list mt-2">
                        <li>✅ রিটার্ন গ্রহণের পর</li>
                        <li>
                          ✅ <strong>৭–১০ কর্মদিবসের মধ্যে</strong> রিফান্ড সম্পন্ন হবে
                        </li>
                        <li>✅ সাধারণত আরও দ্রুত রিফান্ড পাওয়া যায়</li>
                      </ul>

                      <p className="mt-3">
                        কোনো রিটার্ন রিকোয়েস্ট বাতিল হলে পণ্য পুনরায় পাঠানো হবে।
                      </p>

                      <div className="alert alert-danger mt-3">
                        ⚠️ ৩ বার ডেলিভারি অ্যাটেম্প্ট ব্যর্থ হলে কর্তৃপক্ষ দায়ী থাকবে না
                        এবং কোন প্রকার রিফান্ড প্রদান করা হবে না।
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </section>
        </Suspense>
      </main>

      <Footer />
    </Wrapper>
  );
}
