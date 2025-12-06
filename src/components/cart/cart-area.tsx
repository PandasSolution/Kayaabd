"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchData } from "@/api/api";
import useCartInfo from "@/hooks/use-cart-info";
import {
  add_cart_product,
  clearCart,
  getCartProducts,
  quantityDecrement,
  remove_product,
} from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const CartArea = () => {
  const { cart_products } = useAppSelector((state) => state.cart);
  const { total } = useCartInfo();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      dispatch(getCartProducts());
    }
  }, [dispatch]);

  const [coupon, setCoupon] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [couponData, setCouponData] = useState<any>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("coupon") as any) ?? null
      : null
  );
  const [allCoupons, setAllCoupons] = useState<any[]>([]);

  const fetchCoupons = async () => {
    try {
      const response = await fetchData({
        url: `/customer/coupons`,
        cache: `no-store`,
      });
      if (response?.success) {
        setAllCoupons(response.data);
      } else {
        setAllCoupons([]);
      }
    } catch (error) {
      console.log(error);
      setAllCoupons([]);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const applyCoupon = async () => {
    if (!coupon) {
      setToastMessage("Please enter a coupon code");
      return;
    }
    setLoading(true);
    try {
      const response = await fetchData({
        url: `/customer/coupons/${coupon}`,
        cache: "no-store",
      });
      if (response?.success) {
        setCouponData(response.data);
        localStorage.setItem("coupon", JSON.stringify(response.data));
        setToastMessage(response.message);
      } else {
        setCouponData({});
        setToastMessage(response.message);
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Failed to apply coupon");
    } finally {
      setLoading(false);
      setCoupon("");
    }
  };

  const gradientBackground =
    "linear-gradient(135deg, #f6fafaff 100%, #f4f5f4ff 5%, #ffffffff 120%)";

  return (
    <section
      style={{
        padding: "50px 20px",
        backgroundColor: "#f9fafb",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {cart_products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <h3
              style={{
                fontSize: "26px",
                fontWeight: "700",
                marginBottom: "20px",
                color: "#4b5563",
              }}
            >
              Your cart is empty
            </h3>
            <Link
              href="/shop"
              style={{
                display: "inline-block",
                padding: "14px 30px",
                backgroundColor: "#6ed880ff",
                color: "#fff",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Return to Shop
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {cart_products.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: gradientBackground,
                    padding: "20px",
                    borderRadius: "16px",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e: any) => (e.currentTarget.style.transform = "scale(1.02)")}
                  onMouseLeave={(e: any) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <Link href={`/product-details/${item.slug}`}>
                      <Image
                        src={item.image ?? "/noimage.png"}
                        alt={item.name}
                        width={100}
                        height={100}
                        style={{
                          objectFit: "contain",
                          borderRadius: "12px",
                          backgroundColor: "#f6f6f6",
                        }}
                      />
                    </Link>
                    <div>
                      <Link
                        href={`/product-details/${item.slug}`}
                        style={{
                          fontWeight: "700",
                          fontSize: "17px",
                          color: "#1f2937",
                          textDecoration: "none",
                        }}
                      >
                        {item.name} ({item.variant})
                      </Link>
                      <p style={{ fontSize: "16px", color: "#111827", margin: "5px 0" }}>
                        Unit Price: {item.discountedRetailPrice} TK
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <button
                          onClick={() => dispatch(quantityDecrement(item))}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "8px",
                            border: "1px solid #d1d5db",
                            background: "#f3f4f6",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: "600", minWidth: "20px", textAlign: "center" }}>
                          {item.orderQuantity}
                        </span>
                        <button
                          onClick={() => dispatch(add_cart_product(item))}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "8px",
                            border: "1px solid #d1d5db",
                            background: "#f3f4f6",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <button
                      onClick={() => dispatch(remove_product(item))}
                      style={{
                        fontSize: "22px",
                        color: "#ef4444",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      &times;
                    </button>
                    <p
                      style={{
                        fontWeight: "700",
                        marginTop: "10px",
                        color: "#111827",
                        fontSize: "18px",
                      }}
                    >
                      {item.orderQuantity * item.discountedRetailPrice} TK
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Cards */}
            {allCoupons.length > 0 && (
              <div style={{ marginTop: "50px" }}>
                <h3 style={{ fontWeight: "700", marginBottom: "20px", fontSize: "20px", color: "#1f2937" }}>
                  Available Coupons
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                  {allCoupons.map((coup: any) => (
                    <div
                      key={coup.id}
                      style={{
                        background: gradientBackground,
                        padding: "20px",
                        borderRadius: "16px",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                        minWidth: "180px",
                        cursor: "pointer",
                        transition: "transform 0.2s",
                      }}
                      onClick={() => setCoupon(coup.code)}
                      onMouseEnter={(e: any) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e: any) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#133106ff" }}>
                        {coup.code}
                      </h4>
                      <p style={{ margin: "5px 0 0 0", fontSize: "16px", color: "#0f0f0fff" , fontWeight: "500" }}>
                        {coup.discountAmount} TK off{" "}
                        {coup.orderPriceLimit > 0 ? `on ${coup.orderPriceLimit} TK or more` : "any order"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Coupon Apply & Clear Cart */}
            <div style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", gap: "15px" }}>
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #d1d5db",
                  background: gradientBackground,
                  minWidth: "200px",
                  flex: 1,
                  fontWeight: "500",
                  color: "#1f2937",
                }}
              />
              <button
                onClick={applyCoupon}
                disabled={loading}
                style={{
                  padding: "12px 25px",
                  backgroundColor: "#031305ff",
                  color: "#fff",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                {loading ? "Applying..." : "Apply Coupon"}
              </button>
              <button
                onClick={() => {
                  dispatch(clearCart());
                  localStorage.removeItem("coupon");
                }}
                style={{
                  padding: "12px 25px",
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Clear Cart
              </button>
            </div>
            {toastMessage && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "10px 15px",
                  backgroundColor: "#d1fae5",
                  color: "#065f46",
                  borderRadius: "8px",
                  maxWidth: "fit-content",
                  fontWeight: "500",
                }}
              >
                {toastMessage}
              </div>
            )}

            {/* Cart Totals */}
            <div
              style={{
                marginTop: "50px",
                background: gradientBackground,
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                maxWidth: "400px",
                marginLeft: "auto",
              }}
            >
              <h3 style={{ fontWeight: "700", marginBottom: "20px", fontSize: "20px", color: "#1f2937" }}>
                Cart Totals
              </h3>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span>Subtotal</span>
                <span>{total} TK</span>
              </div>
              {couponData && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span>Coupon Discount</span>
                  <span>
                    {couponData?.orderPriceLimit
                      ? couponData?.orderPriceLimit <= total
                        ? couponData?.discountAmount ?? 0
                        : 0
                      : couponData?.discountAmount ?? 0}{" "}
                    TK
                  </span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "700",
                  fontSize: "18px",
                  marginTop: "10px",
                }}
              >
                <span>Grand Total</span>
                <span>
                  {total -
                    (couponData?.orderPriceLimit
                      ? couponData?.orderPriceLimit <= total
                        ? couponData?.discountAmount ?? 0
                        : 0
                      : couponData?.discountAmount ?? 0)}{" "}
                  TK
                </span>
              </div>
              <Link
                href="/checkout"
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "25px",
                  padding: "14px 0",
                  backgroundColor: "#18331eff",
                  color: "#fff",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CartArea;
