import EmptyGrid from "@Components/EmptyGrid";
import { Box, Grid, Typography } from "@mui/material";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import {
  useCustomer,
  useCustomerDialog,
} from "../helpers/customer_user_helper";
import CustomerUserRepository from "@Repo/customer_user_repository";
import customerFormColumns from "../entities/customer_form_columns";
import PrimaryButton from "@Components/PrimaryButton";
import AddIcon from "@mui/icons-material/Add";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { openBase64PDF } from "@Utils/functions";
import TranslateHelper from "@Local/index";

function CustomerForms() {
  /// Customer store
  const {
    customer,
    customerForms: { rows, count },
  } = useCustomer();

  /// Customer dialog
  const { openCustomerFormDialog } = useCustomerDialog();

  /// Dialog hook
  const { openLoading, openConfirm } = useDialog();

  /// Customer repository
  const customerRepo = new CustomerUserRepository();

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

  /// Get customers
  const getCustomers = () => {
    customerRepo.getForms(customer!.id!, filter);
  };

  /// Initialize component
  useEffect(() => {
    getCustomers();
  }, [filter]);

  /// Handle add form
  const handleAddForm = async () => {
    const result = await openCustomerFormDialog(async (form) => {
      const result = await customerRepo.createForm({
        ...form,
        customer_id: customer!.id,
      });
      return result;
    });
    if (!result) return;
    getCustomers();
  };

  /// Handle delete customer form
  const handleDelete = async (id: number) => {
    const confirm = await openConfirm(
      "Delete Customer Form",
      "Are you sure to delete customer form?"
    );
    if (!confirm) return;
    const result = await openLoading(async () => {
      return await customerRepo.deleteForm(id);
    });
    if (!result) return;
    getCustomers();
  };

  /// Handle view pdf customer form
  const handlePDF = async (id: number) => {
    const result = await openLoading(async () => {
      return customerRepo.getFormPDF(id);
    });
    if (!result) return;
    openBase64PDF(result);
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item flex={1}>
          <Typography
            variant="h1"
            fontSize={16}
            children={TranslateHelper.forms()}
          />
        </Grid>
        <Grid item>
          <PrimaryButton
            prefix={<AddIcon />}
            variant="contained"
            children={TranslateHelper.addForm()}
            color="white"
            fontWeight="normal"
            onClick={handleAddForm}
          />
        </Grid>
      </Grid>
      <Box mt={2} height={400}>
        <DataGrid
          disableColumnMenu
          sortingMode="server"
          paginationMode="server"
          rows={rows}
          rowCount={count}
          columns={customerFormColumns({
            onDelete: handleDelete,
            onPDF: handlePDF,
          })}
          pageSizeOptions={[10, 50, 100]}
          slots={{ noRowsOverlay: EmptyGrid }}
          paginationModel={paginationMode}
          onPaginationModelChange={setPaginationMode}
        />
      </Box>
    </>
  );
}

export default CustomerForms;
