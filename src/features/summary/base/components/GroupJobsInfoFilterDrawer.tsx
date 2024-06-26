import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import GroupInfoFilter from "../entities/group_info_filter";
import { ECustomDate } from "@Models/enums";
import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import PrimaryButton from "@Components/PrimaryButton";
import TranslateHelper from "@Local/index";
import { useEffect } from "react";
import { useCompanyRegion } from "../helper/summary_helper";
import {
  setGroupInfoFilter,
  setGroupInfoFilterDrawerStatus,
} from "@Store/company_region_store";
import SelectDate from "@Components/SelectDate";
import VisibilityComp from "@Components/VisibilityComp";
import CustomDateRangePicker from "@Components/CustomDateRangePicker";
import { getLastMonth } from "@Utils/functions";

function GroupJobsInfoFilterDrawer() {
  /// Company region store
  const { groupInfoFilter: filter, groupInfoFilterDrawerStatus: open } =
    useCompanyRegion();

  /// Dipsatch
  const dispatch = useDispatch();

  /// Close drawer
  const handleClose = () => {
    dispatch(setGroupInfoFilterDrawerStatus(false));
  };

  /// Submit
  const handleSubmit = (values: GroupInfoFilter) => {
    dispatch(setGroupInfoFilter(values));
  };

  /// Formik
  const initialValues: GroupInfoFilter = {
    dateType: ECustomDate.Past30,
    end_date: new Date(),
    start_date: getLastMonth(),
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  /// Initialize component
  useEffect(() => {
    if (!filter) return;
    for (const [k, v] of Object.entries(filter)) {
      formik.setFieldValue(k, v);
    }
  }, []);

  return (
    <Drawer open={open} anchor="right" onClose={handleClose}>
      <Box width={300} height="100%">
        <Stack spacing={1} height="100%">
          {/* Header */}
          <Stack direction="row" justifyContent="space-between">
            <Typography
              p={1}
              variant="h1"
              fontSize={17}
              children={TranslateHelper.groupJobsFilter()}
            />
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
          {/* Content */}
          <Stack
            sx={{ borderBottom: 1, borderColor: "divider" }}
            p={1}
            height="100%"
          >
            <SelectDate
              label={TranslateHelper.createdDate()}
              value={formik.values.dateType}
              onChanged={(dateType, start, end) => {
                formik.setFieldValue("dateType", dateType);
                formik.setFieldValue("start_date", start);
                formik.setFieldValue("end_date", end);
                if (dateType === ECustomDate.Custom) {
                  formik.setFieldValue("start_date", getLastMonth());
                  formik.setFieldValue("end_date", new Date());
                }
              }}
            />
            <VisibilityComp
              visibility={formik.values.dateType === ECustomDate.Custom}
            >
              <CustomDateRangePicker
                startDate={filter?.start_date}
                endDate={filter?.end_date}
                onChanged={(start, end) => {
                  formik.setFieldValue("end_date", end);
                  formik.setFieldValue("start_date", start);
                }}
              />
            </VisibilityComp>
          </Stack>
          {/* Actions */}
          <Stack p={1} justifyContent="end" spacing={1} direction="row">
            <PrimaryButton
              variant="outlined"
              fontWeight="normal"
              children={TranslateHelper.clearFilter()}
              onClick={() => formik.resetForm()}
            />
            <PrimaryButton
              variant="contained"
              fontWeight="normal"
              color="white"
              children={TranslateHelper.applyFilter()}
              onClick={() => formik.handleSubmit()}
            />
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
}

export default GroupJobsInfoFilterDrawer;
