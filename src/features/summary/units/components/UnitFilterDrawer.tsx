import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useUnit } from "../helper/unit_helper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@Store/index";
import { setUnitFilter, setUnitsFilterDrawer } from "@Store/unit_store";
import TextOutlineField from "@Components/TextOutlineField";
import SelectUnitFilterType from "./SelectUnitFilterType";
import PrimaryButton from "@Components/PrimaryButton";
import {
  EUnitFilterType,
  EUnitJobStatuses,
  EUnitStatuses,
} from "../entities/unit_enums";
import UnitFilter from "@Models/units/unit_filter";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import SelectRegions from "@Features/summary/components/SelectRegions";
import CloseIcon from "@mui/icons-material/Close";
import TranslateHelper from "@Local/index";
import SelectUnitSubTypes from "./SelectUnitSubTypes";
import SelectUnitTypes from "./SelectUnitTypes";
import SelectUnitLabels from "./SelectUnitLabels";
import SelectUnitStatus from "./SelectUnitStatus";
import {
  getUnitJobStatus,
  getUnitJobStatusValue,
  getUnitStatusType,
  getUnitStatusValue,
} from "../helper/unit_enum_helper";
import SelectUserGroups from "../../components/SelectUserGroups";
import SelectUnitJobStatus from "./SelectUnitJobStatus";

function UnitsFilterDrawer() {
  /// Unit store
  const { unitsFilterDrawerStatus: open, filter } = useUnit();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Unit status state
  const [unitStatus, setUnitStatus] = useState<EUnitStatuses | undefined>(
    EUnitStatuses.All
  );

  /// Unit job status state
  const [unitJobStatus, setUnitJobStatus] = useState<
    EUnitJobStatuses | undefined
  >(EUnitJobStatuses.All);

  /// Close handle
  const handleClose = () => {
    dispatch(setUnitsFilterDrawer(false));
  };

  /// Submit handle
  const onSubmitHandle = (value: UnitFilter) => {
    dispatch(setUnitFilter(value));
  };

  /// Formik
  const initialValues: UnitFilter = {
    keyword: "",
    region_ids: [],
    filter_type: EUnitFilterType.Name,
    unit_sub_types: [],
    unit_labels: [],
    unit_types: [],
    contract_end_date: "",
    contract_start_date: "",
    end_date: "",
    start_date: "",
    has_job: undefined,
    job_statuses: [],
    job_sub_types: [],
    status: undefined,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: onSubmitHandle,
  });

  /// Initial component
  useEffect(() => {
    if (!filter) return;
    for (let [k, v] of Object.entries(filter)) {
      formik.setFieldValue(k, v);
    }
    setUnitStatus(getUnitStatusType(filter.status));
    setUnitJobStatus(getUnitJobStatus(filter.has_job));
  }, [filter]);

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box width={300} height="100%">
        <Stack spacing={1} height="100%">
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              p={1}
              variant="h1"
              fontSize={17}
              children={TranslateHelper.unitsFilter()}
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
            <TextOutlineField
              height={30}
              fullWidth
              name="keyword"
              label={TranslateHelper.keyword()}
              value={formik.values.keyword}
              onChange={formik.handleChange}
            />
            <SelectUnitFilterType
              fullWidth
              label={TranslateHelper.filterType()}
              value={formik.values.filter_type}
              onChanged={(e) => {
                formik.setFieldValue("filter_type", e);
              }}
            />
            <SelectUnitTypes
              fullWidth
              label="Unit Types" // TODO: Translate
              onChanged={(value) => {
                formik.setFieldValue("unit_types", value);
              }}
              values={formik.values.unit_types}
              error={Boolean(
                formik.touched.unit_types && formik.errors.unit_types
              )}
              helperText={formik.touched.unit_types && formik.errors.unit_types}
            />
            <SelectUnitSubTypes
              fullWidth
              label="Unit Sub Types" // TODO: Translate
              onChanged={(value) => {
                formik.setFieldValue("unit_sub_types", value);
              }}
              unitTypes={formik.values.unit_types}
              values={formik.values.unit_sub_types}
              error={Boolean(
                formik.touched.unit_sub_types && formik.errors.unit_types
              )}
              helperText={
                formik.touched.unit_sub_types && formik.errors.unit_types
              }
            />
            <SelectUnitLabels
              fullWidth
              label="Unit Labels" // TODO: Translate
              onChanged={(value) => {
                formik.setFieldValue("unit_labels", value);
              }}
              values={formik.values.unit_labels}
              error={Boolean(
                formik.touched.unit_labels && formik.errors.unit_labels
              )}
              helperText={
                formik.touched.unit_labels && formik.errors.unit_labels
              }
            />
            <SelectUnitStatus
              fullWidth
              label="Unit Status" // TODO: Translations
              value={unitStatus}
              onChanged={(value) => {
                setUnitStatus(value ?? undefined);
                formik.setFieldValue(
                  "status",
                  getUnitStatusValue(value ?? undefined)
                );
              }}
            />
            <SelectUnitJobStatus
              fullWidth
              label="Unit Job Status" // TODO: Translations
              value={unitJobStatus}
              onChanged={(value) => {
                setUnitJobStatus(value ?? undefined);
                formik.setFieldValue(
                  "has_job",
                  getUnitJobStatusValue(value ?? undefined)
                );
              }}
            />
            <SelectRegions
              label={TranslateHelper.regions()}
              fullWidth
              values={formik.values.region_ids}
              onChanged={(regions) => {
                formik.setFieldValue(
                  "region_ids",
                  regions?.map((e) => e.id) ?? []
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
          <Stack p={1} justifyContent="end" spacing={1} direction="row">
            <PrimaryButton
              variant="outlined"
              fontWeight="normal"
              children={TranslateHelper.clearFilter()}
              onClick={() =>
                formik.resetForm({
                  values: {
                    ...initialValues,
                    has_job: filter?.has_job,
                    limit: filter?.limit,
                    offset: filter?.offset,
                  },
                })
              }
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

export default UnitsFilterDrawer;
