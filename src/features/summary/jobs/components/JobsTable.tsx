import EmptyGrid from "@Components/EmptyGrid";
import { DataGrid } from "@mui/x-data-grid";
import columns from "../entities/grid_columns";
import { useEffect } from "react";
import { useJob } from "../helper/job_helper";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { setJobFilter } from "@Store/job_store";
import JobRepository from "@Repo/job_repository";

function JobsTable() {
  /// Job store
  const {
    layzLoading,
    jobs: { rows, count },
    jobFilter,
  } = useJob();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Job repository
  const jobRepo = new JobRepository();

  /// Initialize component
  useEffect(() => {
    jobRepo.getJobs();
  }, [jobFilter]);

  return (
    <div className="jobs-grid">
      <DataGrid
        loading={layzLoading}
        pagination
        disableColumnMenu
        sortingMode="server"
        paginationMode="server"
        columns={columns()}
        rowCount={count}
        rows={rows}
        pageSizeOptions={[10, 50, 100]}
        slots={{ noRowsOverlay: EmptyGrid }}
        paginationModel={{
          page: jobFilter.page ?? 0,
          pageSize: jobFilter.limit ?? 10,
        }}
        onPaginationModelChange={(paginationMode) => {
          const page = paginationMode.page;
          dispatch(
            setJobFilter({
              ...jobFilter,
              page: page,
              limit: paginationMode.pageSize,
              offset: paginationMode.pageSize * paginationMode.page,
            })
          );
        }}
      />
    </div>
  );
}

export default JobsTable;
