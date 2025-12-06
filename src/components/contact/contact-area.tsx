"use client";

import SocialLinks from "@/layout/footers/social-links";
import ContactForm from "../forms/contact-form";

const contactInfo = [
  {
    id: 0,
    icon: "fal fa-map-marker-alt",
    title: "Outlet Address:",
    subtitle: `TBA`,
  },
  {
    id: 2,
    icon: "fal fa-phone-alt",
    title: "WhatsApp Order:",
    subtitle: "+8801748399860",
  },
];

const ContactArea = () => {
  return (
    <section
      className="contact__area"
      style={{
        padding: "95px 0 100px",
        background: "#f9f9f9",
      }}
    >
      <div className="container">
        <div
          className="row"
          style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}
        >
          {/* Contact Info */}
          <div
            className="col-xl-6 col-lg-6"
            style={{ flex: "1", minWidth: "300px" }}
          >
            <div
              className="contact__info"
              style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <h3 style={{ color: "#0b3d0b", marginBottom: "25px" }}>
                Find us here.
              </h3>

              <ul style={{ listStyle: "none", padding: 0, marginBottom: "35px" }}>
                {contactInfo.map((item) => (
                  <li
                    key={item.title}
                    className="d-flex"
                    style={{ display: "flex", alignItems: "center", marginBottom: "25px" }}
                  >
                    <div
                      className="contact__info-icon"
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        background: "#0b3d0b",
                        color: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "15px",
                        fontSize: "18px",
                      }}
                    >
                      <i className={item.icon}></i>
                    </div>
                    <div className="contact__info-content">
                      <h6 style={{ margin: 0, fontWeight: 600, color: "#0b3d0b" }}>
                        {item.title}
                      </h6>
                      {item?.id === 2 ? (
                        <a
                          href={`https://wa.me/${item.subtitle.replace(
                            /[^0-9]/g,
                            ""
                          )}?text=Hello!%20I%20want%20to%20inquire%20about%20your%20products.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#1abc9c", textDecoration: "none" }}
                        >
                          {item.subtitle}
                        </a>
                      ) : (
                        <span style={{ color: "#555" }}>{item.subtitle}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Follow Us Section */}
              <div className="follow-us">
                <h6 style={{ color: "#0b3d0b", marginBottom: "15px", fontWeight: 600 }}>
                  Follow Us
                </h6>
                <ul
                  style={{
                    display: "flex",
                    gap: "15px",
                    padding: 0,
                    margin: 0,
                    listStyle: "none",
                  }}
                >
                  <li>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "#1877f2",
                        color: "#fff",
                        fontSize: "18px",
                        transition: "all 0.3s ease",
                      }}
                      className="social-icon"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "#1da1f2",
                        color: "#fff",
                        fontSize: "18px",
                        transition: "all 0.3s ease",
                      }}
                      className="social-icon"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "#e4405f",
                        color: "#fff",
                        fontSize: "18px",
                        transition: "all 0.3s ease",
                      }}
                      className="social-icon"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "#0a66c2",
                        color: "#fff",
                        fontSize: "18px",
                        transition: "all 0.3s ease",
                      }}
                      className="social-icon"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="col-xl-6 col-lg-6"
            style={{ flex: "1", minWidth: "300px" }}
          >
            <div
              className="contact__form"
              style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <h3 style={{ color: "#0b3d0b", marginBottom: "25px" }}>
                Contact Us.
              </h3>
              <ContactForm />
              <p className="ajax-response" style={{ marginTop: "15px" }}></p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .social-icon:hover {
          transform: scale(1.15);
          filter: brightness(1.1);
        }
      `}</style>
    </section>
  );
};

export default ContactArea;
