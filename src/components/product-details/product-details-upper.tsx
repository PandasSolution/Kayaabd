"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { add_cart_product, decrement, increment } from "@/redux/features/cart";
import { handleOpenModal } from "@/redux/features/utility";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

type IProps = {
  product: any;
  bottomShow?: boolean;
};

const ProductDetailsUpper = ({ product, bottomShow = true }: IProps) => {
  const [variant, setVariant] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [retailPrice, setRetailPrice] = useState<number>(0);
  const [costPrice, setCostPrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [productAttributeId, setProductAttributeId] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string>("");
  const { orderQuantity } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [activeImg, setActiveImg] = useState(product?.images?.[0]?.image ?? "/noimage.png");
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    if (product?.productAttributes?.length) {
      const firstAttr = product.productAttributes[0];
      setPrice(firstAttr?.discountedRetailPrice ?? 0);
      setRetailPrice(firstAttr?.retailPrice ?? 0);
      setVariant(firstAttr?.size ?? "");
      setProductAttributeId(firstAttr?.id ?? "");
      setCostPrice(firstAttr?.costPrice ?? 0);
      setDiscountPrice(firstAttr?.discountPrice ?? 0);
      setDiscountPercent(firstAttr?.discountPercent ?? 0);
      setStock(firstAttr?.stockAmount ?? 0);
    }
  }, [product]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (stock > 0) {
      const interval = setInterval(() => setIsPulsing((p) => !p), 1000);
      return () => clearInterval(interval);
    } else setIsPulsing(false);
  }, [stock]);

  const handleImageActive = (img: string) => setActiveImg(img);

  const validateVariant = (): boolean => {
    if (!variant) {
      setToastMessage("⚠️ Please select a variant first.");
      return false;
    }
    return true;
  };

  const getCartProductPayload = () => ({
    name: product?.name,
    image: product?.images?.[0]?.image,
    id: product?.id + variant,
    variant,
    orderQuantity,
    discountedRetailPrice: price,
    costPrice,
    retailPrice,
    discountPrice,
    discountPercent,
    totalCostPrice: costPrice * orderQuantity,
    totalPrice: price * orderQuantity,
    productId: product?.id,
    productAttributeId,
  });

  const handleAddToCart = () => {
    if (!validateVariant()) return;
    dispatch(add_cart_product(getCartProductPayload()));
    dispatch(handleOpenModal());
    setToastMessage("✅ Product added to Cart!");
  };

  const handleOrderWhatsApp = () => {
    if (!validateVariant()) return;
    const whatsappNumber = "+8801622534977";
    const message = `Hello! I want to order:
- Product: ${product.name}
- Variant/Size: ${variant}
- Quantity: ${orderQuantity}
- Price per unit: ${price} TK
- Total Price: ${price * orderQuantity} TK`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleOrderMessenger = () => {
    if (!validateVariant()) return;
    const fbPageUsername = "Strikebdofficial";
    const message = `Hello! I want to order:
- Product: ${product.name}
- Variant/Size: ${variant}
- Quantity: ${orderQuantity}
- Price per unit: ${price} TK
- Total Price: ${price * orderQuantity} TK`;
    navigator.clipboard.writeText(message)
      .then(() => setToastMessage("📋 Order message copied! Paste in Messenger."))
      .finally(() => window.open(`https://m.me/${fbPageUsername}`, "_blank"));
  };

  // --- Styles ---
  const CARD_STYLE: React.CSSProperties = {
    background: "linear-gradient(135deg, #fafafaff 10%, #dff7ebff 50%, #ecececff 120%)",
    borderRadius: "20px",
  
    padding: "20px",
    boxShadow: "8px 8px 15px #cad1db, -8px -8px 15px #ffffff",
    color: "#1f1f1f",
  };

  const INPUT_STYLE: React.CSSProperties = {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
   background: "linear-gradient(135deg, #d9fceaff 0%, #f8f8f8ff 50%, #ffffffff 100%)",
    boxShadow: "inset 4px 4px 6px #cad1db, inset -4px -4px 6px #ffffff",
    color: "#1f1f1f",
    appearance: 'none',
    fontSize: '20px',
    fontWeight: '500',
  };

  const BUTTON_STYLE_BASE: React.CSSProperties = {
    padding: "14px 0",
    borderRadius: "10px",
    fontWeight: "bold",
    fontSize: "15px",
    color: "white",
    border: "none",
    cursor: "pointer",
    flex: '1 1 auto',
    minWidth: '160px',
    textAlign: 'center',
    transition: "all 0.3s",
  };

  const ORDER_NOW_STYLE: React.CSSProperties = {
    ...BUTTON_STYLE_BASE,
    background: "linear-gradient(135deg, #085025ff, #3abb81ff)", // light purple gradient
    boxShadow: isPulsing ? "0 0 15px rgba(159, 122, 234, 0.4)" : "none",
        color: "#ffffffff",

    animation: "pulse 2s infinite",
  };

  const ADD_TO_CART_STYLE: React.CSSProperties = {
    ...BUTTON_STYLE_BASE,
    background: "#f0f4f8",
    color: "#1f1f1f",
    boxShadow: "4px 4px 8px #cad1db, -4px -4px 8px #ffffff",
  };

  const WHATSAPP_STYLE: React.CSSProperties = {
    ...BUTTON_STYLE_BASE,
    backgroundColor: "#25D366",
  };

  const MESSENGER_STYLE: React.CSSProperties = {
    ...BUTTON_STYLE_BASE,
    backgroundColor: "#0078FF",
  };

  return (
    <div className="row p-4" style={{ background: "#f5f5f5ff", fontFamily: 'sans-serif', color: '#1f1f1f',paddingLeft: "35px"}}>
      {/* Product Images */}
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-4">
        <div style={{ ...CARD_STYLE, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', perspective: '1200px' }}>
          <InnerImageZoom
            src={activeImg}
            zoomSrc={activeImg}
            width={450} // slightly larger
            height={500}
            className="rounded-xl"
            hasSpacer
            zoomType="hover"
          />
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', justifyContent: 'center', marginTop: '10px' }}>
            {product?.images?.map((img: any, i: number) => (
              <div key={i} style={{ cursor: 'pointer', border: img.image === activeImg ? "2px solid #3f83f8" : "2px solid transparent", borderRadius: '8px', transition: 'transform 0.3s', transformStyle: 'preserve-3d' }} onMouseEnter={e => (e.currentTarget.style.transform = 'translateZ(15px)')} onMouseLeave={e => (e.currentTarget.style.transform = 'translateZ(0px)')} onClick={() => handleImageActive(img.image)}>
                <Image src={img.image} alt="thumb" width={70} height={90} style={{ borderRadius: '6px', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <div style={CARD_STYLE}>
          <h4 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '14px' }}>
            <Link href={`/product-details/${product?.slug}`} style={{ textDecoration: 'none', color: '#1f1f1f' }}>{product?.name}</Link>
          </h4>
          <div style={{ fontSize: '24px', fontWeight: 600, color: '#1f1f1f', marginBottom: '18px' }}>
            Price: {price} TK {discountPrice ? <span style={{ textDecoration: 'line-through', marginLeft: '10px', color: '#888' }}>{retailPrice} TK</span> : null}
          </div>
          <p style={{ fontSize: '20px', marginBottom: '18px', lineHeight: '1.6', fontWeight: 600 }}>{product?.shortDescription ?? "No description available."}</p>

          {/* Variant Selection */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontWeight: 600, marginBottom: '6px', display: 'block' }}>
              Variant <span style={{ color: '#ff0000' }}>*</span>
            </label>
            <select
              style={INPUT_STYLE}
              value={productAttributeId} // control by productAttributeId
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedAttr = product.productAttributes.find((attr: any) => attr.id === selectedId);
                if (selectedAttr) {
                  setVariant(selectedAttr.size);
                  setPrice(selectedAttr.discountedRetailPrice ?? 0);
                  setRetailPrice(selectedAttr.retailPrice ?? 0);
                  setCostPrice(selectedAttr.costPrice ?? 0);
                  setDiscountPrice(selectedAttr.discountPrice ?? 0);
                  setDiscountPercent(selectedAttr.discountPercent ?? 0);
                  setProductAttributeId(selectedAttr.id);
                  setStock(selectedAttr.stockAmount ?? 0);
                  setActiveImg(selectedAttr.images?.[0]?.image ?? product.images[0]?.image);
                }
              }}
            >
              <option value="">Select Variant</option>
              {product.productAttributes?.map((v: any) => (
                <option key={v.id} value={v.id} disabled={v.stockAmount === 0}>
                  {v.size} {v.stockAmount === 0 ? "(Out of Stock)" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity + Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button onClick={() => dispatch(decrement())} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd' }}>-</button>
              <input type="text" value={orderQuantity} readOnly style={{ width: '45px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '6px' }} />
              <button onClick={() => dispatch(increment())} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd' }}>+</button>
            </div>
            <button onClick={handleAddToCart} style={ADD_TO_CART_STYLE}>+ Add to Cart</button>
            <button onClick={() => { dispatch(add_cart_product(getCartProductPayload())); router.push("/checkout"); }} style={ORDER_NOW_STYLE}>Order Now</button>
            <button onClick={handleOrderWhatsApp} style={WHATSAPP_STYLE}>WhatsApp Order</button>
            <button onClick={handleOrderMessenger} style={MESSENGER_STYLE}>Messenger Order</button>
          </div>

          {toastMessage && <div style={{ marginTop: '16px', padding: '12px', borderRadius: '10px', background: '#d4edda', borderLeft: '4px solid #34d399' }}>{toastMessage}</div>}
        </div>
      </div>

      {/* Global pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 5px rgba(159,122,234,0.3); }
          50% { transform: scale(1.03); box-shadow: 0 0 15px rgba(159,122,234,0.5); }
          100% { transform: scale(1); box-shadow: 0 0 5px rgba(159,122,234,0.3); }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsUpper;
