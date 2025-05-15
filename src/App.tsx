import React, { useEffect, useState } from "react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://jobicy.com/api/v2/remote-jobs")
      .then((res) => setJobs(res.data.jobs))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const title = job.jobTitle || "";
    const types = job.jobType ? job.jobType.map((t) => t.toLowerCase()) : [];
    const location = job.jobGeo || "";

    const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "All" || types.includes(category.toLowerCase());
    const matchesLocation =
      locationFilter === "" ||
      location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-md border-b border-blue-200 p-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700">
          Remote Job Board
        </h1>
        <p className="text-sm text-blue-500 text-center sm:text-left">
          Find your next remote opportunity easily
        </p>
      </header>

      {/* Filter Bar */}
      <section className="sticky top-[85px] z-30 bg-white border border-blue-200 p-4 sm:p-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 rounded-lg shadow-md mt-6 mb-6 ">
        <Input
          type="text"
          placeholder="Search by job title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-blue-300 focus:border-blue-600 focus:ring-blue-600 text-base rounded-md shadow-sm"
          aria-label="Search jobs by title"
        />

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full rounded-md border border-blue-300 shadow-sm text-base focus:ring-2 focus:ring-blue-600">
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="full-time">Full-Time</SelectItem>
            <SelectItem value="part-time">Part-Time</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Filter by location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border-blue-300 focus:border-blue-600 focus:ring-blue-600 text-base rounded-md shadow-sm"
          aria-label="Filter jobs by location"
        />
      </section>

      {/* Responsive Divider */}
      <hr className="max-w-7xl mx-auto border-t border-blue-200 mb-6" />

      {/* Jobs Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredJobs.length === 0 && (
            <p className="text-center text-blue-400 col-span-full mt-12 text-lg font-medium italic">
              No jobs found matching your criteria.
            </p>
          )}

          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              layout
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 28px rgba(59, 130, 246, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <Card className="flex flex-col justify-between h-full border border-blue-200 rounded-xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    {job.companyLogo ? (
                      <img
                        src={job.companyLogo}
                        alt={`${job.companyName} logo`}
                        className="w-16 h-16 object-contain rounded-md border border-blue-100 shadow-sm"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-blue-100 rounded-md flex items-center justify-center text-blue-400 text-sm font-medium">
                        No Logo
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-xl font-semibold text-blue-800 break-words">
                        {job.jobTitle || "No Title"}
                      </CardTitle>
                      <CardDescription className="text-sm text-blue-600 font-medium">
                        {job.companyName || "Unknown Company"} —{" "}
                        {job.jobGeo || "Remote"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-700 line-clamp-4 leading-relaxed text-base">
                    {(job.jobDescription || "No description available")
                      .replace(/<[^>]*>?/gm, "")
                      .slice(0, 180)}
                    ...
                  </p>
                </CardContent>

                <CardFooter className="flex justify-center mt-4">
                  <Dialog>
                    <DialogTrigger className="inline-block px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
                      View Details
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl w-full p-6 rounded-xl shadow-lg bg-white">
                      <DialogHeader>
                        <DialogTitle className="text-3xl font-bold text-blue-900">
                          {job.jobTitle}
                        </DialogTitle>
                      </DialogHeader>

                      <DialogDescription className="mt-4 text-gray-800 text-base leading-relaxed space-y-4 prose max-w-none">
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              job.jobExcerpt || "<p>No additional info</p>",
                          }}
                        />

                        <div className="space-y-2 text-sm font-medium">
                          <p>
                            <strong>Company:</strong> {job.companyName || "N/A"}
                          </p>
                          <p>
                            <strong>Location:</strong> {job.jobGeo || "Remote"}
                          </p>
                          <p>
                            <strong>Type:</strong>{" "}
                            {job.jobType ? job.jobType.join(", ") : "N/A"}
                          </p>
                          <p>
                            <strong>Published:</strong> {job.pubDate || "N/A"}
                          </p>
                        </div>

                        <div className="mt-6 text-center">
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition"
                          >
                            Apply Now
                          </a>
                        </div>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 bg-blue-50 border-t border-blue-200 text-center text-blue-600 font-semibold text-sm">
        © {new Date().getFullYear()} Remote Job Board. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
