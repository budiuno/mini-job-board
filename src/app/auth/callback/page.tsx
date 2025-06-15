"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        // Check if email is verified
        console.log("session", JSON.stringify(session, null, 2));
        if (session?.user?.email_confirmed_at) {
          router.push("/dashboard");
        } else {
          await supabase.auth.signOut();
          if (session?.user?.email) {
            // Added email check
            router.push(
              `/signin?unverified_email=${encodeURIComponent(session.user.email)}`
            );
          } else {
            router.push("/signin");
          }
        }
      }
    });
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Verifying your session...</p>
      </div>
    </div>
  );
}
