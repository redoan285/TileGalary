import Marquee from "react-fast-marquee";

const items = [
  "✦ New Arrivals: Zellige Cobalt",
  "✦ Weekly Feature: Modern Geometric Patterns",
  "✦ Join the Community of 10,000+ Design Lovers",
  "✦ Free Samples on Orders Over $200",
  "✦ New Arrivals: Marble Ivory Classic",
  "✦ Artisan Spotlight: Fez Guild Collection",
  "✦ Just Dropped: Midnight Slate Mosaic",
  "✦ Trending: Sage Green Subway Tiles",
];

export default function MarqueeStrip() {
  return (
    <div className="marquee-strip py-3 overflow-hidden">
      <Marquee speed={50} gradient={false}>
        {items.map((item, i) => (
          <span
            key={i}
            className="text-white text-xs font-medium tracking-widest uppercase mx-8"
          >
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
