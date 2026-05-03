"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn.email({ email, password });
      if (res.error) {
        toast.error(res.error.message || "Invalid email or password");
      } else {
        toast.success("Welcome back!");
        router.push(redirect);
      }
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: redirect });
    } catch {
      toast.error("Google login failed.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-card rounded-3xl p-8 shadow-xl animate__animated animate__fadeInUp">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-tile-accent rounded-xl flex items-center justify-center rotate-12 mx-auto mb-4">
          <span className="text-white font-display font-bold -rotate-12">T</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-tile-charcoal">
          Welcome Back
        </h1>
        <p className="text-sm text-tile-slate mt-1">
          Sign in to your TileVista account
        </p>
      </div>

      {/* Google login */}
      <button
        onClick={handleGoogle}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-tile-sand rounded-xl text-sm font-medium text-tile-charcoal hover:bg-tile-cream transition-colors disabled:opacity-60 mb-6"
      >
        {googleLoading ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          <FcGoogle size={20} />
        )}
        Continue with Google
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-tile-sand" />
        <span className="text-xs text-tile-slate/60">or sign in with email</span>
        <div className="flex-1 h-px bg-tile-sand" />
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email */}
        <div className="relative">
          <FiMail
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-tile-slate/50"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
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
          className="w-full btn bg-tile-accent hover:bg-tile-charcoal text-white border-none rounded-xl font-medium transition-colors disabled:opacity-60"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="text-center text-sm text-tile-slate mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="text-tile-accent font-medium hover:underline"
        >
          Register here
        </Link>
      </p>
    </div>
  );
}
