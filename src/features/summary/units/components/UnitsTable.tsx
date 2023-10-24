import EmptyGrid from "@Components/EmptyGrid";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import columns from "../entities/grid_columns";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import UnitFilter from "@Models/units/unit_filter";
import UnitRepository from "@Repo/unit_repository";
import { setUnitFilter, setUnitId } from "@Store/unit_store";
import { useUnit, useUnitDialog } from "../helper/unit_helper";
import { useQuery } from "@Utils/functions";

function UnitsTable() {
  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Unit store
  const {
    layzLoading,
    unitId,
    units: { rows, count },
  } = useUnit();

  /// Unit repository
  const unitRepo = new UnitRepository();

  /// Dialog hook
  const { openUnitDialog, closeDialog } = useUnitDialog();

  /// Query hook
  const [path, deletePath, setPath] = useQuery();

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

  /// Listen query params
  useEffect(() => {
    const id = parseInt(`${path.get("unitId")}`);
    if (!id || isNaN(id)) {
      deletePath("unitId");
      dispatch(setUnitId(null));
    }
    if (id || !isNaN(id)) {
      dispatch(setUnitId(id));
    }
  }, []);

  /// Listen unit id
  useEffect(() => {
    if (unitId) {
      setPath("unitId", unitId.toString());
      return openUnitDialog();
    }
    deletePath("unitId");
    closeDialog();
  }, [unitId]);

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
