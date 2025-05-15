import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import Filters from "../components/Filters";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch("https://remoteok.com/api")
      .then((res) => res.json())
      .then((data) => setJobs(data.slice(1))) // first element is metadata
      .catch(console.error);
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.position?.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "" || job.tags?.includes(filter))
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Job Listings</h1>
      <Filters search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
      <div className="space-y-4">
        {filteredJobs.length ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} expandedId={expandedId} setExpandedId={setExpandedId} />
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
