import { DataGrid } from "@mui/x-data-grid";
import columns from "../entities/grid_columns";
import { useTechnician } from "../helper/technician_helper";
import EmptyGrid from "@Components/EmptyGrid";
import { useEffect } from "react";
import TechnicianRepository from "@Repo/technician_repository";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { setFilter } from "@Store/technician_store";

function TechnicianUsersTable() {
  /// Technician store
  const {
    layzLoading,
    filter: technicianFilter,
    technicians: { rows, count },
  } = useTechnician();

  /// Technician repository
  const technicianRepo = new TechnicianRepository();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Initialize component
  useEffect(() => {
    technicianRepo.getTechnicians();
  }, [technicianFilter]);

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
        paginationModel={{
          page: technicianFilter.page ?? 0,
          pageSize: technicianFilter.limit ?? 10,
        }}
        onPaginationModelChange={(paginationMode) => {
          dispatch(
            setFilter({
              ...technicianFilter,
              page: paginationMode.page,
              limit: paginationMode.pageSize,
              offset: paginationMode.page * paginationMode.pageSize,
            })
          );
        }}
      />
    </div>
  );
}

export default TechnicianUsersTable;
