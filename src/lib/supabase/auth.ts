import { supabase } from "./client";

export const signUp = async (
  email: string,
  password: string,
  fullName: string
) => {
  // First sign up the user with email/password
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  return {
    data,
    error,
    requiresVerification: !error && !data.session,
  };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Handle email not verified case
    if (error.message.includes("Email not confirmed")) {
      return { error: new Error("Email not confirmed") };
    }
    return { error };
  }

  // Double check if user is actually authenticated
  if (!data.session) {
    return { error: new Error("Email verification required") };
  }
  return { data };
};

export const signOut = async () => {
  // Clear session regardless of verification status
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign out error:", error);
    throw error;
  }
  // Force reload to clear all client-side state
  window.location.href = "/signin";
};

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return { user, error };
};
