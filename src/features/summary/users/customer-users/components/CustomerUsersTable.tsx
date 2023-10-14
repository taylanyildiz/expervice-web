import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import columns from "../entities/grid_columns";
import EmptyGrid from "@Components/EmptyGrid";
import { useEffect, useMemo, useState } from "react";
import { useCustomer } from "../helpers/customer_user_helper";
import CustomerUserRepository from "@Repo/customer_user_repository";
import CustomerFilter from "@Models/customer/customer_filter";

function CustomerUsersTable() {
  /// customer store
  const {
    customers: { rows, count },
    layzLoading,
  } = useCustomer();

  /// Customer repository
  const customerRepo = new CustomerUserRepository();

  /// Pagination mode
  const [paginationMode, setPaginationMode] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  /// Customer filter
  const filter: CustomerFilter = useMemo(
    () => ({
      limit: paginationMode.pageSize,
      offset: paginationMode.pageSize * paginationMode.page,
    }),
    [paginationMode]
  );

  /// Initialize component
  useEffect(() => {
    customerRepo.getCustomers(filter);
  }, [filter]);

  return (
    <div className="customer-users-grid">
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

export default CustomerUsersTable;
