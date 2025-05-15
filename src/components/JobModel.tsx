export default function JobModal({ job, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg relative max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
        <p className="text-sm text-gray-600">{job.companyName} • {job.location}</p>
        <p className="mt-4 text-sm">{job.description}</p>

        <div className="mt-4 text-sm space-y-1">
          <p><strong>Job Level:</strong> {job.jobLevel}</p>
          <p><strong>Type:</strong> {job.jobType}</p>
          <p><strong>Salary:</strong> {job.salary || 'Not mentioned'}</p>
          <p><strong>Published:</strong> {new Date(job.posted).toDateString()}</p>
        </div>

        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Apply
        </a>
      </div>
    </div>
  )
}
