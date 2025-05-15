import axios from "axios";

export const fetchJobs = async () => {
  const res = await axios.get("https://jobicy.com/api/v2/remote-jobs");
  return res.data.jobs;
};
