import { supabase } from "@/lib/supabase/client";
import JobCard from "@/components/JobCard";
import Filters from "@/components/Filters";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filters = {
    location: Array.isArray(searchParams.location)
      ? searchParams.location[0]
      : searchParams.location,
    job_type: Array.isArray(searchParams.job_type)
      ? searchParams.job_type[0]
      : searchParams.job_type,
  };

  let query = supabase.from("jobs").select("*");

  if (filters.location) {
    query = query.ilike("location", `%${filters.location}%`);
  }

  if (filters.job_type) {
    query = query.eq("job_type", filters.job_type);
  }

  const { data: jobs } = await query.order("created_at", { ascending: false });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Browse Jobs</h1>
      <Filters />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs?.map((job) => <JobCard key={job.id} job={job} />)}
      </div>
    </div>
  );
}
