import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default async function Home() {
  // Fetch featured jobs (example query - adjust as needed)
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse the latest job postings from top companies
        </p>
      </div>

      {/* Featured Jobs Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Jobs</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs?.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col h-full"
            >
              <div className="p-6 flex-grow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="hover:text-blue-600"
                  >
                    {job.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-2">{job.company_name}</p>
                <p className="text-gray-500 mb-4">{job.location}</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <Link
                  href={`/jobs/${job.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Link
          href="/jobs"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Browse All Jobs
        </Link>
      </div>
    </div>
  );
}
