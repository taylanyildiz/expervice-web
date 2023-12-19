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
import TranslateHelper from "@Local/index";

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
    default_value: undefined,
    field_type: undefined,
    label: "",
    description: "",
    mandatory: false,
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
      <DialogCustomTitle title={TranslateHelper.formField()} />
      <DialogContent>
        <Box mt={1} p={1} sx={{ backgroundColor: "white" }}>
          <Grid container columnSpacing={1}>
            <Grid item xs={12}>
              <SelectFormFieldType
                fullWidth
                label={TranslateHelper.fieldType()}
                value={formik.values.field_type}
                helperText={
                  formik.touched.field_type && formik.errors.field_type
                }
                error={Boolean(
                  formik.touched.field_type && formik.errors.field_type
                )}
                onChanged={(type) => {
                  formik.resetForm({ values: initialValues });
                  formik.setFieldValue("field_type", type);
                  formik.setFieldValue("field_type_id", type?.id);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextOutlineField
                fullWidth
                label={TranslateHelper.fieldLabel()}
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
                  label={TranslateHelper.fieldDescription()}
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
                  checked={formik.values.mandatory}
                  onChange={(_, checked) =>
                    formik.setFieldValue("mandatory", checked)
                  }
                  control={<Checkbox size="small" />}
                  label={TranslateHelper.isRequiredField()}
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
            children={TranslateHelper.close()}
            variant="outlined"
            onClick={() => {
              closeDialog();
            }}
          />,
          <PrimaryButton
            height={30}
            fontWeight="normal"
            color="white"
            children={TranslateHelper.save()}
            onClick={() => formik.handleSubmit()}
          />,
        ]}
      />
    </>
  );
}

export default FormFieldDialog;
