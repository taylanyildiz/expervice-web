import { useEffect, useMemo, useState } from "react";
import { useUnit } from "../helper/unit_helper";
import { Box } from "@mui/material";
import LoadingComp from "@Components/LoadingComp";
import UnitRepository from "@Repo/unit_repository";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import EmptyGrid from "@Components/EmptyGrid";
import UnitJobsFilter from "@Models/units/unit_jobs_filter";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { setUnitJobsFilter } from "@Store/unit_store";
import Job from "@Models/job/job";
import { useJobDialog } from "@Features/summary/jobs/helper/job_helper";
import TranslateHelper from "@Local/index";

function UnitJobs() {
  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Unit store
  const { unitId, jobs, filter } = useUnit();
  const loading = Boolean(!jobs);

  /// Unit repository
  const unitRepo = new UnitRepository();

  /// Pagination mode
  const [paginationMode, setPaginationMode] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  /// Filter
  const jobsFilter: UnitJobsFilter = useMemo(
    () => ({
      limit: paginationMode.pageSize,
      offset: paginationMode.pageSize * paginationMode.page,
    }),
    [paginationMode]
  );

  /// Initialize component
  useEffect(() => {
    dispatch(setUnitJobsFilter(filter));
    unitRepo.jobs();
  }, [unitId, jobsFilter]);

  const columns: GridColDef<Job>[] = [
    {
      field: "id",
      headerName: "ID",
      renderCell: (params) => {
        const { openJobDialog } = useJobDialog();
        return (
          <p
            className="grid-selectable"
            onClick={() => {
              openJobDialog({ id: params.row.id });
            }}
          >
            {params.row.id}
          </p>
        );
      },
    },
    {
      field: "priority",
      align: "left",
      headerName: TranslateHelper.jobPriority(),
      width: 150,
      valueGetter: (params) => {
        const job = params.row;
        const priority = job.priority?.name;
        return priority;
      },
    },
    {
      field: "sub_type",
      align: "left",
      headerName: TranslateHelper.jobSubType(),
      width: 220,
      valueGetter: (params) => {
        const job = params.row;
        const subType = job.sub_type?.name;
        return subType;
      },
    },
    {
      field: "status",
      headerAlign: "left",
      align: "left",
      headerName: TranslateHelper.jobStatus(),
      width: 200,
      valueGetter: (params) => {
        const job = params.row;
        const status = job.status?.name;
        return status;
      },
    },
    {
      field: "job_technicians",
      align: "center",
      headerAlign: "center",
      headerName: TranslateHelper.technicians(),
      minWidth: 100,
      sortable: false,
      valueGetter: (params) => {
        const job = params.row;
        const technicians = job.job_technicians?.length;
        return technicians;
      },
    },
  ];

  return (
    <Box height={400}>
      <LoadingComp loading={loading}>
        <DataGrid
          pagination
          disableColumnMenu
          sortingMode="server"
          paginationMode="server"
          columns={columns}
          rowCount={jobs?.count}
          rows={jobs?.rows ?? []}
          pageSizeOptions={[10, 50, 100]}
          slots={{ noRowsOverlay: EmptyGrid }}
          paginationModel={paginationMode}
          onPaginationModelChange={setPaginationMode}
        />
      </LoadingComp>
    </Box>
  );
}

export default UnitJobs;
