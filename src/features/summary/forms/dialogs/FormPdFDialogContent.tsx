import PrimaryButton from "@Components/PrimaryButton";
import TextOutlineField from "@Components/TextOutlineField";
import Form from "@Models/form/form";
import { Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import AddIcon from "@mui/icons-material/Add";
import FormFields from "../components/fields/FormFields";
import { useFormDialog } from "../helper/form_helper";

interface FormPdFDialogContentProps {
  formik: FormikProps<Form>;
}

function FormPdFDialogContent(props: FormPdFDialogContentProps) {
  const { formik } = props;
  const fields = formik.values.fields ?? [];

  /// Form Dialog hook
  const { openFieldDialog } = useFormDialog();

  /// Add field
  const onAddField = async () => {
    const result = await openFieldDialog();
    if (!result) return;
  };

  return (
    <Grid container columnSpacing={10}>
      <Grid item xs={6}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h1" fontSize={15} children="Form Content" />
          </Grid>
          <Grid item xs={12} mt={1}>
            <TextOutlineField
              fullWidth
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h1" fontSize={15} children="Form Fields" />
          </Grid>
          <FormFields fields={fields} />
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
      <Grid item xs={6}>
        {/* PDF */}
        <p>test</p>
      </Grid>
    </Grid>
  );
}

export default FormPdFDialogContent;
