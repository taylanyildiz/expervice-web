import EmptyGrid from "@Components/EmptyGrid";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { useCustomer } from "../helpers/customer_user_helper";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import CustomerUserRepository from "@Repo/customer_user_repository";
import { setCustomerUnits } from "@Store/customer_user_store";
import customerUnitColumns from "../entities/customer_unit_columns";
import PrimaryButton from "@Components/PrimaryButton";
import AddIcon from "@mui/icons-material/Add";
import { useUnitDialog } from "@Features/summary/units/helper/unit_helper";
import RefreshIcon from "@mui/icons-material/Refresh";

function CustomerUnits() {
  /// Customer store
  const {
    customer,
    customerUnits: { rows, count },
  } = useCustomer();

  /// Customer repository
  const customerRepo = new CustomerUserRepository();

  /// Unit dialog
  const { openUnitDialog } = useUnitDialog();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch();

  /// Pagination mode
  const [paginationMode, setPaginationMode] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  // Forms filter
  const filter = useMemo(
    () => ({
      limit: paginationMode.pageSize,
      offset: paginationMode.pageSize * paginationMode.page,
    }),
    [paginationMode]
  );

  const getUnits = async () => {
    await customerRepo.getUnits(customer!.id!, filter);
  };

  /// Intialize component
  useEffect(() => {
    getUnits();
  }, [filter]);

  /// Destroy component
  useEffect(() => {
    return () => {
      dispatch(setCustomerUnits({ rows: [], count: 0 }));
    };
  }, []);

  /// Create unit to customer
  const handleCreateUnit = () => {
    openUnitDialog(undefined, { customer: customer });
  };

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Typography flex={1} variant="h1" fontSize={16} children="Units" />
        <IconButton
          onClick={() => setPaginationMode({ page: 0, pageSize: 10 })}
        >
          <RefreshIcon />
        </IconButton>
        <PrimaryButton
          prefix={<AddIcon />}
          variant="contained"
          children="Add Unit"
          color="white"
          fontWeight="normal"
          onClick={handleCreateUnit}
        />
      </Stack>
      <Box height={400} mt={1}>
        <DataGrid
          disableColumnMenu
          sortingMode="server"
          paginationMode="server"
          columns={customerUnitColumns}
          rows={rows}
          rowCount={count}
          pageSizeOptions={[10, 50, 100]}
          slots={{ noRowsOverlay: EmptyGrid }}
          paginationModel={paginationMode}
          onPaginationModelChange={setPaginationMode}
        />
      </Box>
    </>
  );
}

export default CustomerUnits;
