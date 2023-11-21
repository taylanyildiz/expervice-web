import PrimaryButton from "@Components/PrimaryButton";
import SelectFormFieldType from "@Components/SelectFormFieldType";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import Field from "@Models/form/field";
import { useDialog } from "@Utils/hooks/dialog_hook";
import {
  Box,
  Checkbox,
  DialogContent,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import FieldDefaultValue from "../components/FieldDefaultValue";
import TextOutlineField from "@Components/TextOutlineField";
import { formFieldValidator } from "../validator/form_validator";
import VisibilityComp from "@Components/VisibilityComp";

interface FormFieldDialogProps {
  field?: Field;
  onDone: (field: Field) => void;
}

function FormFieldDialog(props: FormFieldDialogProps) {
  const { field, onDone } = props;

  /// Dialog hook
  const { closeDialog } = useDialog();

  const onSubmitHandle = (value: Field) => {
    closeDialog();
    onDone(value);
  };

  /// Formik
  const initialValues: Field = {
    options: [],
    default_value: "",
    field_type: undefined,
    label: "",
    description: "",
    mandantory: false,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: formFieldValidator,
    onSubmit: onSubmitHandle,
  });

  /// Initialize component
  useEffect(() => {
    if (!field) return;
    for (let [k, v] of Object.entries(field)) {
      formik.setFieldValue(k, v);
    }
  }, [field]);

  /// Field type is [Title]
  const isTitle = formik.values.field_type?.id === 4;

  return (
    <>
      <DialogCustomTitle title="Form Field" />
      <DialogContent>
        <Box mt={1} p={1} sx={{ backgroundColor: "white" }}>
          <Grid container columnSpacing={1}>
            <Grid item xs={12}>
              <SelectFormFieldType
                fullWidth
                label="Field Type"
                value={formik.values.field_type}
                helperText={
                  formik.touched.field_type && formik.errors.field_type
                }
                error={Boolean(
                  formik.touched.field_type && formik.errors.field_type
                )}
                onChanged={(type) => {
                  formik.setFieldValue("field_type", type);
                  formik.setFieldValue("field_type_id", type?.id);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextOutlineField
                fullWidth
                label="Field Label"
                name="label"
                helperText={formik.touched.label && formik.errors.label}
                error={Boolean(formik.touched.label && formik.errors.label)}
                value={formik.values.label}
                onChange={formik.handleChange}
              />
            </Grid>

            <VisibilityComp visibility={!isTitle}>
              <Grid item xs={12}>
                <TextOutlineField
                  fullWidth
                  label="Field Description"
                  name="description"
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                  error={Boolean(
                    formik.touched.description && formik.errors.description
                  )}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </Grid>
            </VisibilityComp>

            <Grid item xs={12}>
              <FieldDefaultValue formik={formik} />
            </Grid>

            <VisibilityComp visibility={!isTitle}>
              <Grid item>
                <FormControlLabel
                  checked={formik.values.mandantory}
                  onChange={(_, checked) =>
                    formik.setFieldValue("mandantory", checked)
                  }
                  control={<Checkbox size="small" />}
                  label={"Is Required field"}
                />
              </Grid>
            </VisibilityComp>
          </Grid>
        </Box>
      </DialogContent>
      <DialogCustomActions
        actions={[
          <PrimaryButton
            height={30}
            fontWeight="normal"
            color="black"
            children="Close"
            variant="outlined"
            onClick={() => {
              closeDialog();
            }}
          />,
          <PrimaryButton
            height={30}
            fontWeight="normal"
            color="white"
            children="Save"
            onClick={() => formik.handleSubmit()}
          />,
        ]}
      />
    </>
  );
}

export default FormFieldDialog;
