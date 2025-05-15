import { useEffect, useState } from "react"
import JobCard from "./components/JobCard"
import JobModal from "./components/JobModel"

export default function App() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [selectedJob, setSelectedJob] = useState(null)

useEffect(() => {
  async function fetchJobs() {
    try {
      const res = await fetch("https://jobicy.com/api/v2/remote-jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      console.log("Full API Response:", data.jobs);  // <---- check this output in console

      if (Array.isArray(data.jobs)) {
        setJobs(data.jobs.filter(job => job?.title && job?.jobType));
      } else {
        console.error("jobs is not an array:", data.jobs);
        setJobs([]);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
  fetchJobs();
}, []);

  const filteredJobs = jobs.filter(job => {
  if (!job?.title || !job?.jobType) return false;
  return (
    job.title.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All" || job.jobType === filter)
  )
})

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Remote Job Listings</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search by job title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-1/2"
        />

        <select
          className="px-4 py-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} onViewDetails={() => setSelectedJob(job)} />
          ))}
        </div>
      )}

      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  )
}
