import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import JobDetailsDialog from "./JobDetailsDialog";

function JobCard({ job }) {
  return (
    <motion.div
      key={job.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      layout
      whileHover={{ scale: 1.03, boxShadow: "0 12px 28px rgba(59, 130, 246, 0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <Card className="flex flex-col justify-between h-full border border-blue-200 rounded-xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center space-x-4 mb-4">
            {job.companyLogo ? (
              <img src={job.companyLogo} alt={`${job.companyName} logo`} className="w-16 h-16 object-contain" />
            ) : (
              <div className="w-16 h-16 bg-blue-100 flex items-center justify-center text-blue-400">No Logo</div>
            )}
            <div>
              <CardTitle>{job.jobTitle || "No Title"}</CardTitle>
              <CardDescription>
                {job.companyName || "Unknown"} — {job.jobGeo || "Remote"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-4">{(job.jobDescription || "").replace(/<[^>]*>?/gm, "").slice(0, 180)}...</p>
        </CardContent>
        <CardFooter className="flex justify-center mt-4">
          <JobDetailsDialog job={job} />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
export default JobCard;
