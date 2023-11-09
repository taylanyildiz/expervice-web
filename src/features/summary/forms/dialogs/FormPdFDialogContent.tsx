import PrimaryButton from "@Components/PrimaryButton";
import TextOutlineField from "@Components/TextOutlineField";
import Form from "@Models/form/form";
import { Box, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import AddIcon from "@mui/icons-material/Add";
import FormFields from "../components/fields/FormFields";
import { useForm, useFormDialog } from "../helper/form_helper";
import LoadingComp from "@Components/LoadingComp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormRepository from "@Repo/form_repository";

interface FormPdFDialogContentProps {
  formik: FormikProps<Form>;
}

function FormPdFDialogContent(props: FormPdFDialogContentProps) {
  const { formik } = props;
  const fields = formik.values.fields ?? [];

  /// Form repository
  const formRepo = new FormRepository();

  /// Form store
  const { formPdfTemplate } = useForm();

  /// Form Dialog hook
  const { openFieldDialog } = useFormDialog();

  /// Add field
  const onAddField = async () => {
    const result = await openFieldDialog();
    if (!result) return;
    formik.setFieldValue("fields", [...fields, result]);
  };

  /// Handle review form
  const onReviewHandle = () => {
    formRepo.formPdfTemplate({
      name: formik.values.name,
      fields: formik.values.fields,
    });
  };

  return (
    <Grid container columnSpacing={10}>
      <Grid item xs={5}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h1" fontSize={15} children="Form Content" />
          </Grid>
          <Grid item xs={12} mt={1}>
            <TextOutlineField
              fullWidth
              name="name"
              label="Name"
              helperText={formik.touched.name && formik.errors.name}
              error={Boolean(formik.touched.name && formik.errors.name)}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h1" fontSize={15} children="Form Fields" />
          </Grid>
          <FormFields formik={formik} />
          <Grid item xs={12} mt={2}>
            <PrimaryButton
              color="blue"
              prefix={<AddIcon />}
              children="Add Field"
              variant="text"
              onClick={() => onAddField()}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <PrimaryButton
          suffix={<ChevronRightIcon />}
          variant="outlined"
          children="Review"
          color="blue"
          onClick={onReviewHandle}
        />
      </Grid>
      <Grid item xs={5}>
        <Box sx={{ height: 500 }}>
          <LoadingComp loading={!Boolean(formPdfTemplate)}>
            <embed
              width="100%"
              height="100%"
              src={`data:application/pdf;base64,${formPdfTemplate}`}
            />
          </LoadingComp>
        </Box>
      </Grid>
    </Grid>
  );
}

export default FormPdFDialogContent;
