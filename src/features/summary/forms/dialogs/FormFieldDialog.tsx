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
  const initialValues: Field = {};
  const formik = useFormik({
    initialValues,
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
          <Grid container>
            <Grid item xs={12}>
              <SelectFormFieldType
                fullWidth
                label="Field Type"
                value={formik.values.field_type}
                onChanged={(type) => {
                  formik.setFieldValue("field_type", type);
                  formik.setFieldValue("field_type_id", type?.id);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextOutlineField
                fullWidth
                label="Field Description"
                name="description"
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
