import { promises as fs } from "fs";
import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import Breadcrumb from "@/components/common/breadcrumb";
import Footer from "@/layout/footers/footer";
import ShopArea from "@/components/shop/shop-area";

export const metadata: Metadata = {
  title: "Shop 3 Col Page",
};

export default async function ShopThreeColPage() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/product-data.json",
    "utf8"
  );
  const product_data = JSON.parse(file);
  return (
    <Wrapper>
      {/* header start */}
      <Header />
      {/* header end */}

      <main>
        {/* breadcrumb start */}
        <Breadcrumb title="Shop" subtitle="Shop" />
        {/* breadcrumb end */}

      
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
