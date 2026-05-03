import { FiSearch, FiHeart, FiShoppingBag } from "react-icons/fi";

const steps = [
  {
    icon: <FiSearch size={28} />,
    title: "Browse the Gallery",
    desc: "Explore hundreds of premium tiles across ceramic, marble, mosaic, terracotta, and more.",
    num: "01",
  },
  {
    icon: <FiHeart size={28} />,
    title: "Find Your Aesthetic",
    desc: "Filter by category, style, and material. Save your favourites to your profile.",
    num: "02",
  },
  {
    icon: <FiShoppingBag size={28} />,
    title: "Order with Confidence",
    desc: "Request samples, get expert advice, and order tiles delivered to your door.",
    num: "03",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-tile-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-tile-clay text-xs tracking-[0.3em] uppercase mb-2">
            Simple Process
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-tile-charcoal">
            How It Works
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative p-8 bg-white rounded-2xl border border-tile-sand hover:border-tile-clay transition-colors group"
            >
              <span className="absolute top-6 right-6 font-display text-5xl font-bold text-tile-sand/50 group-hover:text-tile-clay/20 transition-colors">
                {step.num}
              </span>
              <div className="w-14 h-14 rounded-xl bg-tile-cream flex items-center justify-center text-tile-accent mb-5 group-hover:bg-tile-accent group-hover:text-white transition-colors duration-300">
                {step.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-tile-charcoal mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-tile-slate leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
