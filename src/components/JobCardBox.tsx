import Link from "next/link";

interface JobCardBoxProps {
  id: string;
  title: string;
  company_name: string;
  location: string;
  job_type: string;
}

export default function JobCardBox({
  id,
  title,
  company_name,
  location,
  job_type,
}: JobCardBoxProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col h-full">
      <div className="p-6 flex-grow">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          <Link href={`/jobs/${id}`} className="hover:text-blue-600">
            {title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-2">{company_name}</p>
        <p className="text-gray-500 mb-4">{location}</p>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            job_type === "Full-Time"
              ? "bg-green-100 text-green-800"
              : job_type === "Part-Time"
                ? "bg-blue-100 text-blue-800"
                : "bg-purple-100 text-purple-800"
          }`}
        >
          {job_type}
        </span>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <Link
          href={`/jobs/${id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          View details →
        </Link>
      </div>
    </div>
  );
}
