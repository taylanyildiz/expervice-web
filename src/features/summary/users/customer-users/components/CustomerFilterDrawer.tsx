import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useCustomer } from "../helpers/customer_user_helper";
import { useDispatch } from "react-redux";
import {
  setCustomerFilter,
  setCustomerFilterDrawer,
} from "@Store/customer_user_store";
import CloseIcon from "@mui/icons-material/Close";
import PrimaryButton from "@Components/PrimaryButton";
import { useEffect } from "react";
import CustomerFilter from "@Models/customer/customer_filter";
import { useFormik } from "formik";
import { ECustomerFilterType } from "@Models/customer/customer_enums";
import TextOutlineField from "@Components/TextOutlineField";
import SelectCustomerFilterType from "./SelectCustomerFilterType";

function CustomerFilterDrawer() {
  /// Customer store
  const { customerFilter, customerFilterDrawer } = useCustomer();

  /// Dispatch
  const dispatch = useDispatch();

  /// Close drawer
  const handleClose = () => {
    dispatch(setCustomerFilterDrawer(false));
  };

  /// Apply filter
  const handleApply = () => {
    formik.handleSubmit();
  };

  /// Initialize component
  useEffect(() => {
    if (!customerFilter) return;
    for (const [k, v] of Object.entries(customerFilter)) {
      formik.setFieldValue(k, v);
    }
  }, [customerFilter]);

  /// Handle submit
  const handleSubmit = (values: CustomerFilter) => {
    dispatch(setCustomerFilter(values));
  };

  /// Formik
  const initialValues: CustomerFilter = {
    limit: 10,
    offset: 0,
    filter_type: ECustomerFilterType.DisplayName,
    keyword: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <Drawer anchor="right" open={customerFilterDrawer} onClose={handleClose}>
      <Box width={300} height="100%">
        <Stack spacing={1} height={"100%"}>
          <Stack
            px={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h1" fontSize={17} children="Customer Filter" />
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Stack
            px={1}
            spacing={1}
            height="100%"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <TextOutlineField
              label="Keyword"
              name="keyword"
              value={formik.values.keyword}
              onChange={formik.handleChange}
            />
            <SelectCustomerFilterType
              label="Filter Type"
              onChanged={(v) => formik.setFieldValue("filter_type", v)}
              value={formik.values.filter_type}
            />
          </Stack>
          <Stack p={1} spacing={1} direction="row" justifyContent="end">
            <PrimaryButton
              variant="outlined"
              children="Clear Filter"
              fontWeight="normal"
              onClick={() => {
                formik.resetForm({
                  values: {
                    keyword: "",
                    filter_type: ECustomerFilterType.DisplayName,
                  },
                });
              }}
            />
            <PrimaryButton
              variant="contained"
              children="Apply Filter"
              color="white"
              fontWeight="normal"
              onClick={handleApply}
            />
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
}

export default CustomerFilterDrawer;
