import { fetchData } from "@/api/api";
import ShopArea from "@/components/shop/shop-area";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Shop Page",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  // ✅ MUST await - fix error
  const params = await searchParams;
  const categoryParam = params?.category;

  // fetch categories
  const categoriesRes = await fetchData({
    url: `/customer/categories`,
    cache: "force-cache",
  });

  // fetch products
  const productRes = await fetchData({
    url: `/customer/products?limit=500`,
    cache: "force-cache",
  });

  const products = productRes?.data || [];

  // ✅ filter by category correctly
  const allProducts = categoryParam
    ? products.filter(
        (product: any) =>
          product.category?.id === categoryParam ||
          product.category_id === categoryParam ||
          product.categoryId === categoryParam
      )
    : products;

  // ✅ resolve category name
  const categoryName = categoriesRes?.data?.find(
    (cat: any) => cat.id === categoryParam
  )?.name;

  return (
    <Wrapper>
      <Header />
      <main>
        <Suspense fallback={<Loading />}>
          <ShopArea
            allProducts={allProducts}
            categoryName={categoryName || "All Products"}
          />
        </Suspense>
      </main>
      <Footer />
    </Wrapper>
  );
}
