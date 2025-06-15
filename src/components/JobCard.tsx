import Link from "next/link";

export default function JobCard({ job }: { job: any }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-200">
      <h2 className="text-xl font-bold mb-2 text-primary-900">
        <Link
          href={`/jobs/${job.id}`}
          className="hover:text-primary-600 transition-colors"
        >
          {job.title}
        </Link>
      </h2>
      <p className="text-secondary-600 mb-2">{job.company_name}</p>
      <p className="text-secondary-600 mb-2">{job.location}</p>
      <span
        className={`inline-block ${
          job.job_type === "Full-Time"
            ? "bg-green-100 text-green-800"
            : job.job_type === "Part-Time"
              ? "bg-blue-100 text-blue-800"
              : "bg-purple-100 text-purple-800"
        }text-xs px-2 py-1 rounded-full`}
      >
        {job.job_type}
      </span>
      <p className="mt-4 text-secondary-700 line-clamp-2">{job.description}</p>
      <Link
        href={`/jobs/${job.id}`}
        className="mt-4 inline-block text-primary-600 hover:text-primary-700 transition-colors font-medium"
      >
        View Details →
      </Link>
    </div>
  );
}
