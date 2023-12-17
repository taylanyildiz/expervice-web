import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useInternal } from "../helper/internal_user_helper";
import { useDispatch } from "react-redux";
import {
  setFilter,
  setInternalUserFilterDrawerStatus,
} from "@Store/internal_user_store";
import CloseIcon from "@mui/icons-material/Close";
import PrimaryButton from "@Components/PrimaryButton";
import TranslateHelper from "@Local/index";
import InternalUserFilter from "@Models/internal-user/internal_user_filter";
import { useFormik } from "formik";
import { EInternalFilterType } from "../entities/internal_user_enums";
import TextOutlineField from "@Components/TextOutlineField";
import SelectInternalFilterType from "./SelectInternalFilterType";
import SelectInternalStatuses from "./SelectInternalStatuses";
import SelectUserRoles from "@Features/summary/components/SelectUserRoles";

function InternalUserFilterDrawer() {
  /// Internal user store
  const { internalUserFilterDrawerStatus: open, filter } = useInternal();

  /// Dispatch
  const dispatch = useDispatch();

  /// Close drawer
  const handleClose = () => {
    dispatch(setInternalUserFilterDrawerStatus(false));
  };

  /// Submit
  const handleSubmit = (values: InternalUserFilter) => {
    dispatch(setFilter(values));
  };

  /// Formik
  const initialValues: InternalUserFilter = {
    end_date: "",
    start_date: "",
    filter_type: EInternalFilterType.Email,
    keyword: "",
    role_ids: [],
    statuses: [],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

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
              children={TranslateHelper.internalUsersFilter()}
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
            <SelectInternalFilterType
              fullWidth
              label={TranslateHelper.filterType()}
              value={formik.values.filter_type}
              onChanged={(value) => {
                formik.setFieldValue("filter_type", value);
              }}
            />
            <SelectInternalStatuses
              fullWidth
              label={TranslateHelper.internalUserStatuses()}
              values={formik.values.statuses}
              onChanged={(values) => {
                formik.setFieldValue("statuses", values);
              }}
            />
            <SelectUserRoles
              label={TranslateHelper.userRoles()}
              fullWidth
              values={formik.values.role_ids}
              roleType={3}
              onChanged={(values) => {
                formik.setFieldValue(
                  "role_ids",
                  values?.map((e) => e.id!)
                );
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

export default InternalUserFilterDrawer;
