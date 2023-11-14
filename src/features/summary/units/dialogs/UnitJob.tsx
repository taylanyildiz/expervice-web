import { useEffect, useState } from "react";
import { useUnit } from "../helper/unit_helper";
import JobRepository from "@Repo/job_repository";
import Job from "@Models/job/job";
import LoadingComp from "@Components/LoadingComp";
import { Box } from "@mui/material";
import JobStepper from "@Features/summary/jobs/components/JobStepper";

function UnitJob() {
  /// Unit store
  const { unit } = useUnit();
  const jobId = unit?.job?.id;

  /// Job state
  const [job, setJob] = useState<Job | null>();
  const loading = Boolean(!job);

  /// Job repository
  const jobRepo = new JobRepository();

  /// Initialize component
  useEffect(() => {
    if (!jobId) return;
    const getJob = async () => {
      const job = await jobRepo.job(jobId);
      setJob(job);
    };
    getJob();
  }, [jobId]);

  return (
    <Box height={500}>
      <LoadingComp loading={loading}>
        <JobStepper
          job={job!}
          onUpdate={(job) => {
            if (!job) return;
            setJob(job);
          }}
        />
      </LoadingComp>
    </Box>
  );
}

export default UnitJob;
