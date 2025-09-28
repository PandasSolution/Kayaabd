"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { add_cart_product, decrement, increment } from "@/redux/features/cart";
import { handleOpenModal } from "@/redux/features/utility";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

type IProps = {
  product: any;
  style_2?: boolean;
  bottomShow?: boolean;
  isModal?: boolean;
};

const ProductDetailsUpper = ({
  product,
  style_2,
  bottomShow = true,
  isModal = true,
}: IProps) => {
  const [variant, setVariant] = useState<any>("");
  const [price, setPrice] = useState<number | null>(null);
  const [retailPrice, setRetailPrice] = useState<number | null>(null);
  const [costPrice, setCostPrice] = useState<number | null>(null);
  const [discountPrice, setDiscountPrice] = useState<number | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number | null>(null);
  const [productAttributeId, setProductAttributeId] = useState<string>("");
  const [stock, setStock] = useState<number>(
    product?.productAttributes[0]?.stockAmount ?? 0
  );
  const [toastMessage, setToastMessage] = useState<string>("");
  const { orderQuantity } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [activeImg, setActiveImg] = useState(
    product?.images[0]?.image ?? "/noimage.png"
  );

  const handleImageActive = (img: string) => {
    setActiveImg(img);
  };

  const handleAddToCart = () => {
    if (!variant) {
      setToastMessage("Please select a variant");
      return;
    }
    dispatch(
      add_cart_product({
        name: product?.name,
        image: product?.images[0]?.image,
        id: product?.id + variant,
        variant,
        orderQuantity,
        discountedRetailPrice: price ?? 0,
        costPrice: costPrice ?? 0,
        retailPrice: retailPrice ?? 0,
        discountPrice: discountPrice ?? 0,
        discountPercent: discountPercent ?? 0,
        totalCostPrice: (costPrice ?? 0) * orderQuantity,
        totalPrice: (price ?? 0) * orderQuantity,
        productId: product?.id,
        productAttributeId,
      })
    );
    dispatch(handleOpenModal());
    setToastMessage("Add to Cart");
  };

  const handleOrderWhatsApp = () => {
    if (!variant) {
      setToastMessage("Please select a variant");
      return;
    }
    const whatsappNumber = "+8801748399860"; // Replace with your number
    const message = `Hello! I want to order:
- Product: ${product.name}
- Variant/Size: ${variant}
- Quantity: ${orderQuantity}
- Price per unit: ${price ?? 0} TK
- Total Price: ${(price ?? 0) * orderQuantity} TK
- Delivery Charge: Dhaka 80 TK, Outside Dhaka 120 TK

Product Image: ${product?.images[0]?.image ?? ""}
Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="row">
      {/* Product Images */}
      {product && (
        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
          <div className="product__modal-box">
            <div className="tab-content mb-20">
              <div className="product__modal-img w-img">
                <InnerImageZoom
                  src={activeImg}
                  width={327}
                  height={360}
                  className="image_big_modal"
                  hasSpacer={true}
                />
              </div>
            </div>
            <nav>
              <div className="nav nav-tabs justify-content-start">
                {product?.images?.map((img: any, i: any) => (
                  <a
                    key={i + new Date()}
                    className={`nav-item nav-link cursor-pointer images_small_modal ${
                      img?.image === activeImg ? "active" : ""
                    }`}
                  >
                    <div
                      className="product__nav-img w-img"
                      onClick={() => handleImageActive(img?.image)}
                    >
                      <Image
                        src={img?.image}
                        alt="product-img"
                        width={92}
                        height={117}
                        className="images_for_modal"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Product Details */}
      <div
        className={
          product
            ? "col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12"
            : "col-xl-6 col-lg-6"
        }
      >
        <div className="product__modal-content product__modal-content-2">
          <h4>
            <Link href={`/product-details/${product?.slug}`}>
              {product.name}
            </Link>
          </h4>

          {/* Rating */}
          <div className="rating rating-shop mb-15">
            <ul>
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i}>
                  <span>
                    <i
                      className={
                        (product?.review?.reduce(
                          (acc: number, r: { rating: number }) => acc + r.rating,
                          0
                        ) /
                          (product?.review?.length || 1)) >
                        i
                          ? "fas fa-star"
                          : "fal fa-star"
                      }
                    ></i>
                  </span>
                </li>
              ))}
            </ul>
            <span className="rating-no ml-10 rating-left">
              {product?.review?.length} Rating
            </span>
            <span className="review rating-left">
              <a href="#">👁️ {product?.viewCount}</a>
            </span>
          </div>

          {/* Price */}
          <div className="product__price-2 mb-25">
            <span>{price ?? product.productAttributes[0]?.discountedRetailPrice} TK</span>
            {retailPrice && discountPrice && discountPrice > 0 && (
              <span className="old-price ml-2">{retailPrice} TK</span>
            )}
            <p className="mt-2 text-sm text-gray-800">
              Delivery Charge: Dhaka 80 TK, Outside Dhaka 120 TK
            </p>
          </div>

          {/* Description */}
          <div className="product__modal-des mb-30">
            <p>{product.shortDescription}</p>
          </div>

          {/* Variant Selection */}
          <div className="product__modal-form mb-30">
            <form action="#">
              <div className="product__modal-input size mb-20">
                <label>
                  Variant <i className="fas fa-star-of-life"></i>
                </label>
                <select
                  onChange={(e) => {
                    const v = e.target.value.split(" | ");
                    setVariant(v[0]);
                    setPrice(Number(v[1]));
                    setRetailPrice(Number(v[2]));
                    setCostPrice(Number(v[3]));
                    setDiscountPrice(Number(v[4]));
                    setDiscountPercent(Number(v[5]));
                    setProductAttributeId(v[6]);
                    setStock(Number(v[7]));
                  }}
                >
                  <option value={""}>- Please select a variant -</option>
                  {product?.productAttributes?.map((size: any, i: number) => (
                    <option
                      key={i}
                      value={`${size?.size} | ${
                        size?.discountedRetailPrice ?? 0
                      } | ${size?.retailPrice ?? 0} | ${
                        size?.costPrice ?? 0
                      } | ${size?.discountPrice ?? 0} | ${
                        discountPercent ?? 0
                      } | ${size?.id} | ${size?.stockAmount}`}
                    >
                      {size?.size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="product__modal-required mb-5">
                <span>Required *</span>
              </div>

              {/* Quantity + Buttons */}
              <div className="pro-quan-area d-flex align-items-center gap-3 mb-20 flex-wrap">
                <div className="product-quantity-title">
                  <label>Qty</label>
                </div>
                <div className="product-quantity mr-20 mb-20">
                  <div className="cart-plus-minus d-flex">
                    <input type="text" value={orderQuantity} disabled readOnly />
                    <div onClick={() => dispatch(decrement())} className="dec qtybutton">-</div>
                    <div onClick={() => dispatch(increment())} className="inc qtybutton">+</div>
                  </div>
                </div>

                {/* Buttons in single row */}
                <div className="flex flex-wrap gap-3 mt-4 justify-center">
                  {stock > 0 ? (
                    <>
                      <button type="button" onClick={handleAddToCart} className="custom-btn-white">
                        + Add to Cart
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (!variant) {
                            setToastMessage("Please select a variant");
                            return;
                          }
                          dispatch(
                            add_cart_product({
                              name: product?.name,
                              image: product?.images[0]?.image,
                              id: product?.id + variant,
                              variant,
                              orderQuantity,
                              discountedRetailPrice: price ?? 0,
                              costPrice: costPrice ?? 0,
                              retailPrice: retailPrice ?? 0,
                              discountPrice: discountPrice ?? 0,
                              discountPercent: discountPercent ?? 0,
                              totalCostPrice: (costPrice ?? 0) * orderQuantity,
                              totalPrice: (price ?? 0) * orderQuantity,
                              productId: product?.id,
                              productAttributeId,
                            })
                          );
                          dispatch(handleOpenModal());
                          router.push("/checkout");
                        }}
                        className="custom-btn-white pulse-btn"
                      >
                        Order Now
                      </button>

                      <button type="button" onClick={handleOrderWhatsApp} className="custom-btn-whatsapp">
                        WhatsApp Order
                      </button>
                    </>
                  ) : (
                    <span className="text-red-600">Stock Out</span>
                  )}
                </div>
              </div>
            </form>

            {toastMessage && (
              <div className="w-[100%] h-[20px] text-center py-2 my-3 text-black bg-green-200">
                {toastMessage}
              </div>
            )}
          </div>

          {/* Bottom info */}
          {bottomShow && (
            <div>
              <div className="product__tag mb-25">
                <span>Category:</span>
                <span>
                  <a className="cursor-pointer">{product?.category?.name}</a>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsUpper;
