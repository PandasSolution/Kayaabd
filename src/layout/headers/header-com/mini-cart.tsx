"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { remove_product } from "@/redux/features/cart";
import useCartInfo from "@/hooks/use-cart-info";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import Link from "next/link";

type MiniCartProps = {
  showCart: boolean;
  setShowCart: (state: boolean) => void;
  setLoading: (state: boolean) => void;
};

const MiniCart = ({ showCart, setShowCart, setLoading }: MiniCartProps) => {
  const cookies = useCookies();
  const cartItems = useAppSelector((state) => state.cart.cart_products);
  const dispatch = useAppDispatch();
  const { total } = useCartInfo();

  const handleClick = () => {
    setLoading(true);
  };

  return (
    <>
      {/* Overlay */}
      {showCart && (
        <div
          onClick={() => setShowCart(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            zIndex: 1500,
          }}
        />
      )}

      {/* MiniCart Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "320px",
          maxWidth: "100%",
          height: "100vh",
          maxHeight: "80vh",
           background: "linear-gradient(135deg, #ffffffff 0%, #ecececff 50%, #f7f7f7ff 100%)",
           color:"black",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.2)",
          zIndex: 2000,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          transform: showCart ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
          borderRadius: "12px 0 0 12px",
        }}
      >
        <h3 style={{ marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>
          Your Cart
        </h3>

        {cartItems.length === 0 ? (
          <h5 style={{ textAlign: "center", marginTop: "50px", color: "#777" }}>
            Your cart is empty
          </h5>
        ) : (
          <>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                flex: 1,
                overflowY: "auto",
              }}
            >
              {cartItems.map((item: any, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <Link href={`/product-details/${item.slug}`} onClick={handleClick}>
                    <Image
                      src={item.image ?? "/noimage.png"}
                      alt={item.name}
                      width={70}
                      height={70}
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                        background: "#f6f6f6",
                      }}
                    />
                  </Link>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Link
                      href={`/product-details/${item.slug}`}
                      onClick={handleClick}
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#333",
                        textDecoration: "none",
                        marginBottom: "5px",
                      }}
                    >
                      {item.name} ({item.variant})
                    </Link>
                    <div style={{ fontSize: "13px", color: "#555", display: "flex", gap: "6px" }}>
                      <span>{item.orderQuantity} ×</span>
                      <span>{item.discountedRetailPrice} TK</span>
                    </div>
                  </div>

                  <button
                    onClick={() => dispatch(remove_product(item))}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#b91c1c",
                      fontSize: "16px",
                    }}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>

            <div
              style={{
                borderTop: "1px solid #eee",
                paddingTop: "15px",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 600,
                  fontSize: "15px",
                  marginBottom: "15px",
                }}
              >
                <span>Subtotal:</span>
                <span>{total} TK</span>
              </div>
              <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                <Link
                  href="/cart"
                  onClick={handleClick}
                  style={{
                    textAlign: "center",
                    padding: "10px 0",
                    borderRadius: "8px",
                    background: "#032211ff",
                    color: "#fff",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={handleClick}
                  style={{
                    textAlign: "center",
                    padding: "10px 0",
                    borderRadius: "8px",
                    background: "#91ecadff",
                    color: "#000000ff",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MiniCart;
