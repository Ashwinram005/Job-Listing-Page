import type { Job } from '@/App';
import React from 'react';

interface JobListProps {
  jobs: Job[];  // expects array of jobs
  onViewDetails: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs = [], onViewDetails }) => {
  // Show message if no jobs are available
  if (!jobs.length) {
    return (
      <p className="p-6 text-center text-gray-500">
        No jobs available.
      </p>
    );
  }

  return (
    <main className="flex-grow p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <div key={job.id} className="bg-white rounded shadow p-4 flex flex-col">
          <h3 className="font-semibold mb-2">{job.title}</h3>
          <p className="text-sm text-gray-500 mb-4">{job.company} — {job.location}</p>
          <p className="text-sm text-gray-700 flex-grow overflow-hidden line-clamp-3">
            {job.description}
          </p>
          <button
            onClick={() => onViewDetails(job)}
            className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            View Details
          </button>
        </div>
      ))}
    </main>
  );
};

export default JobList;
