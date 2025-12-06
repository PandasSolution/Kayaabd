"use client";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppChat = () => {
  const phoneNumber = "01748399860"; // Bangladesh number
  const predefinedMsg = encodeURIComponent(
    "Hello! I want to inquire about your products."
  );

  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${predefinedMsg}`,
      "_blank"
    );
  };

  return (
    <div style={styles.container} onClick={handleClick}>
      <FaWhatsapp size={28} style={{ color: "#fff" }} />
    </div>
  );
};

export default WhatsAppChat;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    bottom: "90px", // upore niye asha
    right: "25px",
    width: "60px",
    height: "60px",
    background: "#25D366",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
    zIndex: 9999,
    transition: "all 0.3s ease, transform 0.3s ease",
  },
};

// optional: hover effect with React inline style
// You can add this in CSS or using a styled component for smoother hover
