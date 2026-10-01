import { Hero } from "@/components/Hero";
import { PromoStrip } from "@/components/PromoStrip";
import { HomePortals } from "@/components/HomePortals";
import { HomeInfo } from "@/components/HomeInfo";

export default function Home() {
  return (
    <>
      <Hero />
      <PromoStrip />
      <HomePortals />
      <HomeInfo />
    </>
  );
}
