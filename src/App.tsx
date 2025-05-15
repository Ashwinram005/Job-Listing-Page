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

  // Normalize category for filtering
  // The API seems to use jobType as an array like ['full-time', 'remote']
  const filteredJobs = jobs.filter((job) => {
    const title = job.jobTitle || "";
    const types = job.jobType ? job.jobType.map((t) => t.toLowerCase()) : [];
    const location = job.jobGeo || "";

    const matchesSearch = title.toLowerCase().includes(search.toLowerCase());

    // Category filter: 'All', 'full-time', 'part-time', 'remote'
    // If category is "All", accept all, else check if types array includes selected category
    const matchesCategory =
      category === "All" || types.includes(category.toLowerCase());

    const matchesLocation =
      locationFilter === "" ||
      location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-20 bg-white shadow-sm border-b border-gray-200 p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 rounded-b-md">
        <Input
          type="text"
          placeholder="Search by job title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-md shadow-sm"
        />

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600">
            <SelectValue placeholder="Select category" />
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
          className="border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-md shadow-sm"
        />
      </div>

      {/* Jobs Grid */}
      <main className="max-w-7xl mx-auto p-6 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredJobs.length === 0 && (
            <p className="text-center text-gray-500 col-span-full mt-12">
              No jobs found matching your criteria.
            </p>
          )}

          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              layout
            >
              <Card className="flex flex-col justify-between h-full shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-3">
                    {job.companyLogo ? (
                      <img
                        src={job.companyLogo}
                        alt={`${job.companyName} logo`}
                        className="w-14 h-14 object-contain rounded-md border border-gray-300"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-sm">
                        No Logo
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {job.jobTitle || "No Title"}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {job.companyName || "Unknown Company"} —{" "}
                        {job.jobGeo || "Remote"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-700 line-clamp-5 leading-relaxed">
                    {(job.jobDescription || "No description available")
                      .replace(/<[^>]*>?/gm, "")
                      .slice(0, 180)}{" "}
                    ...
                  </p>
                </CardContent>

                <CardFooter className="flex justify-center">
                  <Dialog>
                    <DialogTrigger className="inline-block px-8 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                      View Details
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-8 rounded-xl shadow-xl bg-white">
                      <DialogHeader>
                        <DialogTitle className="text-3xl font-bold text-gray-900">
                          {job.jobTitle}
                        </DialogTitle>
                      </DialogHeader>

                      <DialogDescription className="mt-6 text-gray-800 text-base space-y-5 prose prose-blue max-w-none">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: job.jobExcerpt || "",
                          }}
                        />

                        <div className="space-y-2 text-gray-700 text-sm font-medium">
                          <p>
                            <span className="font-semibold">Company:</span>{" "}
                            {job.companyName || "N/A"}
                          </p>
                          <p>
                            <span className="font-semibold">Location:</span>{" "}
                            {job.jobGeo || "Remote"}
                          </p>
                          <p>
                            <span className="font-semibold">Type:</span>{" "}
                            {job.jobType ? job.jobType.join(", ") : "N/A"}
                          </p>
                          <p>
                            <span className="font-semibold">
                              Published Date:
                            </span>{" "}
                            {job.pubDate || "N/A"}
                          </p>
                        </div>

                        <div className="mt-8 text-center">
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
    </div>
  );
}

export default App;
