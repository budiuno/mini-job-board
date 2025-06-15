"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [jobType, setJobType] = useState(searchParams.get("job_type") || "");

  // Debounce the location input
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (location) {
        params.set("location", location);
      } else {
        params.delete("location");
      }

      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [location, router, pathname, searchParams]);

  // Immediate update for job type
  const handleJobTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setJobType(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("job_type", value);
    } else {
      params.delete("job_type");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-lg font-medium mb-3">Filters</h2>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Filter by location..."
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="job_type" className="block text-sm font-medium mb-1">
            Job Type
          </label>
          <select
            id="job_type"
            value={jobType}
            onChange={handleJobTypeChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">All Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
      </div>
    </div>
  );
}
