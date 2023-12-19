import { DataGrid } from "@mui/x-data-grid";
import columns from "../entities/grid_columns";
import EmptyGrid from "@Components/EmptyGrid";
import { useEffect } from "react";
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
        paginationModel={{
          page: formFilter.page ?? 0,
          pageSize: formFilter.limit ?? 10,
        }}
        onPaginationModelChange={(paginationMode) => {
          dispatch(
            setFormFilter({
              ...formFilter,
              page: paginationMode.page,
              limit: paginationMode.pageSize,
              offset: paginationMode.pageSize * paginationMode.page,
            })
          );
        }}
      />
    </div>
  );
}

export default FormsTable;
