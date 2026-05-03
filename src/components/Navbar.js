"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
    setMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-tiles", label: "All Tiles" },
    ...(session ? [{ href: "/my-profile", label: "My Profile" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 bg-tile-cream border-b border-tile-sand shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-8 h-8 bg-tile-accent rounded-sm flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-300">
              <span className="text-white font-display font-bold text-sm -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                T
              </span>
            </div>
            <span className="font-display text-xl font-bold text-tile-charcoal">
              Tile<span className="text-tile-accent">Vista</span>
            </span>
          </Link>

          {/* Center Nav — Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-tile-slate hover:text-tile-accent transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tile-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right — Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-tile-sand animate-pulse" />
            ) : session ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name}
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-tile-clay group-hover:border-tile-accent transition-colors"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-tile-clay flex items-center justify-center text-white font-semibold text-sm">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[100] menu p-2 shadow-lg bg-white rounded-lg w-48 border border-tile-sand mt-1"
                >
                  <li>
                    <Link
                      href="/my-profile"
                      className="flex items-center gap-2 text-tile-charcoal hover:bg-tile-cream"
                    >
                      <User size={16} /> My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="btn btn-sm bg-tile-accent hover:bg-tile-charcoal text-white border-none px-5 font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Hamburger — Mobile */}
          <button
            className="md:hidden p-2 rounded-md text-tile-charcoal hover:bg-tile-sand transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-tile-cream border-t border-tile-sand px-4 py-4 space-y-2 animate__animated animate__fadeIn animate__faster">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-tile-slate hover:text-tile-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-tile-sand">
            {session ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-red-600 py-2"
              >
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setMenuOpen(false)}
                className="btn btn-sm bg-tile-accent text-white border-none w-full"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
