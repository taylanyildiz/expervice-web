import {
  Collapse,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, useFormDialog } from "../helper/form_helper";
import FormRepository from "@Repo/form_repository";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Customer from "@Models/customer/customer";
import { useDispatch } from "react-redux";
import { setFormCustomers } from "@Store/form_store";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDialog } from "@Utils/hooks/dialog_hook";
import CustomerUserRepository from "@Repo/customer_user_repository";
import { openBase64PDF } from "@Utils/functions";
import AddIcon from "@mui/icons-material/Add";
import PrimaryButton from "@Components/PrimaryButton";

function FormCustomersContent() {
  /// Form store
  const {
    form,
    formCustomers: { rows, count },
  } = useForm();

  /// Dispatch
  const dispatch = useDispatch();

  /// Customer rows
  const [customers, setCustomers] = useState<
    (Customer & { display?: boolean })[]
  >([]);

  /// Form repository
  const formRepo = new FormRepository();

  /// Customer repository
  const customerRepo = new CustomerUserRepository();

  /// Dialog hook
  const { openLoading, openConfirm } = useDialog();

  /// Form dialog hook
  const { openCustomerDialog } = useFormDialog();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /// Initialize component
  useEffect(() => {
    formRepo.formCustomers(form!.id!);
  }, [form]);

  /// Initialize customers
  useEffect(() => {
    setCustomers(rows);
  }, [rows]);

  /// Destory
  useEffect(() => {
    return () => {
      dispatch(setFormCustomers({ rows: [], count: 0 }));
    };
  }, []);

  /// Delete handle
  const handleDelete = async (id: number, index: number) => {
    const confirm = await openConfirm(
      "Delete Customer Form",
      "Are you sure to delete customer form ?"
    );
    if (!confirm) return;
    const result = await openLoading(async () => {
      return customerRepo.deleteForm(id);
    });
    if (!result) return;
    const values = [...customers.map((e) => ({ ...e }))];
    const forms = values[index].customer_forms?.filter((e) => e.id !== id);
    if (forms?.length === 0) {
      setCustomers(values.filter((_, i) => i !== index));
      return;
    }
    values[index].customer_forms = forms;
    setCustomers(values);
  };

  /// View Form PDF
  const handlePdfView = async (id: number) => {
    const result = await openLoading(async () => {
      return await customerRepo.getFormPDF(id);
    });
    if (!result) return;
    openBase64PDF(result);
  };

  /// Add customer
  const handleAddCustomer = async () => {
    const result = await openCustomerDialog(async (customerForm) => {
      return customerRepo.createForm({
        ...customerForm,
        form_id: form?.id,
      });
    });
    if (!result) return;
    formRepo.formCustomers(form!.id!);
  };

  return (
    <>
      <Grid container>
        <Grid item flex={1}>
          <Typography variant="h1" fontSize={15} children="Customers" />
        </Grid>
        <Grid item>
          <PrimaryButton
            prefix={<AddIcon />}
            variant="contained"
            children="Add Customer"
            color="white"
            fontWeight="normal"
            onClick={handleAddCustomer}
          />
        </Grid>
      </Grid>

      <div
        style={{
          marginTop: 10,
          width: "100%",
          height: 400,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, overflow: "scroll" }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell children="Display Name" />
                  <TableCell children="Email" />
                  <TableCell children="Forms" />
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer, index) => (
                  <>
                    <TableRow
                      key={index}
                      onClick={() => {
                        const values = [...customers.map((e) => ({ ...e }))];
                        values[index].display = !(
                          values[index].display ?? false
                        );
                        setCustomers(values);
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>
                        {customer.display ? (
                          <ArrowDropDownIcon />
                        ) : (
                          <ArrowRightIcon />
                        )}
                      </TableCell>
                      <TableCell children={customer.display_name} />
                      <TableCell children={customer.email} />
                      <TableCell children={customer.customer_forms?.length} />
                    </TableRow>
                    <TableCell
                      key={index + customers.length}
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={4}
                    >
                      <Collapse in={customer.display}>
                        <Table size="small">
                          <TableHead sx={{ backgroundColor: "red" }}>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell>Job Type</TableCell>
                              <TableCell>Unit Type</TableCell>
                              <TableCell>Current Job Status</TableCell>
                              <TableCell>Next Job Status</TableCell>
                              <TableCell />
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {customer.customer_forms?.map((form, index) => (
                              <TableRow key={index + 2 * customers.length}>
                                <TableCell children={form.name} />
                                <TableCell children={form.job_sub_type?.name} />
                                <TableCell
                                  children={form.unit_sub_type?.name}
                                />
                                <TableCell
                                  children={form.current_job_status?.name}
                                />
                                <TableCell
                                  children={form.next_job_status?.name}
                                />

                                <TableCell>
                                  <IconButton
                                    onClick={() => handlePdfView(form.id!)}
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                  <IconButton
                                    onClick={() =>
                                      handleDelete(form.id!, index)
                                    }
                                  >
                                    <DeleteOutlinedIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}

export default FormCustomersContent;
