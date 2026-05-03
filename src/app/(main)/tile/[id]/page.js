import { getTileById, getAllTiles } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiPackage, FiMaximize2 } from "react-icons/fi";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import ProtectedPage from "@/components/ProtectedPage";

export async function generateStaticParams() {
  const tiles = await getAllTiles();
  return tiles.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }) {
  const tile = await getTileById(params.id);
  return {
    title: tile ? `${tile.title} — TileVista` : "Tile Not Found",
  };
}

export default async function TileDetailsPage({ params }) {
  const tile = await getTileById(params.id);

  if (!tile) {
    notFound();
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-tile-light py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <Link
            href="/all-tiles"
            className="inline-flex items-center gap-2 text-sm text-tile-slate hover:text-tile-accent transition-colors mb-8 group"
          >
            <FiArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Gallery
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left — Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border border-tile-sand">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating category tag */}
              <div className="absolute -bottom-4 left-6 bg-tile-charcoal text-tile-sand text-xs px-4 py-2 rounded-full capitalize font-medium tracking-wide">
                {tile.category.replace("-", " ")}
              </div>
            </div>

            {/* Right — Info */}
            <div className="pt-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tile.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-tile-cream border border-tile-sand text-tile-slate px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-bold text-tile-charcoal mb-2">
                {tile.title}
              </h1>

              <p className="text-sm text-tile-slate mb-1">
                By{" "}
                <span className="text-tile-accent font-medium">
                  {tile.creator}
                </span>
              </p>

              <div className="flex items-center gap-3 my-4">
                <span className="text-2xl font-bold text-tile-accent">
                  {tile.currency} {tile.price.toFixed(2)}
                </span>
                <span
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${
                    tile.inStock ? "badge-in-stock" : "badge-out-stock"
                  }`}
                >
                  {tile.inStock ? (
                    <BsCheckCircleFill size={12} />
                  ) : (
                    <BsXCircleFill size={12} />
                  )}
                  {tile.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Description */}
              <p className="text-tile-slate text-sm leading-relaxed mb-6 border-l-2 border-tile-clay pl-4 italic">
                {tile.description}
              </p>

              {/* Style */}
              {tile.style && (
                <div className="bg-tile-cream rounded-xl p-4 mb-6">
                  <p className="text-xs text-tile-clay uppercase tracking-widest font-medium mb-1">
                    Style Description
                  </p>
                  <p className="text-sm text-tile-charcoal">{tile.style}</p>
                </div>
              )}

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <SpecCard
                  icon={<FiMaximize2 size={16} />}
                  label="Dimensions"
                  value={tile.dimensions}
                />
                <SpecCard
                  icon={<FiPackage size={16} />}
                  label="Material"
                  value={tile.material}
                />
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  disabled={!tile.inStock}
                  className="flex-1 btn bg-tile-accent hover:bg-tile-charcoal text-white border-none rounded-xl font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {tile.inStock ? "Request Sample" : "Notify Me When Available"}
                </button>
                <Link
                  href="/all-tiles"
                  className="flex-1 btn btn-outline border-tile-sand text-tile-charcoal hover:bg-tile-cream hover:border-tile-clay rounded-xl font-medium"
                >
                  Browse More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}

function SpecCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-tile-sand rounded-xl p-3">
      <div className="text-tile-clay">{icon}</div>
      <div>
        <p className="text-xs text-tile-slate/60 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-medium text-tile-charcoal">{value}</p>
      </div>
    </div>
  );
}
