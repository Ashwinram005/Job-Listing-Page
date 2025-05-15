import type { Job } from '@/App';
import React from 'react';

interface JobDetailsModalProps {
  job: Job;
  onClose: () => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close"
        >
          &#x2715;
        </button>
        <h2 className="text-xl font-bold mb-4">{job.title}</h2>
        <p className="mb-4 whitespace-pre-wrap">{job.description}</p>
        <ul className="mb-4 space-y-1 text-sm text-gray-700">
          <li><strong>Company:</strong> {job.company}</li>
          <li><strong>Job Level:</strong> {job.level}</li>
          <li><strong>Location:</strong> {job.location}</li>
          <li><strong>Type:</strong> {job.type}</li>
          <li><strong>Salary:</strong> {job.salary ?? 'N/A'}</li>
          <li><strong>Published Date:</strong> {job.published_at}</li>
        </ul>
        <a
          href={job.apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply Here
        </a>
      </div>
    </div>
  );
};

export default JobDetailsModal;
