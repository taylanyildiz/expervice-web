import EmptyGrid from "@Components/EmptyGrid";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import columns from "../entities/grid_columns";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import UnitFilter from "@Models/units/unit_filter";
import UnitRepository from "@Repo/unit_repository";
import { setSelectedUnits, setUnitFilter } from "@Store/unit_store";
import { useUnit } from "../helper/unit_helper";
import { useAccount } from "@Features/summary/company/helper/company_helper";

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

  /// Unit repository
  const unitRepo = new UnitRepository();

  /// Account store
  const { isOwner, isInternal } = useAccount();

  /// Pagination mode
  const [paginationMode, setPaginationMode] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  /// Filter
  const pagination: UnitFilter = useMemo(
    () => ({
      limit: paginationMode.pageSize,
      offset: paginationMode.pageSize * paginationMode.page,
    }),
    [paginationMode]
  );

  /// Listen pagination and filter
  useEffect(() => {
    dispatch(
      setUnitFilter({
        ...filter,
        ...pagination,
      })
    );
  }, [pagination]);

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
        disableRowSelectionOnClick={!(isInternal || isOwner)}
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
        rowSelectionModel={selectedUnits ?? []}
        onRowSelectionModelChange={(selecteds) => {
          dispatch(setSelectedUnits(selecteds));
        }}
      />
    </div>
  );
}

export default UnitsTablePage;
