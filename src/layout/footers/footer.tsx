"use client";
import logo from "@/assets/img/logo/strike_logo.jpeg";
import Image from "next/image";
import Link from "next/link";
import SocialLinks from "./social-links";

const footerWidget = [
  {
    id: 1,
    title: "Quick Links",
    footer__links: [
      { list: "Privacy Policy", path: "/privacy-policy" },
      { list: "Terms & Condition", path: "/terms-and-conditions" },
      { list: "Returns & Refunds", path: "/returns-and-refunds" },
    ],
  },
  {
    id: 2,
    title: "Customer Services",
    footer__links: [
      { list: "Help & Contact Us", path: "/contact" },
      { list: "Online Stores", path: "shop" },
    ],
  },
];

const Footer = ({ style_2 }: { style_2?: boolean }) => {
  return (
    <>
      {/* Ultra Stylish Modern CSS */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        
        .kayaa-ultra-footer {
          background: linear-gradient(135deg, 
            #ffffff 0%,
            #f8fafc 25%,
        
          );
          position: relative;
          font-family: 'Poppins', sans-serif;
          overflow: hidden;
          padding: 80px 0 0 0;
        }
        
        .kayaa-ultra-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at top right, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at bottom center, rgba(168, 85, 247, 0.08) 0%, transparent 50%);
          animation: backgroundShift 8s ease-in-out infinite alternate;
        }
        
        @keyframes backgroundShift {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 0.8; transform: scale(1.02); }
        }
        
        .kayaa-brand-section {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95),
            rgba(255, 255, 255, 0.85)
          );
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 28px;
          padding: 50px;
          margin-bottom: 40px;
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.08),
            0 20px 40px rgba(0, 0, 0, 0.04),
            inset 0 2px 0 rgba(255, 255, 255, 0.9);
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .kayaa-brand-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            transparent,
            rgba(16, 185, 129, 0.03),
            transparent
          );
          animation: rotate 10s linear infinite;
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .kayaa-brand-section:hover {
          transform: translateY(-8px);
          box-shadow: 
            0 40px 80px rgba(0, 0, 0, 0.12),
            0 25px 50px rgba(0, 0, 0, 0.06),
            inset 0 2px 0 rgba(255, 255, 255, 1);
        }
        
        .kayaa-logo-ultra {
          font-family: 'Poppins', sans-serif;
          font-size: 4rem;
          font-weight: 900;
          background: linear-gradient(135deg, 
            #1f2937 0%,
            #374151 25%,
            #16a34a 50%,
            #22c55e 75%,
            #10b981 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -3px;
          margin-bottom: 12px;
          position: relative;
          z-index: 2;
          text-shadow: 0 0 40px rgba(34, 197, 94, 0.2);
        }
        
        .kayaa-tagline {
          color: #64748b;
          font-size: 1.1rem;
          font-weight: 500;
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-bottom: 40px;
          position: relative;
          z-index: 2;
        }
        
        .contact-grid {
          display: grid;
          gap: 25px;
          position: relative;
          z-index: 2;
        }
        
        .contact-card-ultra {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.7)
          );
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        
        .contact-card-ultra::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.6s ease;
        }
        
        .contact-card-ultra:hover {
          transform: translateX(10px) translateY(-5px);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0.9)
          );
        }
        
        .contact-card-ultra:hover::before {
          left: 100%;
        }
        
        .contact-icon-ultra {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
          transition: all 0.4s ease;
          flex-shrink: 0;
        }
        
        .icon-location-ultra {
          background: linear-gradient(135deg, #f59e0b, #d97706, #b45309);
        }
        
        .icon-phone-ultra {
          background: linear-gradient(135deg, #10b981, #059669, #047857);
        }
        
        .icon-facebook-ultra {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8, #1e40af);
        }
        
        .contact-card-ultra:hover .contact-icon-ultra {
          transform: scale(1.15) rotate(8deg);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.2);
        }
        
        .contact-text-ultra {
          flex: 1;
        }
        
        .contact-label {
          font-size: 16px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 6px;
          letter-spacing: 0.5px;
        }
        
        .contact-info {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.6;
          font-weight: 500;
        }
        
        .contact-link-ultra {
          color: #16a34a !important;
          text-decoration: none !important;
          font-weight: 700;
          transition: all 0.3s ease;
          border-bottom: 2px solid transparent;
        }
        
        .contact-link-ultra:hover {
          color: #15803d !important;
          border-bottom-color: #15803d;
        }
        
        .links-card-ultra {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95),
            rgba(255, 255, 255, 0.85)
          );
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 24px;
          padding: 35px;
          margin-bottom: 40px;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.08),
            inset 0 2px 0 rgba(255, 255, 255, 0.9);
          transition: all 0.4s ease;
        }
        
        .links-card-ultra:hover {
          transform: translateY(-6px);
          box-shadow: 
            0 35px 70px rgba(0, 0, 0, 0.12),
            inset 0 2px 0 rgba(255, 255, 255, 1);
        }
        
        .section-title-ultra {
          font-size: 1.5rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 30px;
          position: relative;
          padding-left: 25px;
        }
        
        .section-title-ultra::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 35px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 3px;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        }
        
        .ultra-link {
          display: block;
          color: #374151 !important;
          text-decoration: none !important;
          font-weight: 600;
          font-size: 15px;
          padding: 15px 22px;
          margin: 6px 0;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          overflow: hidden;
        }
        
        .ultra-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 100%;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          transition: width 0.4s ease;
          z-index: 0;
        }
        
        .ultra-link span {
          position: relative;
          z-index: 1;
        }
        
        .ultra-link:hover {
          color: white !important;
          transform: translateX(12px) translateY(-2px);
          box-shadow: 0 12px 30px rgba(34, 197, 94, 0.2);
        }
        
        .ultra-link:hover::before {
          width: 100%;
        }
        
        .footer-bottom-ultra {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.8),
            rgba(248, 250, 252, 0.9)
          );
          border-top: 2px solid rgba(255, 255, 255, 0.3);
          padding: 40px 0;
          margin-top: 60px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }
        
        .social-ultra {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 18px;
          color: white;
          text-decoration: none;
          margin: 0 10px;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
          font-size: 22px;
        }
        
        .social-facebook { background: linear-gradient(135deg, #1877f2, #0d47a1); }
        .social-instagram { background: linear-gradient(135deg, #e4405f, #c13584, #833ab4); }
        .social-whatsapp { background: linear-gradient(135deg, #25d366, #128c7e); }
        .social-youtube { background: linear-gradient(135deg, #ff0000, #cc0000); }
        
        .social-ultra:hover {
          transform: translateY(-10px) scale(1.12);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        
        .copyright-ultra {
          color: #4b5563;
          font-weight: 600;
          font-size: 15px;
          margin: 0;
        }
        
        .brand-link {
          color: #16a34a !important;
          font-weight: 800;
          text-decoration: none;
        }
        
        /* Mobile Optimizations - NO BLUR */
        @media (max-width: 768px) {
          .kayaa-ultra-footer {
            padding: 60px 0 0 0;
          }
          
          .kayaa-logo-ultra {
            font-size: 3rem;
            letter-spacing: -2px;
          }
          
          .kayaa-brand-section,
          .links-card-ultra {
            padding: 30px 20px;
            /* Remove all blur effects on mobile */
            background: rgba(255, 255, 255, 1);
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
          
          .contact-card-ultra {
            /* Remove blur on mobile */
            background: rgba(255, 255, 255, 1);
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            padding: 20px;
          }
          
          .contact-icon-ultra {
            width: 56px;
            height: 56px;
            font-size: 20px;
          }
          
          .contact-label {
            font-size: 15px;
          }
          
          .contact-info {
            font-size: 13px;
          }
          
          .ultra-link {
            /* Remove blur on mobile */
            background: rgba(255, 255, 255, 1);
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            padding: 12px 18px;
            font-size: 14px;
          }
          
          .section-title-ultra {
            font-size: 1.3rem;
            padding-left: 20px;
          }
          
          .social-ultra {
            width: 50px;
            height: 50px;
            margin: 0 6px;
            font-size: 20px;
          }
          
          .footer-bottom-ultra {
            padding: 30px 0;
            background: rgba(255, 255, 255, 1);
          }
          
          /* Remove all transform effects on mobile for better performance */
          .kayaa-brand-section:hover,
          .contact-card-ultra:hover,
          .links-card-ultra:hover {
            transform: none;
          }
          
          .contact-card-ultra:hover .contact-icon-ultra {
            transform: scale(1.05);
          }
        }
        
        @media (max-width: 480px) {
          .kayaa-logo-ultra {
            font-size: 2.5rem;
            letter-spacing: -1px;
          }
          
          .kayaa-tagline {
            font-size: 0.9rem;
            letter-spacing: 2px;
          }
          
          .contact-card-ultra {
            padding: 15px;
            gap: 15px;
          }
          
          .contact-icon-ultra {
            width: 48px;
            height: 48px;
            font-size: 18px;
          }
        }
      `}</style>

      <section className={`footer__area kayaa-ultra-footer ${style_2 ? "box-m-15" : ""}`}>
        <div className="footer__top pb-60">
          <div className="container">
            <div className="row">
              {/* Kayaa Brand + Contact Info */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <div className="footer__widget mb-30 kayaa-brand-section">
                  <div className="footer__widget-title mb-40">
                  
                    <div className="logo-text">Kayaa</div>
                    

                   
                  </div>
                  
                  <div className="footer__widget-content">
                    <div className="contact-grid">
                      {/* Bailey Road Store */}
                      {/* <div className="contact-card-ultra">
                        <div className="contact-icon-ultra icon-location-ultra">
                          <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className="contact-text-ultra">
                          <div className="contact-label">Bailey Road Store</div>
                          <div className="contact-info">
                            Bailey Road 143/2, AQP Shopping Mall, 3rd Floor (Opposite Fakhruddin Biriyani) New Bailey Road, Dhaka
                          </div>
                        </div>
                      </div> */}

                      {/* Dhanmondi Store */}
                      {/* <div className="contact-card-ultra">
                        <div className="contact-icon-ultra icon-location-ultra">
                          <i className="fas fa-store"></i>
                        </div>
                        <div className="contact-text-ultra">
                          <div className="contact-label">Dhanmondi Store</div>
                          <div className="contact-info">
                            PLAZA AR, 3rd Floor, Shop 303 Dhanmondi 28, Dhaka
                          </div>
                        </div>
                      </div> */}

                      {/* WhatsApp */}
                      <div className="contact-card-ultra">
                        <div className="contact-icon-ultra icon-phone-ultra">
                          <i className="fab fa-whatsapp"></i>
                        </div>
                        <div className="contact-text-ultra">
                          <div className="contact-label">WhatsApp Order</div>
                          <div className="contact-info">
                            <a href="tel:+8801748399860" className="contact-link-ultra">+880 1748-399860</a>
                          </div>
                        </div>
                      </div>

                      {/* Facebook */}
                      <div className="contact-card-ultra">
                        <div className="contact-icon-ultra icon-facebook-ultra">
                          <i className="fab fa-facebook-f"></i>
                        </div>
                        <div className="contact-text-ultra">
                          <div className="contact-label">Follow Kayaa</div>
                          <div className="contact-info">
                            <a href="https://www.facebook.com/kayaabd21" target="_blank" className="contact-link-ultra">Facebook Page</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              {footerWidget.map((item) => (
                <div key={item.id} className="col-xl-3 col-lg-3 col-md-6 col-12">
                  <div className="footer__widget mb-30 links-card-ultra">
                    <div className="footer__widget-title">
                      <h5 className="section-title-ultra">{item.title}</h5>
                    </div>
                    <div className="footer__widget-content">
                      <div className="footer__links">
                        {item.footer__links.map((link, index) => (
                          <a key={index} href={link.path} className="ultra-link">
                            <span>{link.list}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        {/* <div className="footer__bottom footer-bottom-ultra">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-7 col-md-6">
                <div className="footer__copyright">
                  <p className="copyright-ultra">
                    © 2024 <Link href="/" className="brand-link">Kayaa</Link>. All rights reserved. Crafted with passion ✨
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-5 col-md-6">
                <div className="footer__social" style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <a href="https://www.facebook.com/Kayaa" target="_blank" className="social-ultra social-facebook">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social-ultra social-instagram">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://wa.me/8801748399860" className="social-ultra social-whatsapp">
                      <i className="fab fa-whatsapp"></i>
                    </a>
                    <a href="#" className="social-ultra social-youtube">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </>
  );
};

export default Footer;