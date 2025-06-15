"use client"; // Add this at the top for client-side interactivity

import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import JobCardBox from "@/components/JobCardBox";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<any>(null);
  const [relatedJobs, setRelatedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the main job
        const { data: jobData, error: jobError } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", id)
          .single();

        if (jobError || !jobData) {
          notFound();
        }

        setJob(jobData);

        // Fetch related jobs
        const { data: relatedJobsData } = await supabase
          .from("jobs")
          .select("*")
          .eq("company_name", jobData.company_name)
          .neq("id", jobData.id)
          .order("created_at", { ascending: false })
          .limit(3);

        setRelatedJobs(relatedJobsData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!job) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Main Job Details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>

          <div className="flex items-center text-gray-600 mb-4">
            <span className="mr-4 font-medium">{job.company_name}</span>
            <span className="mr-4">•</span>
            <span>{job.location}</span>
          </div>

          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              job.job_type === "Full-Time"
                ? "bg-green-100 text-green-800"
                : job.job_type === "Part-Time"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-purple-100 text-purple-800"
            } mb-6`}
          >
            {job.job_type}
          </span>

          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-3">Job Description</h2>
            <p className="whitespace-pre-line">{job.description}</p>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Back to Jobs
          </button>
        </div>
      </div>

      {/* Related Jobs */}
      {relatedJobs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Other jobs at {job.company_name}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedJobs.map((job) => (
              <JobCardBox
                key={job.id}
                id={job.id}
                title={job.title}
                company_name={job.company_name}
                location={job.location}
                job_type={job.job_type}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 animate-pulse">
        <div className="p-6">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex space-x-4 mb-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-1/6 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
