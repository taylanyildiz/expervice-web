import SelectJobPriority from "@Components/SelectJobPriority";
import SelectJobSubType from "@Components/SelectJobSubType";
import SelectUnit from "@Components/SelectUnit";
import TextOutlineField from "@Components/TextOutlineField";
import Job from "@Models/job/job";
import { Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";

function JobDialogInfo(props: { formik: FormikProps<Job> }) {
  const formik = props.formik;

  return (
    <Grid container columnSpacing={1}>
      <Grid item xs={12} pb={1}>
        <Typography variant="h1" fontSize={15} children="Job Info" />
      </Grid>
      <Grid item xs={6}>
        <SelectUnit
          fullWidth
          label="Unit"
          clearIcon={false}
          value={formik.values.unit}
          onChanged={(unit) => {
            formik.setFieldValue("unit", unit);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <SelectJobSubType
          fullWidth
          label="Job Sub Type"
          value={formik.values.sub_type_id}
          onChanged={(subType) => {
            formik.setFieldValue("sub_type", subType);
            formik.setFieldValue("sub_type_id", subType?.id);
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <SelectJobPriority
          fullWidth
          value={formik.values.priority_id}
          label="Job Priority"
          onChanged={(priority) => {
            formik.setFieldValue("priority", priority);
            formik.setFieldValue("priority_id", priority?.id);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextOutlineField
          fullWidth
          multiline
          name="notes"
          label="Notes"
          value={formik.values.job_statuses?.[0].description}
          onChange={(e) => {
            const value = e.target.value;
            formik.setFieldValue("description", value);
          }}
          helperText={formik.touched.description && formik.errors.description}
          error={Boolean(
            formik.touched.description && formik.errors.description
          )}
          minRows={4}
          maxRows={4}
        />
      </Grid>
    </Grid>
  );
}

export default JobDialogInfo;
