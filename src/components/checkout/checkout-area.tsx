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
  const [paymentMethod, setPaymentMethod] = useState<string>("");

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

  // ✅ Auto update delivery fee based on city
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

      // ✅ Dynamic delivery charge for payload
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
        setToastMessage("Redirecting to SSL Commerz...");
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

      // ✅ Generate PDF Invoice
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
        <div className="text-center pt-30">
          {params?.get("isSuccess") ? (
            <h3 style={{ background: "#7fea7f", padding: "105px 20px" }}>
              {params?.get("isSuccess")}
            </h3>
          ) : (
            <h3>Your cart is empty</h3>
          )}
          <Link href="/shop" className="os-btn os-btn-2 mt-30">
            Return to shop
          </Link>
        </div>
      ) : (
        <section className="checkout-area pb-70 pt-70">
          <div className="container">
            <form>
              <div className="row">
                {/* Billing Details */}
                <div className="col-lg-6">
                  <div className="checkbox-form">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="checkout-form-list">
                          <label>
                            Name <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            value={name}
                            placeholder="Your Name"
                            onChange={(e) => setName(e.target.value)}
                          />
                          <ErrorMsg msg={errors.name?.message!} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="checkout-form-list">
                          <label>Email Address</label>
                          <input
                            type="email"
                            value={email}
                            placeholder="Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <ErrorMsg msg={errors.email?.message!} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="checkout-form-list">
                          <label>
                            Phone Number <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            value={phone}
                            placeholder="Your Phone Number"
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          <ErrorMsg msg={errors.phone?.message!} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="checkout-form-list">
                          <label>
                            District <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            value={city}
                            placeholder="Your District"
                            onChange={(e) => setCity(e.target.value)}
                          />
                          <ErrorMsg msg={errors.country?.message!} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="checkout-form-list">
                          <label>
                            Location <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            value={postalCode}
                            placeholder="Your Location"
                            onChange={(e) => setPostalCode(e.target.value)}
                          />
                          <ErrorMsg msg={errors.postalCode?.message!} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="checkout-form-list">
                          <label>
                            Address <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            value={address}
                            placeholder="Area, Road No, House No, Flat No"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          <ErrorMsg msg={errors.address?.message!} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Your Order */}
                <div className="col-lg-6">
                  <div className="your-order mb-30">
                    <h3>
                      Your Order{" "}
                      <span className="text-[gray]" style={{ fontSize: "16px" }}>
                        Invoice No#{invoiceNo?.slice(7)}
                      </span>
                    </h3>

                    <CheckoutOrders
                      cart_products={cart_products}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                      deliveryFee={deliveryFee}
                    />

                    {(toastMessage || params.get("isSuccess")) && (
                      <div
                        className="w-[100%] h-[20px] text-center py-2 text-black"
                        style={{ background: "#7fea7f" }}
                      >
                        {toastMessage !== ""
                          ? toastMessage
                          : params.get("isSuccess") === "true"
                          ? "Please wait..."
                          : params.get("isSuccess")}
                      </div>
                    )}

                    <div className="order-button-payment mt-20" style={{ textAlign: "center" }}>
                      <button
                        type="button"
                        className="place-order-btn"
                        onClick={() => placeOrder()}
                        disabled={loading || isOrderPlaced}
                      >
                        {loading
                          ? "Order Processing..."
                          : isOrderPlaced
                          ? "Order Placed"
                          : "Order Now"}
                      </button>
                    </div>

                    {isOrderPlaced && (
                      <div className="mt-4">
                        <button
                          type="button"
                          className="place-order-btn"
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
                              deliveryChargeInside:
                                city?.toLowerCase() === "dhaka" ? deliveryFee : null,
                              deliveryChargeOutside:
                                city?.toLowerCase() !== "dhaka" ? deliveryFee : null,
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
    </>
  );
};

export default CheckoutArea;
