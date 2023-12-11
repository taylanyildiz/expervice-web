import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import columns from "../entities/grid_columns";
import { useTechnician } from "../helper/technician_helper";
import EmptyGrid from "@Components/EmptyGrid";
import { useEffect, useMemo, useState } from "react";
import TechnicianFilter from "@Models/technician-user/technician_filter";
import TechnicianRepository from "@Repo/technician_repository";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { setFilter } from "@Store/technician_store";

function TechnicianUsersTable() {
  /// Technician store
  const {
    layzLoading,
    technicians: { rows, count },
  } = useTechnician();

  /// Technician repository
  const technicianRepo = new TechnicianRepository();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Pagination mode state
  const [paginationMode, setPaginationMode] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  /// Technician filter
  const filter = useMemo<TechnicianFilter>(
    () => ({
      limit: paginationMode.pageSize,
      offset: paginationMode.page * paginationMode.pageSize,
    }),
    [paginationMode]
  );

  /// Initialize component
  /// depends on [filter]
  useEffect(() => {
    dispatch(setFilter(filter));
    technicianRepo.getTechnicians();
  }, [filter]);

  return (
    <div className="technicians-grid">
      <DataGrid
        loading={layzLoading}
        disableColumnMenu
        sortingMode="server"
        paginationMode="server"
        columns={columns()}
        rows={rows}
        rowCount={count}
        pageSizeOptions={[10, 50, 100]}
        slots={{ noRowsOverlay: EmptyGrid }}
        paginationModel={paginationMode}
        onPaginationModelChange={setPaginationMode}
      />
    </div>
  );
}

export default TechnicianUsersTable;
