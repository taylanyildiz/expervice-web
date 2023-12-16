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
import TextOutlineField from "@Components/TextOutlineField";
import SelectCustomerFilterType from "./SelectCustomerFilterType";
import TranslateHelper from "@Local/index";
import { ECustomerFilterType } from "../entities/customer_enums";
import SelectCustomerStatuses from "./SelectCustomerStatuses";
import { SelectRegions } from "@Components/index";
import SelectUserGroups from "@Features/summary/components/SelectUserGroups";

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
    filter_type: ECustomerFilterType.DisplayName,
    keyword: "",
    groups: [],
    region_ids: [],
    statuses: [],
    end_date: "",
    start_date: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <Drawer anchor="right" open={customerFilterDrawer} onClose={handleClose}>
      <Box width={300} height="100%">
        <Stack spacing={1} height={"100%"}>
          {/* Header */}
          <Stack
            px={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h1"
              fontSize={17}
              children={TranslateHelper.customerUsersFilter()}
            />
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
          {/* Content */}
          <Stack
            px={1}
            spacing={1}
            height="100%"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <TextOutlineField
              name="keyword"
              height={30}
              label={TranslateHelper.keyword()}
              value={formik.values.keyword}
              onChange={formik.handleChange}
            />
            <SelectCustomerFilterType
              label={TranslateHelper.filterType()}
              onChanged={(v) => formik.setFieldValue("filter_type", v)}
              value={formik.values.filter_type}
            />
            <SelectCustomerStatuses
              fullWidth
              label="Customer Statuses" // TODO: Translations
              values={formik.values.statuses}
              onChanged={(values) => {
                formik.setFieldValue("statuses", values);
              }}
            />
            <SelectRegions
              fullWidth
              label="Regions" // TODO: Translations
              values={formik.values.region_ids}
              onChanged={(values) => {
                formik.setFieldValue(
                  "region_ids",
                  values?.map((e) => e.id!)
                );
              }}
            />
            <SelectUserGroups
              fullWidth
              label="Groups" // TODO: Translations
              values={formik.values.groups}
              regions={formik.values.region_ids}
              onChanged={(values) => {
                formik.setFieldValue("groups", values);
              }}
            />
          </Stack>
          {/* Actions */}
          <Stack p={1} spacing={1} direction="row" justifyContent="end">
            <PrimaryButton
              variant="outlined"
              children={TranslateHelper.clearFilter()}
              fontWeight="normal"
              onClick={() => {
                formik.resetForm({
                  values: {
                    ...initialValues,
                    limit: customerFilter?.limit,
                    offset: customerFilter?.offset,
                  },
                });
              }}
            />
            <PrimaryButton
              variant="contained"
              children={TranslateHelper.applyFilter()}
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
