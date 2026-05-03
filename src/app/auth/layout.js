import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-tile-cream flex flex-col">
      {/* Top bar */}
      <div className="p-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-7 h-7 bg-tile-accent rounded-sm flex items-center justify-center rotate-12">
            <span className="text-white font-bold text-xs -rotate-12">T</span>
          </div>
          <span className="font-display text-lg font-bold text-tile-charcoal">
            Tile<span className="text-tile-accent">Vista</span>
          </span>
        </Link>
      </div>

      {/* Tile pattern background */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(139,105,20,0.5) 59px, rgba(139,105,20,0.5) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(139,105,20,0.5) 59px, rgba(139,105,20,0.5) 60px)`,
          }}
        />
        <div className="relative z-10 w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
