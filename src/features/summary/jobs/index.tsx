import JobsTable from "./components/JobsTable";
import "../../../assets/css/jobs.css";
import GridTableHeader from "@Components/GridTableHeader";
import { useJob, useJobDialog } from "./helper/job_helper";
import { useEffect } from "react";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { useQuery } from "@Utils/functions";
import {
  setJobDialogStatus,
  setJobId,
  setJobsFilterDrawerStatus,
} from "@Store/job_store";
import { useAccount } from "../company/helper/company_helper";
import TranslateHelper from "@Local/index";
import JobsFilterDrawer from "./components/JobsFilterDrawer";

function JobsPage() {
  /// Account store
  const { isInternal, isOwner } = useAccount();
  /// Job dialog hook
  const { openJobDialog, closeDialog, openUnitDialog } = useJobDialog();
  /// Query hook
  const [path, deletePath, setPath] = useQuery();

  /// Job store
  const { jobId, filterCount } = useJob();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Initialize component
  useEffect(() => {
    const id = parseInt(`${path.get("jobId")}`);

    dispatch(setJobId(null));
    dispatch(setJobDialogStatus(false));
    if (!id || isNaN(id)) deletePath("unitId");
    if (id || !isNaN(id)) dispatch(setJobId(id));
  }, []);

  /// Listen job id
  useEffect(() => {
    if (jobId) {
      setPath("jobId", jobId.toString());
      return openJobDialog();
    }
    deletePath("jobId");
    closeDialog();
    dispatch(setJobDialogStatus(false));
  }, [jobId]);

  return (
    <div className="jobs-layout">
      <GridTableHeader
        visibilityAdd={isInternal || isOwner}
        title={TranslateHelper.jobs()}
        onAdd={() => {
          openUnitDialog();
        }}
        onFilter={() => {
          dispatch(setJobsFilterDrawerStatus(true));
        }}
        onExport={() => {}}
        filterCount={filterCount}
      />
      <JobsTable />
      <JobsFilterDrawer />
    </div>
  );
}

export default JobsPage;
