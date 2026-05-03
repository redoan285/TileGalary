export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-tile-light">
      <div className="text-center">
        <div className="grid grid-cols-3 gap-2 w-16 mx-auto mb-4">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-md bg-tile-clay animate-pulse"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
        <p className="text-sm text-tile-slate">Loading...</p>
      </div>
    </div>
  );
}
