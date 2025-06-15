"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, getCurrentUser } from "@/lib/supabase/auth";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Fetch user immediately
    const fetchUser = async () => {
      const { user } = await getCurrentUser();
      setUser(user);
    };
    fetchUser();

    // Add auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-secondary-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
        >
          Mini Job Board
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/jobs"
            className={`${pathname === "/jobs" ? "text-primary-600" : "text-secondary-600"} hover:text-primary-700 transition-colors`}
          >
            Browse Jobs
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`${pathname === "/dashboard" ? "text-primary-600" : "text-secondary-600"} hover:text-primary-700 transition-colors`}
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="text-secondary-600 hover:text-primary-700 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className={`${pathname === "/signin" ? "text-primary-600" : "text-secondary-600"} hover:text-primary-700 transition-colors`}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className={`${pathname === "/signup" ? "text-primary-600" : "text-secondary-600"} hover:text-primary-700 transition-colors`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
