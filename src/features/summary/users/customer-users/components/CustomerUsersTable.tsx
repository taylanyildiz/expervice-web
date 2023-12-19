import { DataGrid } from "@mui/x-data-grid";
import columns from "../entities/grid_columns";
import EmptyGrid from "@Components/EmptyGrid";
import { useEffect } from "react";
import { useCustomer } from "../helpers/customer_user_helper";
import CustomerUserRepository from "@Repo/customer_user_repository";
import { setCustomerFilter } from "@Store/customer_user_store";
import { useDispatch } from "react-redux";

function CustomerUsersTable() {
  /// customer store
  const {
    customers: { rows, count },
    layzLoading,
    customerFilter,
  } = useCustomer();

  /// Dispatch
  const dispatch = useDispatch();

  /// Customer repository
  const customerRepo = new CustomerUserRepository();

  /// Initialize component
  useEffect(() => {
    customerRepo.getCustomers();
  }, [customerFilter]);

  return (
    <div className="customer-users-grid">
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
          page: customerFilter?.page ?? 0,
          pageSize: customerFilter?.limit ?? 10,
        }}
        onPaginationModelChange={(paginationMode) => {
          dispatch(
            setCustomerFilter({
              ...customerFilter,
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

export default CustomerUsersTable;
