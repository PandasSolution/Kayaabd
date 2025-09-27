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

export default async function ShopPage({ searchParams }: any) {
  const categoriesRes = await fetchData({
    url: `/customer/categories`,
    cache: "force-cache",
  });

  const categoryParam = searchParams?.category;

  const productRes = await fetchData({
    url: `/customer/products?limit=500`, // max 500 products
    cache: "force-cache",
  });

  // filter by category
  let allProducts = productRes?.data?.filter((product: any) =>
    categoryParam ? product.categoryId === categoryParam : true
  );

  // get category name for headline
  const categoryName = categoriesRes?.data?.find(
    (cat: any) => cat.id === categoryParam
  )?.name;

  return (
    <Wrapper>
      <Header />
      <main>
        <Suspense fallback={<Loading />}>
          <ShopArea
            allProducts={allProducts || []}
            categoryName={categoryName || "All Products"}
          />
        </Suspense>
      </main>
      <Footer />
    </Wrapper>
  );
}
