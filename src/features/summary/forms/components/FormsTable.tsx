import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import columns from "../entities/grid_columns";
import EmptyGrid from "@Components/EmptyGrid";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@Store/index";
import FormRepository from "@Repo/form_repository";
import { setFormFilter } from "@Store/form_store";

function FormsTable() {
  /// Form store
  const {
    formLayzLoading: loading,
    forms: { rows, count },
    formFilter,
  } = useSelector((state: RootState) => state.form);

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Form repository
  const formRepo = new FormRepository();

  /// Pagination mode
  const [paginationMode, setPaginationMode] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  /// Filter
  const filter: { limit: number; offset: number } = useMemo(
    () => ({
      limit: paginationMode.pageSize,
      offset: paginationMode.pageSize * paginationMode.page,
    }),
    [paginationMode]
  );

  /// Initialize component
  useEffect(() => {
    dispatch(setFormFilter(filter));
  }, [filter]);

  /// Initialize component
  useEffect(() => {
    formRepo.getForms();
  }, [formFilter]);

  return (
    <div className="forms-grid">
      <DataGrid
        loading={loading}
        sortingMode="server"
        paginationMode="server"
        columns={columns()}
        rows={rows}
        rowCount={count}
        pagination
        disableColumnMenu
        slots={{ noRowsOverlay: EmptyGrid }}
        pageSizeOptions={[10, 50, 100]}
        paginationModel={paginationMode}
        onPaginationModelChange={setPaginationMode}
      />
    </div>
  );
}

export default FormsTable;
