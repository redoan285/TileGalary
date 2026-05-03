"use client";

import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import Link from "next/link";

export default function UpdateProfileClient() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/auth/login");
    }
    if (session) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
      setPreview(session.user.image || "");
    }
  }, [session, isPending, router]);

  const handleImageChange = (val) => {
    setImage(val);
    setPreview(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setLoading(true);
    try {
      await authClient.updateUser({ name, image });
      toast.success("Profile updated successfully!");
      router.push("/my-profile");
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader mx-auto" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-tile-light py-12 px-4">
      <div className="max-w-lg mx-auto">
        <Link
          href="/my-profile"
          className="inline-flex items-center gap-2 text-sm text-tile-slate hover:text-tile-accent mb-8 group"
        >
          <FiArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Profile
        </Link>

        <div className="bg-white rounded-3xl border border-tile-sand p-8 shadow-sm">
          <h1 className="font-display text-2xl font-bold text-tile-charcoal mb-2">
            Update Information
          </h1>
          <p className="text-sm text-tile-slate mb-8">
            Update your name and profile image URL below.
          </p>

          {/* Preview */}
          <div className="flex justify-center mb-8">
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={96}
                height={96}
                className="rounded-2xl border-2 border-tile-clay object-cover"
                onError={() => setPreview("")}
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl border-2 border-tile-sand bg-tile-cream flex items-center justify-center">
                <span className="text-tile-clay font-display text-3xl font-bold">
                  {name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-tile-slate uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full border border-tile-sand rounded-xl px-4 py-3 text-sm text-tile-charcoal placeholder-tile-slate/40 focus:outline-none focus:ring-2 focus:ring-tile-clay focus:border-transparent bg-tile-light"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-tile-slate uppercase tracking-wider mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => handleImageChange(e.target.value)}
                placeholder="https://example.com/your-photo.jpg"
                className="w-full border border-tile-sand rounded-xl px-4 py-3 text-sm text-tile-charcoal placeholder-tile-slate/40 focus:outline-none focus:ring-2 focus:ring-tile-clay focus:border-transparent bg-tile-light"
              />
              <p className="text-xs text-tile-slate/50 mt-1">
                Paste a direct image URL (jpg, png, webp)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn bg-tile-accent hover:bg-tile-charcoal text-white border-none rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <FiSave size={16} />
              )}
              {loading ? "Updating..." : "Update Information"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
