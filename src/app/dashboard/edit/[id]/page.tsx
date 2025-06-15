"use client";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { getCurrentUser } from "@/lib/supabase/auth";
import { JobForm } from "@/components/JobForm";
import { useEffect, useState } from "react";
import { JobFormData } from "@/types/job";

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialData, setInitialData] = useState<JobFormData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Job not found");

        setInitialData({
          title: data.title,
          company_name: data.company_name,
          description: data.description || "",
          location: data.location,
          job_type: data.job_type as JobFormData["job_type"],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (data: JobFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase.from("jobs").update(data).eq("id", id);

      if (error) throw error;
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update job");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (!initialData)
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <p className="text-red-500">{error || "Job not found"}</p>
      </div>
    );

  return (
    <JobForm
      initialData={initialData}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
      formTitle="Edit Job"
      submitButtonText="Update Job"
    />
  );
}
