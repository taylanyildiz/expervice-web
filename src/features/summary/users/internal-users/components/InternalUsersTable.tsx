import EmptyGrid from "@Components/EmptyGrid";
import { DataGrid } from "@mui/x-data-grid";
import columns from "../entities/grid_columns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@Store/index";
import InternalUserRepository from "@Repo/internal_user_repositoy";
import { useEffect } from "react";
import { setFilter } from "@Store/internal_user_store";

function InternalUsersTable() {
  /// Internal user repository
  const internalUserRepo = new InternalUserRepository();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Internal user store
  const {
    internalUsers: { rows, count },
    layzLoading,
    filter: internalFilter,
  } = useSelector((state: RootState) => state.internalUser);

  /// Get internal users
  const getInternalUsers = async () => {
    await internalUserRepo.getInternalUsers();
  };

  /// Initialize component
  useEffect(() => {
    getInternalUsers();
  }, [internalFilter]);

  return (
    <div className="internal-users-grid">
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
          page: internalFilter.page ?? 0,
          pageSize: internalFilter.limit ?? 10,
        }}
        onPaginationModelChange={(paginationMode) => {
          dispatch(
            setFilter({
              ...internalFilter,
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

export default InternalUsersTable;
