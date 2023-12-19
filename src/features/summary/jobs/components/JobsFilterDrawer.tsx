import { useDispatch } from "react-redux";
import { useJob } from "../helper/job_helper";
import { setJobFilter, setJobsFilterDrawerStatus } from "@Store/job_store";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrimaryButton from "@Components/PrimaryButton";
import TranslateHelper from "@Local/index";
import { useFormik } from "formik";
import TextOutlineField from "@Components/TextOutlineField";
import SelectJobFilterType from "./SelectJobFilterType";
import { EJobFilterType } from "../entities/job_enums";
import { useEffect } from "react";
import { SelectDate, SelectRegions, VisibilityComp } from "@Components/index";
import SelectUserGroups from "@Features/summary/components/SelectUserGroups";
import SelectJobStatuses from "./SelectJobStatuses";
import SelectJobPriorities from "./SelectJobPriorities";
import SelectJobTypes from "./SelectJobTypes";
import SelectJobSubTypes from "./SelectJobSubTypes";
import { getLastMonth, useQuery } from "@Utils/functions";
import JobFilter from "@Models/job/job_filter";
import { ECustomDate } from "@Models/enums";
import CustomDateRangePicker from "@Components/CustomDateRangePicker";

function JobsFilterDrawer() {
  /// Query hook
  const [path, deletePath, setPath] = useQuery();

  /// Job store
  const { jobsFilterDrawerStatus: open, jobFilter } = useJob();

  /// Dispatch
  const dispatch = useDispatch();

  /// Close drawer
  const handleClose = () => {
    dispatch(setJobsFilterDrawerStatus(false));
  };

  /// Submit
  const handleSubmit = (values: JobFilter) => {
    dispatch(
      setJobFilter({
        ...values,
        page: 0,
        limit: 10,
        offset: 0,
      })
    );
    if (!values.type_ids?.includes(parseInt(`${path.get("type")}`))) {
      deletePath("type");
    }
    if ([0, 2].includes((values.type_ids ?? []).length)) {
      deletePath("type");
    }
    if ((values.type_ids ?? []).length === 1) {
      setPath("type", values.type_ids![0].toString());
    }
  };

  /// Formik
  const initialValues: JobFilter = {
    keyword: "",
    end_date: undefined,
    start_date: undefined,
    dateType: ECustomDate.All,
    filter_type: EJobFilterType.UnitName,
    groups: [],
    region_ids: [],
    priorities: [],
    statuses: [],
    type_ids: [],
    sub_type_ids: [],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  /// Initialize component
  useEffect(() => {
    if (!jobFilter) return;
    for (let [k, v] of Object.entries(jobFilter)) {
      formik.setFieldValue(k, v);
    }
  }, [jobFilter]);

  useEffect(() => {
    const type = parseInt(`${path.get("type")}`);
    const types = jobFilter.type_ids ?? [];
    if (types.includes(type) || types.length > 1) return;
    if (!type || isNaN(type)) {
      deletePath("type");
      dispatch(setJobFilter({ ...jobFilter, type_ids: [] }));
    }
    if (type || !isNaN(type)) {
      dispatch(setJobFilter({ ...jobFilter, type_ids: [type] }));
    }
  }, [path]);

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box overflow="hidden" width={300} height="100%">
        <Stack spacing={1} height="100%">
          {/* Header */}
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
          >
            <Typography
              p={1}
              variant="h1"
              fontSize={17}
              children={TranslateHelper.jobsFilter()}
            />
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
          {/* Content */}
          <Stack
            sx={{ overflow: "scroll", borderBottom: 1, borderColor: "divider" }}
            p={1}
            height="100%"
          >
            <TextOutlineField
              height={30}
              fullWidth
              name="keyword"
              label={TranslateHelper.keyword()}
              value={formik.values.keyword}
              onChange={formik.handleChange}
            />
            <SelectJobFilterType
              fullWidth
              label={TranslateHelper.filterType()}
              value={formik.values.filter_type}
              onChanged={(value) => {
                formik.setFieldValue("filter_type", value);
              }}
            />
            <SelectJobTypes
              fullWidth
              label={TranslateHelper.jobTypes()}
              values={formik.values.type_ids}
              onChanged={(values) => {
                formik.setFieldValue(
                  "type_ids",
                  values?.map((e) => e.id)
                );
              }}
            />
            <SelectJobSubTypes
              fullWidth
              label={TranslateHelper.jobSubTypes()}
              values={formik.values.sub_type_ids}
              types={formik.values.type_ids}
              onChanged={(values) => {
                formik.setFieldValue(
                  "sub_type_ids",
                  values?.map((e) => e.id)
                );
              }}
            />
            <SelectJobStatuses
              fullWidth
              label={TranslateHelper.jobStatuses()}
              values={formik.values.statuses}
              jobTypes={formik.values.type_ids}
              onChanged={(values) => {
                formik.setFieldValue(
                  "statuses",
                  values?.map((e) => e.id)
                );
              }}
            />

            <SelectJobPriorities
              fullWidth
              label={TranslateHelper.jobPriorities()}
              values={formik.values.priorities}
              onChanged={(values) => {
                formik.setFieldValue(
                  "priorities",
                  values?.map((e) => e.id)
                );
              }}
            />
            <SelectRegions
              fullWidth
              label={TranslateHelper.regions()}
              values={formik.values.region_ids}
              onChanged={(values) => {
                formik.setFieldValue(
                  "region_ids",
                  values?.map((e) => e.id)
                );
              }}
            />
            <SelectUserGroups
              fullWidth
              label={TranslateHelper.groups()}
              values={formik.values.groups}
              regions={formik.values.region_ids}
              onChanged={(values) => {
                formik.setFieldValue("groups", values);
              }}
            />
            <SelectDate
              label={TranslateHelper.createdDate()}
              value={formik.values.dateType}
              onChanged={(dateType, start, end) => {
                formik.setFieldValue("dateType", dateType);
                formik.setFieldValue("start_date", start);
                formik.setFieldValue("end_date", end);
                if (dateType === ECustomDate.Custom) {
                  console.log("test");

                  formik.setFieldValue("start_date", getLastMonth());
                  formik.setFieldValue("end_date", new Date());
                }
              }}
            />
            <VisibilityComp
              visibility={formik.values.dateType === ECustomDate.Custom}
            >
              <CustomDateRangePicker
                startDate={jobFilter?.start_date}
                endDate={jobFilter?.end_date}
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

export default JobsFilterDrawer;
