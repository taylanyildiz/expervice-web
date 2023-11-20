import { Box, Divider, Drawer, Stack, Typography } from "@mui/material";
import { useUnit } from "../helper/unit_helper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@Store/index";
import { setUnitFilter, setUnitsFilterDrawer } from "@Store/unit_store";
import TextOutlineField from "@Components/TextOutlineField";
import SelectUnitFilterType from "./SelectUnitFilterType";
import PrimaryButton from "@Components/PrimaryButton";
import { EUnitFilterType } from "../entities/unit_enums";
import UnitFilter from "@Models/units/unit_filter";
import { useFormik } from "formik";
import { useEffect } from "react";

function UnitsFilterDrawer() {
  /// Unit store
  const { unitsFilterDrawerStatus: open, filter } = useUnit();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

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
    filter_type: EUnitFilterType.Name,
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
  }, [filter]);

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box width={300} height="100%">
        <Stack spacing={1} height="100%">
          <Typography
            p={1}
            variant="h1"
            fontSize={14}
            children="Units Filter"
          />
          <Divider />
          <Stack
            sx={{ borderBottom: 1, borderColor: "divider" }}
            p={1}
            height="100%"
          >
            <TextOutlineField
              height={30}
              fullWidth
              name="keyword"
              label="Keyword"
              value={formik.values.keyword}
              onChange={formik.handleChange}
            />
            <SelectUnitFilterType
              fullWidth
              label="Filter Type"
              value={formik.values.filter_type}
              onChanged={(e) => {
                formik.setFieldValue("filter_type", e);
              }}
            />
          </Stack>
          <Stack p={1} justifyContent="end" spacing={1} direction="row">
            <PrimaryButton
              variant="outlined"
              fontWeight="normal"
              children="Clear Filter"
              onClick={() =>
                formik.resetForm({
                  values: {
                    keyword: "",
                    filter_type: EUnitFilterType.Name,
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
              children="Apply Filter"
              onClick={() => formik.handleSubmit()}
            />
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
}

export default UnitsFilterDrawer;
