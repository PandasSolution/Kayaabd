"use client";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hook";
import { handleModalProduct, handleOpenModal } from "@/redux/features/utility";

const ProductItem = ({
  product,
  setLoading,
}: {
  product: any;
  setLoading?: any;
}) => {
  const dispatch = useAppDispatch();

  const handleProductModal = (prd: any) => {
    dispatch(handleModalProduct({ product: prd }));
    dispatch(handleOpenModal());
  };

  const discountPercent = product.productAttributes?.[0]?.discountPercent || 0;
  const stock = product.productAttributes?.[0]?.stockAmount ?? 0;

  return (
    <div className="product-card-modern rounded-xl overflow-hidden flex flex-col relative">
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <div className="discount-badge">{discountPercent}% OFF</div>
      )}

      {/* Stock Out Badge */}
      {stock <= 0 && <div className="stockout-badge">Stock Out</div>}

      {/* Product Images */}
      <Link
        href={`/product-details/${product.slug}`}
        onClick={() => setLoading && setLoading(true)}
      >
        <div className="product-image-wrapper">
          <Image
            src={product?.images?.[0]?.image ?? "/noimage.png"}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
          />
          {product?.images?.[1]?.image && (
            <Image
              src={product.images[1].image}
              alt={product.name}
              fill
              className="hover-image"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="product-info flex flex-col gap-2 flex-1">
        <h4>{product.name}</h4>
        <div className="price">
          <span className="current-price">
            {product.productAttributes?.[0]?.discountedRetailPrice} TK
          </span>
          {discountPercent > 0 && (
            <span className="old-price">
              {product.productAttributes[0].retailPrice} TK
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="product-actions">
          {/* Add to Cart - Outline Style */}
          <button
            className="add-cart-btn"
            onClick={() => handleProductModal(product)}
            disabled={stock <= 0}
          >
            <i className="fal fa-shopping-cart"></i> Add to Cart
          </button>

          {/* Order Now - Solid Style */}
          <button
            className="order-now-btn"
            onClick={() => handleProductModal(product)}
            disabled={stock <= 0}
          >
            <i className="fas fa-shopping-bag"></i> Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
