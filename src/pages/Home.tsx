import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import { fetchJobs } from "../services/jobService";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    fetchJobs().then(setJobs).catch(console.error);
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const title = job.jobTitle?.toLowerCase() || "";
    const types = job.jobType?.map((t) => t.toLowerCase()) || [];
    const location = job.jobGeo?.toLowerCase() || "";
    return (
      title.includes(search.toLowerCase()) &&
      (category === "All" || types.includes(category.toLowerCase())) &&
      location.includes(locationFilter.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <Header />
      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
      />
      <hr className="max-w-7xl mx-auto border-t border-blue-200 mb-6" />
      <main className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
        <AnimatePresence>
          {filteredJobs.length === 0 ? (
            <p className="text-center text-blue-400 col-span-full mt-12 text-lg italic">
              No jobs found.
            </p>
          ) : (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
