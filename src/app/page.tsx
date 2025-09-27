import Brands from "@/components/brands/brand-area";
import HeroSliderOne from "@/components/hero-banner/hero-banner-one";
import TrendingProducts from "@/components/products/trending-products";
import ShopCategory from "@/components/shop/shop-category";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";

import { fetchData } from "@/api/api";

import SaleOffProducts from "@/components/products/sale-off-products";
import SubscribeArea from "@/components/subscribe-area";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "./loading";

export default async function HomePage() {
  const banners = await fetchData({
    url: "/customer/banners",
    cache: "force-cache",
  });

  const categories = await fetchData({
    url: `/customer/categories?skip=0&take=5`,
    cache: "force-cache",
  });

  const trendingProducts = await fetchData({
    url: `/customer/trending-products?limit=500&page=1`,
    cache: "force-cache",
  });

  const featuredProducts = await fetchData({
    url: `/customer/featured-products?limit=500&page=1`,
    cache: "force-cache",
  });

  const brands = await fetchData({
    url: `/customer/brands?skip=0&take=10`,
    cache: "force-cache",
  });

  return (
    <Wrapper>
      <Header />

      <main>
        <Suspense fallback={<Loading />}>
          {/* Hero Banner */}
          {banners?.data?.length > 0 && <HeroSliderOne banners={banners?.data} />}

          {/* Shop Categories */}
          {categories?.data?.length > 0 && <ShopCategory categories={categories?.data} />}

          {/* Trending Products */}
          {trendingProducts?.data?.length > 0 && (
            <TrendingProducts trendingProd={trendingProducts?.data} />
          )}

          {/* Sale/Featured Products */}
       <SaleOffProducts
  products={[]}
  featuredProducts={featuredProducts?.data}
/>
          {/* Brands
          // {brands?.data?.length > 0 && <Brands brands={brands?.data} />} */}

          {/* Subscribe Area */}
          <SubscribeArea />
        </Suspense>
      </main>

      {/* Floating Track Order Button */}


      <Footer />
    </Wrapper>
  );
}
