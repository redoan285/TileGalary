"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEdit2, FiMail, FiUser, FiCalendar } from "react-icons/fi";

export default function MyProfileClient() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/auth/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tile-light">
        <div className="loader mx-auto" />
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Member";

  return (
    <div className="min-h-screen bg-tile-light py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl border border-tile-sand overflow-hidden shadow-sm">
          {/* Cover */}
          <div className="h-36 bg-gradient-to-r from-tile-charcoal via-amber-950 to-tile-accent relative">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, rgba(196,149,106,0.3) 0px, rgba(196,149,106,0.3) 1px, transparent 1px, transparent 12px)`,
              }}
            />
          </div>

          {/* Avatar + Edit */}
          <div className="px-8 pb-8">
            <div className="flex items-end justify-between -mt-14 mb-6">
              <div className="relative">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={96}
                    height={96}
                    className="rounded-2xl border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl border-4 border-white bg-tile-clay flex items-center justify-center shadow-md">
                    <span className="text-white font-display text-3xl font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <Link
                href="/my-profile/update"
                className="btn btn-sm bg-tile-accent hover:bg-tile-charcoal text-white border-none rounded-xl flex items-center gap-2 font-medium"
              >
                <FiEdit2 size={14} /> Update Info
              </Link>
            </div>

            {/* User info */}
            <h1 className="font-display text-2xl font-bold text-tile-charcoal mb-1">
              {user.name}
            </h1>

            <div className="space-y-3 mt-6">
              <InfoRow icon={<FiMail size={16} />} label="Email" value={user.email} />
              <InfoRow
                icon={<FiUser size={16} />}
                label="Name"
                value={user.name}
              />
              <InfoRow
                icon={<FiCalendar size={16} />}
                label="Member Since"
                value={joinedDate}
              />
            </div>

            {/* Image URL display */}
            {user.image && (
              <div className="mt-6 p-4 bg-tile-cream rounded-xl border border-tile-sand">
                <p className="text-xs text-tile-slate/60 uppercase tracking-wider mb-1">
                  Profile Image URL
                </p>
                <p className="text-xs text-tile-slate break-all font-mono">
                  {user.image}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-tile-sand last:border-0">
      <div className="text-tile-clay">{icon}</div>
      <div>
        <p className="text-xs text-tile-slate/60 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-medium text-tile-charcoal">{value}</p>
      </div>
    </div>
  );
}
