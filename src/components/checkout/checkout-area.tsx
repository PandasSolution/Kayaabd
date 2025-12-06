"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// internal
import ErrorMsg from "../common/error-msg";
import { postData } from "@/api/api";
import useCartInfo from "@/hooks/use-cart-info";
import { clearCart, getCartProducts } from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import CheckoutOrders from "./checkout-orders";
import generateProfessionalInvoicePDF from "@/utils/generateProfessionalInvoicePDF";

type FormData = {
  name: string;
  country: string;
  address: string;
  billingAddress?: string;
  postalCode?: string;
  email?: string;
  phone: string;
};

const schema = yup.object().shape({
  name: yup.string().required().label("Full Name"),
  country: yup.string().required().label("Country"),
  address: yup.string().required().label("Address"),
  billingAddress: yup.string().label("Billing Address"),
  postalCode: yup.string().label("Zip Code"),
  email: yup.string().email().label("Email"),
  phone: yup.string().required().min(4).label("Phone"),
});

const CheckoutArea = () => {
  const cookies = useCookies();
  const { cart_products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { total } = useCartInfo();

  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [billingAddress, setBillingAddress] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash on Delivery");

  const [loading, setLoading] = useState<boolean>(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [invoiceNo, setInvoiceNo] = useState<any>(
    Date.now()?.toString() + Math.random()?.toFixed(0)?.toString()
  );

  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      dispatch(getCartProducts());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!city) {
      setDeliveryFee(0);
    } else if (city?.toLowerCase() === "dhaka") {
      setDeliveryFee(80);
    } else {
      setDeliveryFee(120);
    }
  }, [city]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const placeOrder = async () => {
    setLoading(true);
    try {
      if (!paymentMethod) {
        setToastMessage("Please select a payment method");
        return;
      }
      if (!name || !city || !address || !phone) {
        setToastMessage("Please fill up all the required fields.");
        return;
      }

      const payload = {
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        customerBillingAddress: billingAddress,
        customerEmail: email,
        customerCity: city,
        customerPostalCode: postalCode,
        invoiceNumber: invoiceNo?.slice(7),
        paymentMethod: paymentMethod,
        deliveryChargeInside: city?.toLowerCase() === "dhaka" ? deliveryFee : null,
        deliveryChargeOutside: city?.toLowerCase() !== "dhaka" ? deliveryFee : null,
        orderItems: cart_products?.map((prod: any) => ({
          productId: prod?.productId,
          productAttributeId: prod?.productAttributeId,
          name: prod?.name,
          size: prod?.variant,
          costPrice: prod?.costPrice,
          retailPrice: prod?.retailPrice,
          discountPercent: prod?.discountPercent,
          discountPrice: prod?.discountPrice,
          discountedRetailPrice: prod?.discountedRetailPrice,
          quantity: prod?.orderQuantity,
          totalCostPrice: prod?.totalCostPrice,
          totalPrice: prod?.totalPrice,
        })),
      };

      if (paymentMethod?.toLowerCase() === "digital payment") {
        const responses = await postData(`/orders-init`, payload);
        localStorage.setItem("payload", JSON.stringify(payload));
        setToastMessage("Redirecting to payment gateway...");
        window.location.href = responses?.data?.gateway;
        return;
      }

      const response = await postData(`/orders`, payload);

      if (!response?.success) {
        setToastMessage("Something went wrong! Try again.");
        console.log(response?.message as string);
        return;
      }

      setToastMessage(response?.message as string);
      setIsOrderPlaced(true);

      generateProfessionalInvoicePDF({
        invoiceNumber: invoiceNo?.slice(7),
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        customerAddress: address,
        customerCity: city,
        customerPostalCode: postalCode,
        paymentMethod: paymentMethod,
        deliveryChargeInside: city?.toLowerCase() === "dhaka" ? deliveryFee : null,
        deliveryChargeOutside: city?.toLowerCase() !== "dhaka" ? deliveryFee : null,
        orderItems: cart_products,
      });

      setTimeout(() => {
        dispatch(clearCart());
        localStorage.removeItem("coupon");
        window.location.href = "/";
      }, 4000);
    } catch (error) {
      console.log(error as string);
      setToastMessage(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {cart_products.length === 0 ? (
        <div className="empty-cart">
          {params?.get("isSuccess") ? (
            <h3 className="toast-success">{params?.get("isSuccess")}</h3>
          ) : (
            <h3>Your cart is empty</h3>
          )}
          <Link href="/shop" className="shop-btn">
            Return to shop
          </Link>
        </div>
      ) : (
        <section className="checkout-area">
          <div className="container">
            <form>
              <div className="row">
                {/* Billing Details */}
                <div className="col-lg-6">
                  <div className="checkout-card neo-card">
                    <h3>Billing Details</h3>
                    <div className="form-row">
                      {[
                        { label: "Name", value: name, setter: setName, required: true },
                        { label: "Email", value: email, setter: setEmail },
                        { label: "Phone", value: phone, setter: setPhone, required: true },
                        { label: "District", value: city, setter: setCity, required: true },
                        { label: "Location", value: postalCode, setter: setPostalCode },
                        { label: "Address", value: address, setter: setAddress, required: true },
                      ].map((field, idx) => (
                        <div className="form-group" key={idx}>
                          <label>
                            {field.label} {field.required && <span>*</span>}
                          </label>
                          <input
                            type={field.label === "Email" ? "email" : "text"}
                            value={field.value}
                            placeholder={`Your ${field.label}`}
                            onChange={(e) => field.setter(e.target.value)}
                          />
                          <ErrorMsg msg={errors[field.label.toLowerCase() as keyof FormData]?.message!} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Your Order */}
                <div className="col-lg-6">
                  <div className="checkout-card neo-card">
                    <h3>
                      Your Order <span className="invoice">Invoice No#{invoiceNo?.slice(7)}</span>
                    </h3>

                    <CheckoutOrders
                      cart_products={cart_products}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                      deliveryFee={deliveryFee}
                    />

                    {(toastMessage || params.get("isSuccess")) && (
                      <div className="toast-message">
                        {toastMessage !== ""
                          ? toastMessage
                          : params.get("isSuccess") === "true"
                          ? "Please wait..."
                          : params.get("isSuccess")}
                      </div>
                    )}

                    <div className="order-button">
                      <button
                        type="button"
                        className="place-order-btn neo-btn"
                        onClick={() => placeOrder()}
                        disabled={loading || isOrderPlaced}
                      >
                        {loading ? "Order Processing..." : isOrderPlaced ? "Order Placed" : "Order Now"}
                      </button>
                    </div>

                    {isOrderPlaced && (
                      <div className="mt-4">
                        <button
                          type="button"
                          className="place-order-btn neo-btn"
                          onClick={() =>
                            generateProfessionalInvoicePDF({
                              invoiceNumber: invoiceNo?.slice(7),
                              customerName: name,
                              customerPhone: phone,
                              customerEmail: email,
                              customerAddress: address,
                              customerCity: city,
                              customerPostalCode: postalCode,
                              paymentMethod: paymentMethod,
                              deliveryChargeInside: city?.toLowerCase() === "dhaka" ? deliveryFee : null,
                              deliveryChargeOutside: city?.toLowerCase() !== "dhaka" ? deliveryFee : null,
                              orderItems: cart_products,
                            })
                          }
                        >
                          Download Invoice PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      )}

      <style jsx>{`
        .checkout-area {
          padding: 50px 0;
          background: #ffffffff;
          min-height: 100vh;
        }

        .neo-card {
          background: #fafafaff;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff;
          margin-bottom: 30px;
        }

        h3 {
          font-size: 22px;
          font-weight: 700;
          color: #064e3b;
          margin-bottom: 20px;
        }

        .invoice {
          font-weight: 400;
          font-size: 14px;
          color: #555;
        }

        .form-row {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
        }

        .form-group {
          flex: 1 1 100%;
          display: flex;
          flex-direction: column;
        }

        label {
          font-weight: 600;
          margin-bottom: 5px;
          color: #064e3b;
        }

        label span {
          color: red;
        }

        input {
          padding: 12px 15px;
          border-radius: 15px;
          border: none;
          background: #f8f8f8ff;
          box-shadow: inset 5px 5px 10px #e4e4e4ff, inset -5px -5px 10px #ffffff;
          transition: all 0.3s;
        }

        input:focus {
          outline: none;
          box-shadow: inset 2px 2px 5px #ddddddff, inset -2px -2px 5px #ffffff;
        }

        .toast-message {
          width: 100%;
          text-align: center;
          padding: 10px 0;
          background: #c3f1b0;
          border-radius: 12px;
          color: #064e3b;
          margin-top: 15px;
          font-weight: 600;
        }

        .order-button {
          text-align: center;
          margin-top: 20px;
        }

        .neo-btn {
          background: #ffffffff;
          color: #064e3b;
          font-weight: 700;
          padding: 12px 30px;
          border-radius: 15px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          box-shadow: 5px 5px 10px #ffffffff, -5px -5px 10px #ffffff;
          transition: all 0.3s ease;
        }

        .neo-btn:hover {
          box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff;
        }

        .empty-cart {
          text-align: center;
          padding: 80px 20px;
        }

        .shop-btn {
          background: #e0e5ec;
          color: #064e3b;
          padding: 12px 30px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff;
          transition: all 0.3s;
        }

        .shop-btn:hover {
          box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff;
        }
      `}</style>
    </>
  );
};

export default CheckoutArea;
