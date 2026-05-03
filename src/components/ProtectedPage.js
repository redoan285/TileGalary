"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/auth/login?redirect=" + window.location.pathname);
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tile-light">
        <div className="text-center">
          <div className="loader mx-auto mb-4" />
          <p className="text-tile-slate text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return <>{children}</>;
}
