"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiUser, FiImage, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function RegisterClient() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.image || undefined,
      });
      if (res.error) {
        toast.error(res.error.message || "Registration failed");
      } else {
        toast.success("Account created! Please log in.");
        router.push("/auth/login");
      }
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google login failed.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-card rounded-3xl p-8 shadow-xl animate__animated animate__fadeInUp">
      <div className="text-center mb-7">
        <div className="w-12 h-12 bg-tile-accent rounded-xl flex items-center justify-center rotate-12 mx-auto mb-4">
          <span className="text-white font-display font-bold -rotate-12">T</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-tile-charcoal">
          Create Account
        </h1>
        <p className="text-sm text-tile-slate mt-1">
          Join the TileVista community
        </p>
      </div>

      {/* Google */}
      <button
        onClick={handleGoogle}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-tile-sand rounded-xl text-sm font-medium text-tile-charcoal hover:bg-tile-cream transition-colors disabled:opacity-60 mb-5"
      >
        {googleLoading ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          <FcGoogle size={20} />
        )}
        Continue with Google
      </button>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-tile-sand" />
        <span className="text-xs text-tile-slate/60">or register with email</span>
        <div className="flex-1 h-px bg-tile-sand" />
      </div>

      <form onSubmit={handleRegister} className="space-y-3.5">
        {/* Name */}
        <div className="relative">
          <FiUser
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-tile-slate/50"
          />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            required
            className="w-full pl-10 pr-4 py-3 border border-tile-sand rounded-xl text-sm text-tile-charcoal placeholder-tile-slate/40 focus:outline-none focus:ring-2 focus:ring-tile-clay bg-white"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <FiMail
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-tile-slate/50"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            required
            className="w-full pl-10 pr-4 py-3 border border-tile-sand rounded-xl text-sm text-tile-charcoal placeholder-tile-slate/40 focus:outline-none focus:ring-2 focus:ring-tile-clay bg-white"
          />
        </div>

        {/* Photo URL */}
        <div className="relative">
          <FiImage
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-tile-slate/50"
          />
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Photo URL (optional)"
            className="w-full pl-10 pr-4 py-3 border border-tile-sand rounded-xl text-sm text-tile-charcoal placeholder-tile-slate/40 focus:outline-none focus:ring-2 focus:ring-tile-clay bg-white"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FiLock
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-tile-slate/50"
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password (min 6 chars)"
            required
            minLength={6}
            className="w-full pl-10 pr-10 py-3 border border-tile-sand rounded-xl text-sm text-tile-charcoal placeholder-tile-slate/40 focus:outline-none focus:ring-2 focus:ring-tile-clay bg-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-tile-slate/50 hover:text-tile-slate"
          >
            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn bg-tile-accent hover:bg-tile-charcoal text-white border-none rounded-xl font-medium transition-colors disabled:opacity-60 mt-1"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Register"
          )}
        </button>
      </form>

      <p className="text-center text-sm text-tile-slate mt-6">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-tile-accent font-medium hover:underline"
        >
          Login here
        </Link>
      </p>
    </div>
  );
}
