"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { getCurrentUser } from "@/lib/supabase/auth";
import { JobForm } from "@/components/JobForm";
import { useState } from "react";
import { JobFormData } from "@/types/job";

export default function NewJobPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: JobFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const { user, error } = await getCurrentUser();
      if (!user) throw new Error("You must be logged in");
      if (error || !user) {
        router.push("/signin");
        return;
      }

      const submit = await supabase
        .from("jobs")
        .insert([{ ...data, user_id: user.id }]);

      if (submit.error) throw error;
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create job");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <JobForm
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
      formTitle="Post a New Job"
      submitButtonText="Post Job"
    />
  );
}
