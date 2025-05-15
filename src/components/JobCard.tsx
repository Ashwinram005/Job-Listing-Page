export default function JobCard({ job, onViewDetails }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-gray-600">{job.companyName} - {job.location}</p>
      <p className="text-sm text-gray-500 line-clamp-3 mt-2">{job.description}</p>
      <button
        onClick={onViewDetails}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        View Details
      </button>
    </div>
  )
}
