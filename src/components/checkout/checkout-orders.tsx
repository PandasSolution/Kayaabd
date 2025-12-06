"use client";
import useCartInfo from "@/hooks/use-cart-info";
import { IProduct } from "@/types/product-d-t";
import { useAppDispatch } from "@/redux/hook";
import { remove_product } from "@/redux/features/cart"; // Update path as per your project

type IProps = {
  cart_products: IProduct[];
  paymentMethod?: any;
  setPaymentMethod?: any;
  deliveryFee?: number;
};

const CheckoutOrders = ({
  cart_products,
  paymentMethod,
  setPaymentMethod,
  deliveryFee,
}: IProps) => {
  const { total } = useCartInfo();
  const dispatch = useAppDispatch();

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
    <div className="your-order-table table-responsive">
      {cart_products.length > 0 && (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-2">Product</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart_products.map((item: any, i) => (
              <tr key={i} className="cart_item border-b border-gray-200">
                <td className="product-name flex items-center gap-3 py-2">
                  {/* Product image */}
                  <img
                    src={item?.image || "/noimage.png"}
                    alt={item?.name}
                    className="product-thumb"
                  />

                  {/* Name + variant + quantity */}
                  <div className="flex flex-col truncate ml-2">
                    <span className="font-medium text-sm truncate">
                      {item?.name} ({item?.variant})
                    </span>
                    <span className="text-sm font-bold text-gray-700">
                      × {item.orderQuantity}
                    </span>
                  </div>
                </td>

                {/* Price + Remove button */}
                <td className="product-total text-right py-2 flex items-center justify-end gap-3">
                  <span className="amount font-bold">
                    {(item.discountedRetailPrice * item.orderQuantity).toFixed(2)} TK
                  </span>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveProduct(item.id, item.name)}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="cart-subtotal">
              <th className="text-left py-2">Delivery Charge</th>
              <td className="text-right py-2">
                <span className="amount font-bold">{(deliveryFee ?? 100).toFixed(2)} TK</span>
              </td>
            </tr>

            {couponDiscount > 0 && (
              <tr className="cart-subtotal">
                <th className="text-left py-2">Coupon Discount</th>
                <td className="text-right py-2">
                  <span className="amount font-bold">{couponDiscount.toFixed(2)} TK</span>
                </td>
              </tr>
            )}

            <tr className="order-total font-bold">
              <th className="text-left py-2">Order Total</th>
              <td className="text-right py-2">
                <span className="amount font-bold">
                  {(total + (deliveryFee ?? 100) - couponDiscount).toFixed(2)} TK
                </span>
              </td>
            </tr>

            <tr className="shipping">
              <th className="text-left py-2">Payment Method</th>
              <td className="text-right py-2">
                <ul className="flex flex-col gap-2">
                  <li>
                    <input
                      type="radio"
                      id="cod"
                      name="shipping"
                      value={"Cash on Delivery"}
                      onChange={(e) => setPaymentMethod?.(e.target.value)}
                    />
                    <label htmlFor="cod" className="ml-2">
                      Cash on Delivery
                    </label>
                  </li>
                </ul>
              </td>
            </tr>
          </tfoot>
        </table>
      )}

      {/* Custom CSS */}
      <style jsx>{`
        .product-thumb {
          width: 130px !important;
          height: 130px !important;
          object-fit: cover;
          border-radius: 6px;
          flex-shrink: 0;
        }
        .remove-btn {
          background-color: #ff4d4f; /* Full red color */
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-left: 8px; /* Add extra space after TK */
        }
        .remove-btn:hover {
          background-color: #d9363e; /* Darker red on hover */
        }
      `}</style>
    </div>
  );
};

export default CheckoutOrders;
