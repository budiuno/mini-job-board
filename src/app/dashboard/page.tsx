"use client";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";

type Job = {
  id: string;
  title: string;
  company_name: string;
  location: string;
  job_type: string;
  user_id: string;
  created_at: string;
  description?: string;
};

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { user, error } = await getCurrentUser();

      if (error || !user) {
        router.push("/signin");
        return;
      }

      // Check if email is verified
      if (user.email && user.email_confirmed_at === null) {
        router.push(
          `/signin?unverified_email=${encodeURIComponent(user.email)}`
        );
        return;
      }

      setLoading(false);
    };
    checkAuth();
  }, [router]);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { user, error } = await getCurrentUser();
        if (error || !user) {
          router.push("/signin");
          return;
        }

        const { data, error: fetchError } = await supabase
          .from("jobs")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;

        setJobs(data || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : typeof err === "string"
              ? err
              : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const { error } = await supabase.from("jobs").delete().eq("id", id);
      if (error) throw error;
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : "Failed to delete job"
      );
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Job Posts</h1>
        <Link
          href="/dashboard/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Post a Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <p className="text-gray-600 mb-4">You haven't posted any jobs yet.</p>
          <Link
            href="/dashboard/new"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create your first job posting
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {job.title}
                  </h2>
                  <p className="text-gray-600 mt-1">{job.company_name}</p>
                  <p className="text-gray-600 mt-1">{job.location}</p>
                  <span
                    className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.job_type === "Full-Time"
                        ? "bg-green-100 text-green-800"
                        : job.job_type === "Part-Time"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {job.job_type}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <Link
                    href={`/dashboard/edit/${job.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
