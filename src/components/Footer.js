import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-tile-charcoal text-tile-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-tile-accent rounded-sm flex items-center justify-center rotate-12">
                <span className="text-white font-bold text-sm -rotate-12">T</span>
              </div>
              <span className="font-display text-xl font-bold text-white">
                Tile<span className="text-tile-clay">Vista</span>
              </span>
            </div>
            <p className="text-sm text-tile-sand/70 leading-relaxed">
              Discover premium tiles from artisans around the world. Where
              craftsmanship meets contemporary design.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-5">
              {[
                {
                  icon: <FaFacebook size={18} />,
                  href: "#",
                  label: "Facebook",
                },
                {
                  icon: <FaInstagram size={18} />,
                  href: "#",
                  label: "Instagram",
                },
                {
                  icon: <FaPinterest size={18} />,
                  href: "#",
                  label: "Pinterest",
                },
                {
                  icon: <FaYoutube size={18} />,
                  href: "#",
                  label: "YouTube",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-tile-sand/30 flex items-center justify-center text-tile-sand/60 hover:text-white hover:border-tile-clay hover:bg-tile-clay/20 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-white font-semibold mb-4 text-base">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/all-tiles", label: "All Tiles" },
                { href: "/my-profile", label: "My Profile" },
                { href: "/auth/login", label: "Login" },
                { href: "/auth/register", label: "Register" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-tile-sand/70 hover:text-tile-clay transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display text-white font-semibold mb-4 text-base">
              Categories
            </h3>
            <ul className="space-y-2">
              {[
                "Ceramic",
                "Marble",
                "Mosaic",
                "Terracotta",
                "Zellige",
                "Wood Effect",
                "Cement",
                "Decorative",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/all-tiles?category=${cat.toLowerCase()}`}
                    className="text-sm text-tile-sand/70 hover:text-tile-clay transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-white font-semibold mb-4 text-base">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-tile-sand/70">
                <FiMapPin className="text-tile-clay mt-0.5 shrink-0" size={16} />
                <span>12 Artisan Lane, Design District, Dhaka 1200, BD</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-tile-sand/70">
                <FiPhone className="text-tile-clay shrink-0" size={16} />
                <a href="tel:+8801711000000" className="hover:text-tile-clay transition-colors">
                  +880 1711-000000
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-tile-sand/70">
                <FiMail className="text-tile-clay shrink-0" size={16} />
                <a
                  href="mailto:hello@tilevista.com"
                  className="hover:text-tile-clay transition-colors"
                >
                  hello@tilevista.com
                </a>
              </li>
            </ul>

            {/* Newsletter mini */}
            <div className="mt-5">
              <p className="text-xs text-tile-sand/50 mb-2">Stay inspired</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/10 border border-tile-sand/20 rounded-md px-3 py-2 text-xs text-white placeholder-tile-sand/40 focus:outline-none focus:border-tile-clay"
                />
                <button className="px-3 py-2 bg-tile-clay hover:bg-tile-accent text-white text-xs rounded-md transition-colors font-medium">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-tile-sand/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-tile-sand/40">
            © {new Date().getFullYear()} TileVista. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-tile-sand/40 hover:text-tile-clay transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
