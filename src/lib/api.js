const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getAllTiles() {
  try {
    const res = await fetch(`${API_URL}/tiles`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch tiles");
    return res.json();
  } catch {
    return [];
  }
}

export async function getTileById(id) {
  try {
    const res = await fetch(`${API_URL}/tiles/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Tile not found");
    return res.json();
  } catch {
    return null;
  }
}

export async function getFeaturedTiles() {
  try {
    const res = await fetch(`${API_URL}/tiles?_limit=4`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch featured tiles");
    return res.json();
  } catch {
    return [];
  }
}
