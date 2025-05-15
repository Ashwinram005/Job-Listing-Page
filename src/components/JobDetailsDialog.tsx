import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function JobDetailsDialog({ job }) {
  return (
    <Dialog>
      <DialogTrigger className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        View Details
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{job.jobTitle}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4">
          <div
            dangerouslySetInnerHTML={{
              __html: job.jobExcerpt || "<p>No additional info</p>",
            }}
          />
          <div>
            <p>
              <strong>Company:</strong> {job.companyName}
            </p>
            <p>
              <strong>Location:</strong> {job.jobGeo}
            </p>
            <p>
              <strong>Type:</strong> {job.jobType?.join(", ")}
            </p>
            <p>
              <strong>Published:</strong> {job.pubDate}
            </p>
          </div>
          <div className="text-center mt-4">
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
            >
              Apply Now
            </a>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
export default JobDetailsDialog;
