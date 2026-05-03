import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-tile-light flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Tile mosaic 404 */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-4 gap-1.5 w-32">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-md"
                style={{
                  background: i % 5 === 0
                    ? "#8B6914"
                    : i % 3 === 0
                    ? "#C4956A"
                    : i % 7 === 0
                    ? "#2C2C2C"
                    : "#E8DCC8",
                  opacity: i === 5 || i === 10 ? 0.2 : 1,
                }}
              />
            ))}
          </div>
        </div>

        <h1 className="font-display text-7xl font-bold text-tile-charcoal mb-3">
          404
        </h1>
        <p className="font-display text-xl font-semibold text-tile-charcoal mb-2">
          Tile Not Found
        </p>
        <p className="text-sm text-tile-slate mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn bg-tile-accent hover:bg-tile-charcoal text-white border-none rounded-xl font-medium"
          >
            Go Home
          </Link>
          <Link
            href="/all-tiles"
            className="btn btn-outline border-tile-sand text-tile-charcoal hover:bg-tile-cream hover:border-tile-clay rounded-xl font-medium"
          >
            Browse Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
