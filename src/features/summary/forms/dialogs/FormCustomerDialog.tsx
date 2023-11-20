import PrimaryButton from "@Components/PrimaryButton";
import SelectCustomer from "@Components/SelectCustomer";
import SelectJobStatus from "@Components/SelectJobStatus";
import SelectJobSubType from "@Components/SelectJobSubType";
import SelectUnitSubType from "@Components/SelectUnitSubType";
import TextOutlineField from "@Components/TextOutlineField";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import FormCustomer from "@Models/form/form_customer";
import Colors from "@Themes/colors";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { Box, DialogContent, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { object, string } from "yup";

interface FormCustomerDialogProps {
  onDone: (form: any) => Promise<boolean>;
}

function FormCustomerDialog(props: FormCustomerDialogProps) {
  const { onDone } = props;

  /// Dialog hook
  const { openLoading, closeDialog } = useDialog();

  /// submit hanle
  const onSubmitHandle = async (value: FormCustomer) => {
    const form = {
      name: value.name,
      customer_id: value.customer_user?.id,
      job_sub_type_id: value.job_sub_type?.id,
      unit_sub_type_id: value.unit_sub_type?.id,
      current_job_status_id: value.current_job_status?.id,
      next_job_status_id: value.next_job_status?.id,
    };
    const result = await openLoading(async () => {
      return await onDone(form);
    });
    if (!result) return;
    closeDialog();
  };

  /// Formik
  const initialValues: FormCustomer = {
    customer_user: undefined,
    current_job_status: undefined,
    next_job_status: undefined,
    name: "",
    job_sub_type: undefined,
    unit_sub_type: undefined,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: object({
      customer_user: object().nullable().required(),
      name: string().required().min(2, "Invalid name"),
      current_job_status: object().nullable().required(),
      next_job_status: object().nullable().required(),
      unit_sub_type: object().nullable().notRequired(),
      job_sub_type: object().nullable().notRequired(),
    }),
    onSubmit: onSubmitHandle,
  });

  /// Handle save
  const handleSave = () => {
    formik.handleSubmit();
  };

  return (
    <>
      <DialogCustomTitle title="Customer Form" />
      <Box
        p={1}
        sx={{ backgroundColor: Colors.warning, color: "white", fontSize: 11 }}
      >
        <Typography
          color="white"
          variant="h1"
          fontSize={14}
          children="Attention"
        />
        <Typography
          fontSize={11}
          color="white"
          children={
            <>
              *If you want to assign forms for all <b>UNITS</b> of the customer,
              do not select the unit type.
            </>
          }
        />
        <Typography
          fontSize={11}
          color="white"
          children={
            <>
              *If you want to assign forms for all <b>JOB TYPES</b> of the
              customer, do not select the job type.
            </>
          }
        />
      </Box>
      <DialogContent>
        <Box mt={1} p={1} sx={{ backgroundColor: "white" }}>
          <Grid container>
            <Grid item xs={12}>
              <SelectCustomer
                fullWidth
                label="Customer"
                value={formik.values.customer_user}
                helperText={
                  formik.touched.customer_user && formik.errors.customer_user
                }
                error={Boolean(
                  formik.touched.customer_user && formik.errors.customer_user
                )}
                onChanged={(customer) => {
                  formik.setFieldValue("customer_user", customer);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextOutlineField
                fullWidth
                name="name"
                label="Form Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                helperText={formik.touched.name && formik.errors.name}
                error={Boolean(formik.touched.name && formik.errors.name)}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectUnitSubType
                fullWidth
                label="Unit Sub Type"
                value={formik.values.unit_sub_type}
                helperText={
                  formik.touched.unit_sub_type && formik.errors.unit_sub_type
                }
                error={Boolean(
                  formik.touched.unit_sub_type && formik.errors.unit_sub_type
                )}
                onChanged={(type) => {
                  formik.setFieldValue("unit_sub_type", type);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectJobSubType
                fullWidth
                label="Job Sub Type"
                value={formik.values.job_sub_type}
                helperText={
                  formik.touched.job_sub_type && formik.errors.job_sub_type
                }
                error={Boolean(
                  formik.touched.job_sub_type && formik.errors.job_sub_type
                )}
                onChanged={(type) => {
                  formik.setFieldValue("job_sub_type", type);
                  formik.setFieldValue("current_job_status", null);
                  formik.setFieldValue("next_job_status", null);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container columnSpacing={1}>
                <Grid item xs={6}>
                  <SelectJobStatus
                    fullWidth
                    forForm
                    label="Current Job Status"
                    jobType={formik.values.job_sub_type?.type_id}
                    value={formik.values.current_job_status}
                    helperText={
                      formik.touched.current_job_status &&
                      formik.errors.current_job_status
                    }
                    error={Boolean(
                      formik.touched.current_job_status &&
                        formik.errors.current_job_status
                    )}
                    onChanged={(status) => {
                      formik.setFieldValue("current_job_status", status);
                      formik.setFieldValue("next_job_status", null);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SelectJobStatus
                    fullWidth
                    label="Next Job Status"
                    jobType={formik.values.current_job_status?.type_id}
                    jobStatus={formik.values.current_job_status?.id}
                    value={formik.values.next_job_status}
                    helperText={
                      formik.touched.next_job_status &&
                      formik.errors.next_job_status
                    }
                    error={Boolean(
                      formik.touched.next_job_status &&
                        formik.errors.next_job_status
                    )}
                    onChanged={(status) => {
                      formik.setFieldValue("next_job_status", status);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogCustomActions
        actions={[
          <PrimaryButton
            children="Save"
            fontWeight="normal"
            color="white"
            variant="contained"
            onClick={handleSave}
          />,
        ]}
      />
    </>
  );
}

export default FormCustomerDialog;
