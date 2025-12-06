"use client";
import { postData } from "@/api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ErrorMsg from "../common/error-msg";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const schema = yup.object().shape({
  name: yup.string().required().label("Name"),
  email: yup.string().required().email().label("Email"),
  subject: yup.string().required().min(5).label("Subject"),
  message: yup.string().required().label("Message"),
});

const ContactForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const resp = await postData(`/contacts`, data);

      if (!resp?.success) {
        setToastMessage(resp?.message);
        return;
      }

      setToastMessage(resp?.message);
      reset();
    } catch (error) {
      console.log(error as string);
      setToastMessage(error as string);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setToastMessage("");
      }, 4000);
    }
  });

  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      className="contact-card"
    >
      <form onSubmit={onSubmit} id="contact-form">
        <div className="row" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div className="col-xl-6 col-lg-6" style={{ flex: "1", minWidth: "200px" }}>
            <div className="contact__input">
              <label>
                Name <span className="required">*</span>
              </label>
              <input
                id="name"
                {...register("name")}
                placeholder="Your Name"
                type="text"
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  transition: "all 0.3s ease",
                }}
              />
              <ErrorMsg msg={errors.name?.message!} />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6" style={{ flex: "1", minWidth: "200px" }}>
            <div className="contact__input">
              <label>
                Email <span className="required">*</span>
              </label>
              <input
                id="email"
                {...register("email")}
                type="email"
                placeholder="Your Email"
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  transition: "all 0.3s ease",
                }}
              />
              <ErrorMsg msg={errors.email?.message!} />
            </div>
          </div>
        </div>

        <div className="row" style={{ marginTop: "15px" }}>
          <div className="col-xl-12">
            <div className="contact__input">
              <label>
                Subject <span className="required">*</span>
              </label>
              <input
                id="subject"
                {...register("subject")}
                type="text"
                placeholder="Subject"
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  transition: "all 0.3s ease",
                }}
              />
              <ErrorMsg msg={errors.subject?.message!} />
            </div>
          </div>
        </div>

        <div className="row" style={{ marginTop: "15px" }}>
          <div className="col-xl-12">
            <div className="contact__input">
              <label>
                Message <span className="required">*</span>
              </label>
              <textarea
                {...register("message")}
                cols={30}
                rows={6}
                placeholder="Write your message..."
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  transition: "all 0.3s ease",
                }}
              ></textarea>
              <ErrorMsg msg={errors.message?.message!} />
            </div>
          </div>
        </div>

        {toastMessage && (
          <div
            style={{
              width: "100%",
              padding: "10px",
              margin: "15px 0",
              textAlign: "center",
              color: "#fff",
              borderRadius: "8px",
              background: "#1abc9c",
              fontWeight: 500,
            }}
          >
            {toastMessage}
          </div>
        )}

        <div className="row" style={{ marginTop: "5px" }}>
          <div className="col-xl-12">
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background: "#0b3d0b",
                color: "#fff",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
              }}
              disabled={loading}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </form>

      <style jsx>{`
        .contact-card:hover {
          transform: translateY(-5px) rotateX(1deg);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        input:focus,
        textarea:focus {
          border-color: #0b3d0b;
          outline: none;
          box-shadow: 0 0 8px rgba(11, 61, 11, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
