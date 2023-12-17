import { useDispatch } from "react-redux";
import { useForm } from "../helper/form_helper";
import FormFilter from "@Models/form/form_filter";
import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { setFormFilter, setFormFilterDrawerStatus } from "@Store/form_store";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import PrimaryButton from "@Components/PrimaryButton";
import TranslateHelper from "@Local/index";
import TextOutlineField from "@Components/TextOutlineField";

function FormFilterDrawer() {
  /// Form store
  const { formFilterDrawerStatus: open, formFilter } = useForm();

  /// Dispatch
  const dispatch = useDispatch();

  /// Close handle
  const handleClose = () => {
    dispatch(setFormFilterDrawerStatus(false));
  };

  /// Submit
  const handleSubmit = (values: FormFilter) => {
    dispatch(setFormFilter(values));
  };

  /// Formik
  const initialValues: FormFilter = {
    name: "",
    end_date: "",
    start_date: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <Drawer open={open} anchor="right" onClose={handleClose}>
      <Box height="100%" width={300}>
        <Stack spacing={1} height="100%">
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
              children={TranslateHelper.formsFilter()}
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
              name="name"
              height={30}
              label={TranslateHelper.name()}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Stack>
          <Stack p={1} spacing={1} direction="row" justifyContent="end">
            <PrimaryButton
              variant="outlined"
              children={TranslateHelper.clearFilter()}
              fontWeight="normal"
              onClick={() => {
                formik.resetForm({
                  values: {
                    ...initialValues,
                    limit: formFilter?.limit,
                    offset: formFilter?.offset,
                  },
                });
              }}
            />
            <PrimaryButton
              variant="contained"
              children={TranslateHelper.applyFilter()}
              color="white"
              fontWeight="normal"
              onClick={() => formik.handleSubmit()}
            />
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
}

export default FormFilterDrawer;
