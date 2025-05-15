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
      <header className="sticky top-0 z-40 bg-white shadow-md border-b border-blue-200 p-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 rounded-b-lg">
        <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
          Remote Job Board
        </h1>
        <p className="text-sm text-blue-500">
          Find your next remote opportunity easily
        </p>
      </header>

      {/* Filter Bar */}
      <section className="sticky top-[80px] z-30 bg-white border border-blue-200 p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 rounded-lg shadow-lg my-8">
        <Input
          type="text"
          placeholder="Search by job title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-blue-300 focus:border-blue-600 focus:ring-blue-600 rounded-md shadow-md text-base placeholder-blue-400"
          aria-label="Search jobs by title"
        />

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full rounded-md border border-blue-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-base">
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="full-time">Full-Time</SelectItem>
            <SelectItem value="part-time">Part-Time</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="freelance">Freelance</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Filter by location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border-blue-300 focus:border-blue-600 focus:ring-blue-600 rounded-md shadow-md text-base placeholder-blue-400"
          aria-label="Filter jobs by location"
        />
      </section>

      {/* Jobs Grid */}
      <main className="max-w-7xl mx-auto p-6 grid gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                scale: 1.04,
                boxShadow: "0 20px 35px rgba(59, 130, 246, 0.3)",
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-xl"
            >
              <Card className="flex flex-col justify-between h-full border border-blue-200 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-5 mb-5">
                    {job.companyLogo ? (
                      <img
                        src={job.companyLogo}
                        alt={`${job.companyName} logo`}
                        className="w-20 h-20 object-contain rounded-md border border-blue-100 shadow-sm"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-blue-50 rounded-md flex items-center justify-center text-blue-300 text-sm font-semibold select-none">
                        No Logo
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-2xl font-bold text-blue-800">
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
                  <p className="text-gray-700 line-clamp-5 leading-relaxed text-base font-normal">
                    {(job.jobDescription || "No description available")
                      .replace(/<[^>]*>?/gm, "")
                      .slice(0, 180)}{" "}
                    ...
                  </p>
                </CardContent>

                <CardFooter className="flex justify-center">
                  <Dialog>
                    <DialogTrigger
                      className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md"
                      aria-label={`View details for ${job.jobTitle}`}
                    >
                      View Details
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-8 rounded-xl shadow-2xl bg-white">
                      <DialogHeader>
                        <DialogTitle className="text-4xl font-extrabold text-blue-900 tracking-tight">
                          {job.jobTitle}
                        </DialogTitle>
                      </DialogHeader>

                      <DialogDescription className="mt-6 text-gray-900 text-base space-y-6 prose prose-blue max-w-none font-medium">
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              job.jobExcerpt || "<p>No additional info</p>",
                          }}
                        />

                        <div className="space-y-3 text-gray-700 text-sm font-semibold">
                          <p>
                            <span className="font-bold">Company:</span>{" "}
                            {job.companyName || "N/A"}
                          </p>
                          <p>
                            <span className="font-bold">Location:</span>{" "}
                            {job.jobGeo || "Remote"}
                          </p>
                          <p>
                            <span className="font-bold">Type:</span>{" "}
                            {job.jobType ? job.jobType.join(", ") : "N/A"}
                          </p>
                          <p>
                            <span className="font-bold">Published Date:</span>{" "}
                            {job.pubDate || "N/A"}
                          </p>
                        </div>

                        <div className="mt-10 text-center">
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-10 py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition shadow-lg"
                            aria-label={`Apply for ${job.jobTitle}`}
                          >
                            Apply Here
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
