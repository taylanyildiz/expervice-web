import EmptyGrid from "@Components/EmptyGrid";
import TechnicianRepository from "@Repo/technician_repository";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { useTechnician } from "../helper/technician_helper";
import technicianJobsColumns from "../entities/technician_jobs_column";
import TechnicianJobsFilter from "../entities/technician_jobs_filter";
import { useDispatch } from "react-redux";
import { setTechnicianJobsFilter } from "@Store/technician_store";
import { GridExportButton } from "@Components/index";

function TechnicianJobs() {
  /// technician store
  const {
    technicianJobs: { rows, count },
    technician,
  } = useTechnician();

  /// Dispatch
  const dispatch = useDispatch();

  /// Loading state
  const [loading, setLoading] = useState(true);

  /// Technician repository
  const technicianRepo = new TechnicianRepository();

  /// Pagination mode state
  const [paginationMode, setPaginationMode] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  /// Technician jobs filter
  const filter = useMemo<TechnicianJobsFilter>(
    () => ({
      limit: paginationMode.pageSize,
      offset: paginationMode.page * paginationMode.pageSize,
    }),
    [paginationMode]
  );

  /// Initialize component
  useEffect(() => {
    if (!technician) return;
    dispatch(setTechnicianJobsFilter(filter));
    technicianRepo.getTechnicianJobs(technician!.id!).then((value) => {
      setLoading(!value);
    });
  }, [filter]);

  return (
    <Stack spacing={1} divider={<Divider />}>
      <Typography variant="h1" fontSize={14} children="Technician Jobs" />
      <Box height={400}>
        <DataGrid
          loading={loading}
          columns={technicianJobsColumns()}
          disableColumnMenu
          rows={rows}
          rowCount={count}
          sortingMode="server"
          paginationMode="server"
          pageSizeOptions={[10, 50, 100]}
          slots={{ noRowsOverlay: EmptyGrid, toolbar: GridExportButton }}
          paginationModel={paginationMode}
          onPaginationModelChange={setPaginationMode}
        />
      </Box>
    </Stack>
  );
}

export default TechnicianJobs;
