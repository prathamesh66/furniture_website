import Image from "next/image";
import BannerSection from "./components/pages/homeComponents/BannerSection";
import CollectionSection from "./components/pages/homeComponents/CollectionSection";
import ProductTabs from "./components/pages/homeComponents/ProductTabs";
import TrendingCollection from "./components/pages/homeComponents/TrendingCollection";
import WhyChooseUs from "./components/pages/homeComponents/WhyChooseUs";
import NewsLetter from "./components/pages/homeComponents/NewsLetter";
import BestSelling from "./components/pages/homeComponents/BestSelling";
import Testimonials from "./components/pages/homeComponents/CustomerSay";

export default function Home() {
  return (
    <>
      <BannerSection />
      <CollectionSection />
      <hr className="text-[#ccc]" />
      <ProductTabs />
      <TrendingCollection/>
      <BestSelling/>  
      <WhyChooseUs/>
      <Testimonials/>
      <NewsLetter/>
    </>
  );
}
