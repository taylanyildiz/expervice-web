import PrimaryButton from "@Components/PrimaryButton";
import SelectFormFieldType from "@Components/SelectFormFieldType";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import Field from "@Models/form/field";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { Box, DialogContent, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import FieldDefaultValue from "../components/fields/FieldDefaultValue";
import TextOutlineField from "@Components/TextOutlineField";
import { array, object, string } from "yup";
import { EFormFielType } from "../entities/form_enums";

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
  };
  const formik = useFormik({
    initialValues,
    validationSchema: object({
      field_type: object().nullable().required(),
      label: string().required().min(2, "Invalid label"),
      description: string()
        .nullable()
        .notRequired()
        .min(2, "Invalid description"),
      options: array().when(["field_type_id"], {
        is: (fieldType: number | null) => {
          const isDropdown = fieldType === EFormFielType.DropDown;
          return !isDropdown;
        },
        then: () => array().nullable().notRequired(),
        otherwise: () =>
          array()
            .nullable()
            .of(
              object({
                label: string().nullable().required().min(2, "Invalid label"),
              })
            )
            .min(1, "Min 1 option"),
      }),
    }),
    onSubmit: onSubmitHandle,
  });

  /// Initialize component
  useEffect(() => {
    if (!field) return;
    for (let [k, v] of Object.entries(field)) {
      formik.setFieldValue(k, v);
    }
  }, [field]);

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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={12}>
              <FieldDefaultValue formik={formik} />
            </Grid>
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
