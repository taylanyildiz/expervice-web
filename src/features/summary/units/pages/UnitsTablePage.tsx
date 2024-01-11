import EmptyGrid from "@Components/EmptyGrid";
import { DataGrid } from "@mui/x-data-grid";
import columns from "../entities/grid_columns";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import UnitRepository from "@Repo/unit_repository";
import { setSelectedUnits, setUnitFilter } from "@Store/unit_store";
import { useUnit } from "../helper/unit_helper";
import { useAccount } from "@Features/summary/company/helper/company_helper";
import { GridExportButton } from "@Components/index";

function UnitsTablePage() {
  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Unit store
  const {
    layzLoading,
    units: { rows, count },
    filter,
    selectedUnits,
  } = useUnit();

  /// Account store
  const { isOwner, isInternal } = useAccount();

  /// Unit repository
  const unitRepo = new UnitRepository();

  /// Initialize component
  useEffect(() => {
    unitRepo.getUnits();
  }, [filter]);

  /// Destroy component
  useEffect(() => {
    return () => {
      dispatch(setSelectedUnits([]));
    };
  }, []);

  return (
    <div className="units-grid">
      <DataGrid
        pagination
        checkboxSelection={isInternal || isOwner}
        disableRowSelectionOnClick
        loading={layzLoading}
        disableColumnMenu
        sortingMode="server"
        paginationMode="server"
        columns={columns()}
        rowCount={count}
        rows={rows}
        pageSizeOptions={[10, 50, 100]}
        slots={{ noRowsOverlay: EmptyGrid, toolbar: GridExportButton }}
        rowSelectionModel={selectedUnits ?? []}
        onRowSelectionModelChange={(selecteds) => {
          dispatch(setSelectedUnits(selecteds));
        }}
        paginationModel={{
          page: filter?.page ?? 0,
          pageSize: filter?.limit ?? 10,
        }}
        onPaginationModelChange={(paginationMode) => {
          const page = paginationMode.page;
          dispatch(
            setUnitFilter({
              ...filter,
              page: page,
              limit: paginationMode.pageSize,
              offset: paginationMode.pageSize * page,
            })
          );
        }}
      />
    </div>
  );
}

export default UnitsTablePage;
