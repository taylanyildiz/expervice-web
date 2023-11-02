import JobsTable from "./components/JobsTable";
import "../../../assets/css/jobs.css";
import GridTableHeader from "@Components/GridTableHeader";
import { useJob, useJobDialog } from "./helper/job_helper";
import { useEffect } from "react";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { useQuery } from "@Utils/functions";
import { setJobId } from "@Store/job_store";

function JobsPage() {
  /// Job dialog hook
  const { openDialog, closeDialog, openUnitDialog } = useJobDialog();
  /// Query hook
  const [path, deletePath, setPath] = useQuery();

  /// Job store
  const { jobId } = useJob();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Initialize component
  useEffect(() => {
    const id = parseInt(`${path.get("jobId")}`);
    if (!id || isNaN(id)) {
      deletePath("unitId");
      dispatch(setJobId(null));
    }
    if (id || !isNaN(id)) {
      dispatch(setJobId(id));
    }
  }, []);

  /// Listen job id
  useEffect(() => {
    if (jobId) {
      setPath("jobId", jobId.toString());
      return openDialog();
    }
    deletePath("jobId");
    closeDialog();
  }, [jobId]);

  return (
    <div className="jobs-layout">
      <GridTableHeader
        title="Jobs"
        onAdd={() => {
          openUnitDialog();
        }}
        onFilter={() => {}}
        onExport={() => {}}
      />
      <JobsTable />
    </div>
  );
}

export default JobsPage;
