import HomeBanner from "../../components/HomeBanner";
import MarqueeStrip from "../../components/MarqueeStrip";
import FeaturedTiles from "../../components/FeaturedTiles";
import HowItWorks from "../../components/HowItWorks";
// import { getFeaturedTiles } from "@/lib/api";
import { getFeaturedTiles } from "../../lib/api";

export const metadata = {
  title: "TileVista — Discover Your Perfect Aesthetic",
};

export default async function HomePage() {
  const featuredTiles = await getFeaturedTiles();

  return (
    <>
      <HomeBanner />
      <MarqueeStrip />
      <FeaturedTiles tiles={featuredTiles} />
      <HowItWorks />
    </>
  );
}
