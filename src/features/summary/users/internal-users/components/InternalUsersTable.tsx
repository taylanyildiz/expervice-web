import EmptyGrid from "@Components/EmptyGrid";
import { DataGrid } from "@mui/x-data-grid";
import columns from "../entities/grid_columns";
import { useSelector } from "react-redux";
import { RootState } from "@Store/index";

function InternalUsersTable() {
  /// Internal user store
  const {
    internalUsers: { rows, count },
    layzLoading,
  } = useSelector((state: RootState) => state.internalUser);

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
        slots={{ noRowsOverlay: EmptyGrid }}
        sx={{ border: "none" }}
      />
    </div>
  );
}

export default InternalUsersTable;
