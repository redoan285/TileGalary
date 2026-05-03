import AllTilesClient from "@/components/AllTilesClient";
import { getAllTiles } from "@/lib/api";

export const metadata = {
  title: "All Tiles — TileVista Gallery",
};

export default async function AllTilesPage() {
  const tiles = await getAllTiles();
  return <AllTilesClient initialTiles={tiles} />;
}
