"use client";

import useCartInfo from "@/hooks/use-cart-info";
import { IProduct } from "@/types/product-d-t";
import { useAppDispatch } from "@/redux/hook";
import { remove_product } from "@/redux/features/cart";
import { useEffect } from "react";

type IProps = {
  cart_products: IProduct[];
  paymentMethod?: string;
  setPaymentMethod?: (val: string) => void;
  deliveryFee?: number;
};

const CheckoutOrders = ({
  cart_products,
  paymentMethod,
  setPaymentMethod,
  deliveryFee = 100,
}: IProps) => {
  const { total } = useCartInfo();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setPaymentMethod?.("Cash on Delivery"); // default selected
  }, []);

  const coupon = JSON.parse(localStorage.getItem("coupon") as any);
  const couponDiscount = coupon
    ? coupon.orderPriceLimit
      ? coupon.orderPriceLimit <= total
        ? coupon.discountAmount ?? 0
        : 0
      : coupon.discountAmount ?? 0
    : 0;

  const handleRemoveProduct = (productId: number, title: string) => {
    dispatch(remove_product({ id: productId, title }));
  };

  return (
    <div className="checkout-wrapper">
      <h3 className="checkout-title">Your Order</h3>

      {cart_products.map((item: any, i) => (
        <div key={i} className="product-row">
          <div className="product-left">
            <img
              src={item?.image || "/noimage.png"}
              alt={item?.name}
              className="thumb"
            />

            <div className="info">
              <p className="title">
                {item?.name} ({item?.variant})
              </p>
              <span className="qty">Qty: {item.orderQuantity}</span>
            </div>
          </div>

          <div className="product-right">
            <span className="price">
              {(item.discountedRetailPrice * item.orderQuantity).toFixed(2)} TK
            </span>

            <button
              className="remove-btn"
              onClick={() => handleRemoveProduct(item.id, item.name)}
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      <div className="summary-box">
        <div className="row">
          <span>Delivery</span>
          <span>{deliveryFee.toFixed(2)} TK</span>
        </div>

        {couponDiscount > 0 && (
          <div className="row discount">
            <span>Coupon Discount</span>
            <span>- {couponDiscount.toFixed(2)} TK</span>
          </div>
        )}

        <div className="row total">
          <span>Total</span>
          <span>
            {(total + deliveryFee - couponDiscount).toFixed(2)} TK
          </span>
        </div>
      </div>

      {/* PAYMENT METHOD */}
      <div className="payment-box">
        <p className="payment-title">Payment Method</p>

        <label className="radio-item">
          <input
            type="radio"
            value="Cash on Delivery"
            name="payment"
            checked={paymentMethod === "Cash on Delivery"}
            onChange={(e) => setPaymentMethod?.(e.target.value)}
          />
          Cash on Delivery (Default)
        </label>

        <label className="radio-item">
          <input
            type="radio"
            value="Online Payment"
            name="payment"
            checked={paymentMethod === "Online Payment"}
            onChange={(e) => setPaymentMethod?.(e.target.value)}
          />
          Online Payment
        </label>
      </div>

      {/* PAY BUTTON
      <button className="confirm-btn">
        {paymentMethod === "Online Payment"
          ? "Pay Now"
          : "Place Order (COD)"}
      </button> */}

      {/* INLINE CSS */}
      <style jsx>{`
        .checkout-wrapper {
          background: #fff;
          border-radius: 10px;
          padding: 16px;
          max-width: 600px;
          margin: auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .checkout-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          border-bottom: 1px solid #eee;
          padding-bottom: 8px;
        }

        .product-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }

        .product-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .thumb {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .info {
          max-width: 200px;
        }

        .title {
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
          margin: 0;
          color:#black
        }

        .qty {
          font-size: 14px;
          color: #666;
        }

        .product-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .price {
          font-weight: 700;
          white-space: nowrap;
          
        }

        .remove-btn {
          background: #ff4d4f;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 2px 7px;
          cursor: pointer;
        }

        .remove-btn:hover {
          background: #d9363e;
        }

        /* SUMMARY */
        .summary-box {
          background: #f9fafb;
          margin-top: 12px;
          border-radius: 8px;
          padding: 12px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          padding: 4px 0;
        }

        .discount span:last-child {
          color: #16a34a;
          font-weight: 600;
        }

        .total {
          border-top: 1px dashed #ddd;
          margin-top: 6px;
          padding-top: 6px;
          font-size: 25px;
          font-weight: 700;
        }

        /* PAYMENT */
        .payment-box {
          margin-top: 14px;
        }

        .payment-title {
          font-weight: 600;
          margin-bottom: 6px;
        }

        .radio-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          margin-bottom: 4px;
          cursor: pointer;
        }

        .confirm-btn {
          width: 100%;
          margin-top: 15px;
          background: linear-gradient(135deg, #ff4d4f, #ff7a45);
          border: none;
          border-radius: 10px;
          padding: 12px;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .confirm-btn:hover {
          transform: scale(1.02);
        }

        /* MOBILE RESPONSIVE */
        @media (max-width: 480px) {
          .info {
            max-width: 145px;
          }

          .price {
            font-size: 13px;
          }

          .checkout-title {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default CheckoutOrders;
