"use client";
import { useState, FormEvent } from "react";
import { JobFormData } from "@/types/job";

type JobFormProps = {
  initialData?: Partial<JobFormData>;
  onSubmit: (data: JobFormData) => Promise<void>;
  isSubmitting: boolean;
  error?: string | null;
  formTitle: string;
  submitButtonText: string;
};

export function JobForm({
  initialData = {},
  onSubmit,
  isSubmitting,
  error,
  formTitle,
  submitButtonText,
}: JobFormProps) {
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    company_name: "",
    description: "",
    location: "",
    job_type: "Full-Time",
    ...initialData,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{formTitle}</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Job Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={3}
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Senior Frontend Developer"
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="company_name"
            className="block text-sm font-medium mb-1"
          >
            Company Name *
          </label>
          <input
            id="company_name"
            name="company_name"
            type="text"
            required
            value={formData.company_name}
            onChange={handleChange}
            placeholder="e.g. Your Company Inc."
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the role, responsibilities, and requirements..."
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location *
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Remote, New York, London"
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="job_type" className="block text-sm font-medium mb-1">
            Job Type *
          </label>
          <select
            id="job_type"
            name="job_type"
            required
            value={formData.job_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              submitButtonText
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
