"use client";

import { postDataWithToken } from "@/api/api";
import { IProduct } from "@/types/product-d-t";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useEffect, useState } from "react";

type IProps = {
  product: IProduct;
};

const ProductDetailsBottom = ({ product }: any) => {
  const cookies = useCookies();
  const [toastMessage, setToastMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [star, setStar] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [reviewObj, setReviewObj] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<"des" | "review">("des");

  const postReview = async () => {
    setLoading(true);

    if (cookies?.get("token") && cookies?.get("userinfo")) {
      if (star < 1) {
        setToastMessage("Please give a rating first.");
        setLoading(false);
        return;
      }
      try {
        const reviewsRes = await postDataWithToken("/reviews", {
          productId: product?.id,
          userId: JSON.parse(cookies?.get("userinfo") as any)?.id,
          rating: star,
          comment: comment,
        });

        if (!reviewsRes?.success) {
          setToastMessage(reviewsRes?.message as string);
          setLoading(false);
          return;
        }

        setToastMessage(reviewsRes?.message as string);
        setStar(0);
        setComment("");
        setReviewObj([...reviewObj, reviewsRes?.data]);
      } catch (error) {
        console.log(error as string);
        setToastMessage(error as string);
      } finally {
        setLoading(false);
      }
    } else {
      setToastMessage(`Please login first to give a review`);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(product?.review);
  }, []);

  const neoCardStyle = {
    padding: "24px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #e6ffe3ff 0%, #f8f8f8ff 50%, #ffffffff 100%)",
    boxShadow: "8px 8px 20px #d9d9d9, -8px -8px 20px #ffffff",
    transition: "all 0.3s ease-in-out",
    marginBottom: "24px",
  };

  const headingStyle = {
    fontSize: "22px",
    fontWeight: 700,
    marginBottom: "16px",
    color: "#010701ff",
  };

  // Light purple gradient buttons with black text
  const buttonStyle = {
    padding: "10px 28px",
    borderRadius: "12px",
    fontWeight: 600,
    fontSize: "16px",
    cursor: "pointer",
    color: "#000",
    margin: "0 8px",
    background: "linear-gradient(145deg, #90eb98ff, #9fee9fff)",
    boxShadow: "5px 5px 15px #d9d9d9, -5px -5px 15px #ffffff",
    transition: "all 0.3s ease",
    border: "none",
  };

  const buttonActiveStyle = {
    ...buttonStyle,
    boxShadow: "inset 5px 5px 15px #d9d9d9, inset -5px -5px 15px #ffffff",
  };

  const postButtonStyle = {
    background: "linear-gradient(145deg, #b9ffc8ff, #c4dbc2ff)",
    border: "none",
    color: "#000",
    padding: "10px 24px",
    borderRadius: "12px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "4px 4px 12px #d9d9d9, -4px -4px 12px #ffffff",
  };

  return (
    <div className="shop__bottom" style={{ padding: "40px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          {/* Tabs */}
          <div>
            <button
              style={activeTab === "des" ? buttonActiveStyle : buttonStyle}
              onClick={() => setActiveTab("des")}
            >
              Description
            </button>
            <button
              style={activeTab === "review" ? buttonActiveStyle : buttonStyle}
              onClick={() => setActiveTab("review")}
            >
              Reviews ({product?.review?.length + reviewObj?.length})
            </button>
          </div>
        </div>

        {/* Description Tab */}
        {activeTab === "des" && (
          <div style={neoCardStyle}>
            <h3 style={headingStyle}>Description</h3>
            <p style={{ color: "#333", fontSize: "16px", lineHeight: "1.6" }}>
              {product?.longDescription}
            </p>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "review" && (
          <>
            {/* Reviews List */}
            <div>
              {[...(product?.review || []), ...reviewObj].map((review: any, index: number) => {
                const userInfo = review?.user || JSON.parse(cookies?.get("userinfo") || "{}");
                return (
                  <div key={index} style={neoCardStyle}>
                    <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
                      <Image
                        src={userInfo?.image || "https://cdn-icons-png.flaticon.com/512/9368/9368192.png"}
                        alt="review-img"
                        width={78}
                        height={79}
                        style={{ borderRadius: "50%" }}
                      />
                      <div>
                        <h5 style={{ margin: 0 }}>{userInfo?.name}</h5>
                        <span style={{ fontSize: "12px", color: "#777" }}>
                          - {review.createdAt?.substr(0, 10)}
                        </span>
                        <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
                          {[0, 1, 2, 3, 4].map((i) => (
                            <i
                              key={i}
                              className={i < review.rating ? "fas fa-star" : "fal fa-star"}
                              style={{ color: i < review.rating ? "orange" : "#ccc" }}
                            ></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                );
              })}
            </div>

            {/* Post Review */}
            <div style={neoCardStyle}>
              <h3 style={headingStyle}>Your Review</h3>
              <div style={{ marginBottom: "16px" }}>
                <span style={{ fontWeight: 500, marginRight: "8px" }}>Your Rating :</span>
                {[1, 2, 3, 4, 5].map((i) => (
                  <i
                    key={i}
                    className={i <= star ? "fa fa-star cursor-pointer" : "fal fa-star cursor-pointer"}
                    style={{ color: i <= star ? "orange" : "#ccc", fontSize: "18px", marginRight: "4px" }}
                    onClick={() => setStar(i)}
                  ></i>
                ))}
              </div>
              <textarea
                cols={30}
                rows={6}
                placeholder="Comments"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                  padding: "12px",
                  width: "100%",
                  marginBottom: "12px",
                }}
              ></textarea>
              {toastMessage && (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "8px",
                    marginBottom: "12px",
                    background: "#7fea7f",
                    borderRadius: "8px",
                    color: "#000",
                  }}
                >
                  {toastMessage}
                </div>
              )}
              <button type="button" onClick={postReview} disabled={loading} style={postButtonStyle}>
                {loading ? "Posting..." : "Post review"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsBottom;
