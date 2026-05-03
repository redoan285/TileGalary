import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

export default function FeaturedTiles({ tiles }) {
  return (
    <section id="featured" className="py-20 px-4 bg-tile-light">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-tile-clay text-xs tracking-[0.3em] uppercase mb-2">
              Handpicked Collection
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-tile-charcoal">
              Featured Tiles
            </h2>
          </div>
          <Link
            href="/all-tiles"
            className="flex items-center gap-2 text-sm text-tile-accent hover:text-tile-charcoal font-medium transition-colors group"
          >
            View All Tiles{" "}
            <FiArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Grid */}
        {tiles.length === 0 ? (
          <div className="text-center py-20 text-tile-slate">
            <p className="text-lg">Could not load featured tiles.</p>
            <p className="text-sm mt-1 opacity-60">
              Make sure JSON server is running on port 5000.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiles.slice(0, 4).map((tile, idx) => (
              <TileCard key={tile.id} tile={tile} idx={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function TileCard({ tile, idx }) {
  return (
    <div
      className="tile-card bg-white rounded-2xl overflow-hidden border border-tile-sand group"
      style={{ animationDelay: `${idx * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={tile.image}
          alt={tile.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 text-tile-charcoal text-xs px-2.5 py-1 rounded-full font-medium capitalize">
            {tile.category}
          </span>
        </div>
        {/* Stock indicator */}
        <div className="absolute top-3 right-3">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              tile.inStock ? "badge-in-stock" : "badge-out-stock"
            }`}
          >
            {tile.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-tile-charcoal text-base mb-1 line-clamp-1">
          {tile.title}
        </h3>
        <p className="text-xs text-tile-slate mb-1">{tile.dimensions}</p>
        <p className="text-tile-accent font-bold text-sm mb-4">
          {tile.currency} {tile.price.toFixed(2)}
        </p>

        <Link
          href={`/tile/${tile.id}`}
          className="block w-full text-center btn btn-sm bg-tile-charcoal hover:bg-tile-accent text-white border-none rounded-xl text-xs font-medium tracking-wide transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
