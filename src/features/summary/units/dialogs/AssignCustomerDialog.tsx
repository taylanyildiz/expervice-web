import PrimaryButton from "@Components/PrimaryButton";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import {
  Avatar,
  Box,
  DialogContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useUnit } from "../helper/unit_helper";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { setSelectedUnits } from "@Store/unit_store";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import SelectCustomer from "@Components/SelectCustomer";
import { useCustomerDialog } from "@Features/summary/users/customer-users/helpers/customer_user_helper";
import Customer from "@Models/customer/customer";
import { useFormik } from "formik";
import { object } from "yup";
import VisibilityComp from "@Components/VisibilityComp";
import RichText from "@Components/RichText";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import { caption } from "@Utils/functions";
import UnitRepository from "@Repo/unit_repository";
import { useEffect } from "react";

function CustomerInfo(props: { customer?: Customer }) {
  const { customer } = props;
  return (
    <VisibilityComp visibility={Boolean(customer)}>
      <Box mt={1} sx={{ backgroundColor: "white" }}>
        <Stack direction="column" divider={<Divider />}>
          <Typography
            p={1}
            variant="h1"
            fontSize={15}
            children="Customer Info"
          />
          <Grid container spacing={1} p={1}>
            <Grid item>
              <Avatar
                sx={{ width: 50, height: 50, color: "white" }}
                children={caption(customer?.display_name)}
              />
            </Grid>
            <Grid item>
              <Stack direction="column">
                <Typography
                  variant="h1"
                  fontSize={15}
                  children={customer?.display_name}
                />
                <RichText
                  visibility={Boolean(
                    customer?.first_name || customer?.last_name
                  )}
                  color="black"
                  title={"Name:"}
                  content={`${customer?.first_name} ${customer?.last_name}`}
                />
                <RichText
                  visibility={Boolean(customer?.email)}
                  color="black"
                  title={<EmailOutlinedIcon sx={{ width: 15, height: 15 }} />}
                  content={customer?.email}
                />
                <RichText
                  visibility={Boolean(customer?.phone)}
                  color="black"
                  title={
                    <LocalPhoneOutlinedIcon sx={{ width: 15, height: 15 }} />
                  }
                  content={customer?.phone}
                />
                <RichText
                  visibility={Boolean(customer?.cell_phone)}
                  color="black"
                  title={
                    <PhoneAndroidOutlinedIcon sx={{ width: 15, height: 15 }} />
                  }
                  content={customer?.cell_phone}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <RichText
                color="black"
                title="Group:"
                content={customer?.group?.name}
              />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </VisibilityComp>
  );
}

function AssignCustomerDialog() {
  /// Destroy component
  useEffect(() => {
    return () => {
      unitRepo.getUnits();
    };
  }, []);

  /// Unit stores
  const { selectedUnits } = useUnit();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch();

  /// Dialog hook
  const { openLoading, closeDialog, openConfirm } = useDialog();

  /// Cutomer dialog hook
  const { openCustomerDialog } = useCustomerDialog();

  /// Unit repository
  const unitRepo = new UnitRepository();

  /// Save handle
  const onSaveHandle = () => {
    formik.handleSubmit();
  };

  /// Open create customer dialog
  const handleCreateCustomer = async () => {
    const result = await openCustomerDialog();
    if (!result) return;
    formik.setFieldValue("customer", result);
  };

  /// Submit handle
  const onSubmitHandle = async () => {
    const confirm = await openConfirm(
      "Assign Customer",
      "Are you sure to assign customer?"
    );
    if (!confirm) return;
    const result = await openLoading(async () => {
      return unitRepo.assign(selectedUnits, customer!.id!);
    });
    if (!result) return;
    dispatch(setSelectedUnits([]));
    closeDialog();
  };

  /// Formik
  const initialValues: { customer?: Customer } = {
    customer: undefined,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: object({
      customer: object().nullable().required(),
    }),
    onSubmit: onSubmitHandle,
  });

  /// Selected customer
  const customer = formik.values.customer;

  return (
    <>
      <DialogCustomTitle title="Assign Customer" />
      <DialogContent>
        <CustomerInfo customer={customer} />
        <Box p={1} mt={1} sx={{ backgroundColor: "white" }}>
          <Grid container direction="row" columnSpacing={1} alignItems="center">
            <Grid item flex={1}>
              <SelectCustomer
                fullWidth
                label="Customer"
                value={formik.values.customer}
                onChanged={(customer) => {
                  formik.setFieldValue("customer", customer);
                }}
                helperText={formik.touched.customer && formik.errors.customer}
                error={Boolean(
                  formik.touched.customer && formik.errors.customer
                )}
              />
            </Grid>
            <Grid item>
              <PrimaryButton
                variant="text"
                fontWeight="normal"
                color="blue"
                children="Create Customer"
                onClick={handleCreateCustomer}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogCustomActions
        actions={[
          <PrimaryButton
            onClick={onSaveHandle}
            variant="contained"
            fontWeight="normal"
            color="white"
            children="Save"
          />,
        ]}
      />
    </>
  );
}

export default AssignCustomerDialog;
