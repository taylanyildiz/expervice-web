import EmptyGrid from "@Components/EmptyGrid";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import columns from "../entities/grid_columns";
import { useEffect, useMemo, useState } from "react";
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
  } = useJob();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Job repository
  const jobRepo = new JobRepository();

  /// Pagination mode
  const [paginationMode, setPaginationMode] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  /// Filter
  const filter: JobFilter = useMemo(
    () => ({
      limit: paginationMode.pageSize,
      offset: paginationMode.pageSize * paginationMode.page,
    }),
    [paginationMode]
  );

  /// Initialize component
  useEffect(() => {
    dispatch(setJobFilter(filter));
    jobRepo.getJobs();
  }, [filter]);

  return (
    <div className="jobs-grid">
      <DataGrid
        loading={layzLoading}
        pagination
        disableColumnMenu
        sortingMode="server"
        paginationMode="server"
        columns={columns}
        rowCount={count}
        rows={rows}
        pageSizeOptions={[10, 50, 100]}
        slots={{ noRowsOverlay: EmptyGrid }}
        paginationModel={paginationMode}
        onPaginationModelChange={setPaginationMode}
      />
    </div>
  );
}

export default JobsTable;
