"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    headline: "Discover Your Perfect Aesthetic",
    sub: "Handcrafted tiles from artisans across the globe",
    bg: "from-stone-900 via-amber-950 to-stone-800",
    accent: "Ceramic · Marble · Zellige",
  },
  {
    headline: "Where Craft Meets Contemporary",
    sub: "Premium surfaces for spaces that inspire",
    bg: "from-slate-900 via-neutral-800 to-zinc-900",
    accent: "Mosaic · Terracotta · Slate",
  },
  {
    headline: "Timeless Beauty, Modern Spaces",
    sub: "Curated tile gallery updated weekly",
    bg: "from-amber-900 via-stone-800 to-amber-950",
    accent: "Wood Effect · Cement · Decorative",
  },
];

export default function HomeBanner() {
  return (
    <section className="relative h-[88vh] min-h-[540px] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-full w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className={`relative h-full w-full bg-gradient-to-br ${slide.bg} grain flex items-center justify-center`}
            >
              {/* Tile pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(196,149,106,0.4) 59px, rgba(196,149,106,0.4) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(196,149,106,0.4) 59px, rgba(196,149,106,0.4) 60px)`,
                }}
              />

              {/* Decorative circles */}
              <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-tile-clay/20 animate-spin-slow" />
              <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full border border-tile-clay/10" />

              {/* Content */}
              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <p className="text-tile-clay text-xs tracking-[0.3em] uppercase mb-6 animate__animated animate__fadeInDown">
                  {slide.accent}
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight animate__animated animate__fadeInUp">
                  {slide.headline}
                </h1>
                <p className="text-tile-sand/80 text-lg mb-10 animate__animated animate__fadeIn">
                  {slide.sub}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate__animated animate__fadeInUp">
                  <Link
                    href="/all-tiles"
                    className="btn bg-tile-accent hover:bg-tile-clay text-white border-none px-8 py-3 rounded-full font-medium text-sm tracking-wide transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Browse Now →
                  </Link>
                  <a
                    href="#featured"
                    className="btn btn-outline border-tile-sand/40 text-tile-sand hover:bg-tile-sand/10 hover:border-tile-clay px-8 py-3 rounded-full font-medium text-sm tracking-wide"
                  >
                    Featured Tiles
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-tile-light to-transparent z-20 pointer-events-none" />

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(196, 149, 106, 0.5);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #c4956a;
          width: 24px;
          border-radius: 4px;
        }
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
