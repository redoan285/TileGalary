"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";

const CATEGORIES = [
  "all",
  "ceramic",
  "marble",
  "mosaic",
  "terracotta",
  "zellige",
  "wood-effect",
  "cement",
  "decorative",
  "concrete-effect",
  "subway",
];

export default function AllTilesClient({ initialTiles }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    return initialTiles.filter((tile) => {
      const matchSearch =
        search === "" ||
        tile.title.toLowerCase().includes(search.toLowerCase()) ||
        tile.description.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        activeCategory === "all" || tile.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [initialTiles, search, activeCategory]);

  return (
    <div className="min-h-screen bg-tile-light">
      {/* Hero search header */}
      <div className="bg-tile-charcoal py-14 px-4 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(196,149,106,0.5) 39px, rgba(196,149,106,0.5) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(196,149,106,0.5) 39px, rgba(196,149,106,0.5) 40px)`,
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-tile-clay text-xs tracking-[0.3em] uppercase mb-2">
            The Gallery
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mb-6">
            All Tiles
          </h1>
          {/* Search input */}
          <div className="relative">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-tile-slate"
              size={20}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tiles by name or description..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 text-tile-charcoal placeholder-tile-slate/60 text-sm border border-tile-sand focus:outline-none focus:ring-2 focus:ring-tile-clay shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium capitalize transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-tile-accent text-white shadow-md"
                  : "bg-white border border-tile-sand text-tile-slate hover:border-tile-clay hover:text-tile-accent"
              }`}
            >
              {cat === "all" ? "All Categories" : cat.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-tile-slate mb-6">
          Showing{" "}
          <span className="font-semibold text-tile-accent">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "tile" : "tiles"}
          {search && (
            <span>
              {" "}
              for{" "}
              <span className="font-semibold text-tile-charcoal">
                &ldquo;{search}&rdquo;
              </span>
            </span>
          )}
        </p>

        {/* Tiles grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-tile-cream rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiSearch size={28} className="text-tile-clay" />
            </div>
            <h3 className="font-display text-xl font-semibold text-tile-charcoal mb-2">
              No tiles found
            </h3>
            <p className="text-tile-slate text-sm">
              Try a different search term or category
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="mt-4 text-sm text-tile-accent hover:underline font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((tile, idx) => (
              <GalleryCard key={tile.id} tile={tile} idx={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GalleryCard({ tile, idx }) {
  return (
    <div
      className="tile-card bg-white rounded-2xl overflow-hidden border border-tile-sand group animate__animated animate__fadeIn"
      style={{ animationDelay: `${idx * 60}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={tile.image}
          alt={tile.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 text-tile-charcoal text-xs px-2 py-1 rounded-full font-medium capitalize">
            {tile.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-semibold text-tile-charcoal text-sm mb-1 line-clamp-1">
          {tile.title}
        </h3>
        <p className="text-xs text-tile-slate mb-3">{tile.dimensions}</p>
        <div className="flex items-center justify-between">
          <span className="text-tile-accent font-bold text-sm">
            {tile.currency} {tile.price.toFixed(2)}
          </span>
          <Link
            href={`/tile/${tile.id}`}
            className="btn btn-xs bg-tile-charcoal hover:bg-tile-accent text-white border-none rounded-lg text-xs px-3 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
