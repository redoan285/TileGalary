import dbConnect from "./db";
import { Tile } from "./models/Tile";

export async function getAllTiles() {
  try {
    await dbConnect();
    const tiles = await Tile.find({}).lean();
    return JSON.parse(JSON.stringify(tiles));
  } catch (error) {
    console.error("Error fetching all tiles:", error);
    return [];
  }
}

export async function getTileById(id) {
  try {
    await dbConnect();
    // Some IDs might be the old JSON-server string IDs, some might be ObjectIds
    // We try to find by the 'id' field first (which we imported)
    let tile = await Tile.findOne({ id: id }).lean();
    if (!tile) {
      // Fallback to _id if not found by 'id'
      try {
        tile = await Tile.findById(id).lean();
      } catch {
        return null;
      }
    }
    return tile ? JSON.parse(JSON.stringify(tile)) : null;
  } catch (error) {
    console.error(`Error fetching tile ${id}:`, error);
    return null;
  }
}

export async function getFeaturedTiles() {
  try {
    await dbConnect();
    const tiles = await Tile.find({}).limit(4).lean();
    return JSON.parse(JSON.stringify(tiles));
  } catch (error) {
    console.error("Error fetching featured tiles:", error);
    return [];
  }
}

