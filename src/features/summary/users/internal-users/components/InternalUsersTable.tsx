import EmptyGrid from "@Components/EmptyGrid";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import columns from "../entities/grid_columns";
import { useSelector } from "react-redux";
import { RootState } from "@Store/index";
import InternalUserRepository from "@Repo/internal_user_repositoy";
import { useEffect, useMemo, useState } from "react";
import InternalUserFilter from "@Models/internal-user/internal_user_filter";

function InternalUsersTable() {
  /// Internal user repository
  const internalUserRepo = new InternalUserRepository();

  /// Pagination mode
  const [paginationMode, setPaginationMode] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  /// filter
  const filter: InternalUserFilter = useMemo(
    () => ({
      limit: paginationMode.pageSize,
      offset: paginationMode.page * paginationMode.pageSize,
    }),
    [paginationMode]
  );

  /// Internal user store
  const {
    internalUsers: { rows, count },
    layzLoading,
  } = useSelector((state: RootState) => state.internalUser);

  /// Get internal users
  const getInternalUsers = async () => {
    await internalUserRepo.getInternalUsers(filter);
  };

  /// Initialize component
  useEffect(() => {
    getInternalUsers();
  }, [filter]);

  return (
    <div className="internal-users-grid">
      <DataGrid
        loading={layzLoading}
        disableColumnMenu
        sortingMode="server"
        paginationMode="server"
        columns={columns}
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

export default InternalUsersTable;
