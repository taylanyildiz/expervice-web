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
import TechnicianFilter from "@Models/technician-user/technician_filter";
import { useTechnician } from "../helper/technician_helper";
import { useEffect } from "react";
import TextOutlineField from "@Components/TextOutlineField";
import SelectTechnicianFilterType from "./SelectTechnicianFilterType";
import SelectTechnicianStatuses from "./SelectTechnicianStatuses";
import { useDispatch } from "react-redux";
import {
  setFilter,
  setTechnicianFilterDrawerStatus,
} from "@Store/technician_store";
import SelectGroupRoles from "./SelectGroupRoles";
import { ETechnicianFilterType } from "../entities/technician_enums";
import SelectUserGroups from "@Features/summary/components/SelectUserGroups";
import { SelectRegions } from "@Components/index";

function TechnicianFilterDrawer() {
  /// Technician store
  const { filter, technicianFilterDrawerStatus } = useTechnician();

  /// Dispatch
  const dispatch = useDispatch();

  /// Close drawer
  const handleClose = () => {
    dispatch(setTechnicianFilterDrawerStatus(false));
  };

  /// Submit handle
  const onSubmitHandle = async (values: TechnicianFilter) => {
    dispatch(setFilter(values));
  };

  /// Formik
  const initialValues: TechnicianFilter = {
    end_date: "",
    keyword: "",
    filter_type: ETechnicianFilterType.FirstName,
    group_roles: [],
    region_ids: [],
    groups: [],
    statuses: [],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: onSubmitHandle,
  });

  /// Initialize component
  useEffect(() => {
    if (!filter) return;
    for (let [k, v] of Object.entries(filter)) {
      formik.setFieldValue(k, v);
    }
  }, [filter]);

  return (
    <Drawer
      anchor="right"
      open={technicianFilterDrawerStatus}
      onClose={handleClose}
    >
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
              children="Technicians Filter" // TODO: Translations
            />
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
          {/* Content */}
          <Stack
            height="100%"
            sx={{ borderBottom: 1, borderColor: "divider" }}
            p={1}
          >
            <TextOutlineField
              height={30}
              fullWidth
              name="keyword"
              label={TranslateHelper.keyword()}
              value={formik.values.keyword}
              onChange={formik.handleChange}
            />
            <SelectTechnicianFilterType
              fullWidth
              label={TranslateHelper.filterType()}
              value={formik.values.filter_type}
              onChanged={(value) => {
                formik.setFieldValue("filter_type", value);
              }}
            />
            <SelectTechnicianStatuses
              fullWidth
              label="Technician Status" // TODO: Translations
              values={formik.values.statuses}
              onChanged={(values) => {
                formik.setFieldValue("statuses", values);
              }}
            />
            <SelectGroupRoles
              fullWidth
              values={formik.values.group_roles}
              label="Group Roles" // TODO: Translations
              onChanged={(values) => {
                formik.setFieldValue(
                  "group_roles",
                  values?.map((e) => e.id!)
                );
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
              regions={formik.values.region_ids}
              values={formik.values.groups}
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
              onClick={() => {
                formik.resetForm({
                  values: {
                    ...initialValues,
                    limit: filter.limit,
                    offset: filter.offset,
                  },
                });
              }}
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

export default TechnicianFilterDrawer;
