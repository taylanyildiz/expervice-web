import EmptyGrid from "@Components/EmptyGrid";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import columns from "../entities/grid_columns";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import UnitFilter from "@Models/units/unit_filter";
import UnitRepository from "@Repo/unit_repository";
import { setUnitFilter } from "@Store/unit_store";
import { useUnit } from "../helper/unit_helper";

function UnitsTable() {
  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Unit store
  const {
    layzLoading,
    units: { rows, count },
  } = useUnit();

  /// Unit repository
  const unitRepo = new UnitRepository();

  /// Pagination mode
  const [paginationMode, setPaginationMode] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  /// Filter
  const filter: UnitFilter = useMemo(
    () => ({
      limit: paginationMode.pageSize,
      offset: paginationMode.pageSize * paginationMode.page,
    }),
    [paginationMode]
  );

  /// Initialize component
  useEffect(() => {
    dispatch(setUnitFilter(filter));
    unitRepo.getUnits();
  }, [filter]);

  return (
    <div className="units-grid">
      <DataGrid
        pagination
        loading={layzLoading}
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

export default UnitsTable;
