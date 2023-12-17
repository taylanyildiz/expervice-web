import SelectJobPriority from "@Components/SelectJobPriority";
import SelectJobSubType from "@Components/SelectJobSubType";
import SelectUnit from "@Components/SelectUnit";
import TextOutlineField from "@Components/TextOutlineField";
import Job from "@Models/job/job";
import { Grid, Stack, Typography } from "@mui/material";
import { FormikProps } from "formik";
import JobUnitInfoBox from "../components/JobUnitInfoBox";
import { isAvailableJobStatus } from "../helper/job_enum_helper";
import TranslateHelper from "@Local/index";

function JobDialogInfo(props: { formik: FormikProps<Job> }) {
  const formik = props.formik;
  const isEdit = Boolean(formik.values.id);
  const statusAvailable = isAvailableJobStatus(formik.values.status_id);

  return (
    <Grid container columnSpacing={1}>
      <Grid item xs={12} pb={1}>
        <Typography
          variant="h1"
          fontSize={15}
          children={TranslateHelper.jobInformation()}
        />
      </Grid>
      <Grid item xs={6}>
        <Stack>
          <SelectUnit
            disabled={isEdit}
            fullWidth
            label={TranslateHelper.unit()}
            clearIcon={false}
            value={formik.values.unit}
            helperText={formik.touched.unit && formik.errors.unit}
            error={Boolean(formik.touched.unit && formik.errors.unit)}
            onChanged={(unit) => {
              formik.setFieldValue("unit", unit);
            }}
          />
          <JobUnitInfoBox unit={formik.values.unit} />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <SelectJobSubType
          disableClearable
          disabled={isEdit}
          fullWidth
          clearIcon={false}
          label={TranslateHelper.jobSubType()}
          value={formik.values.sub_type_id}
          onChanged={(subType) => {
            formik.setFieldValue("sub_type", subType);
            formik.setFieldValue("sub_type_id", subType?.id);
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <SelectJobPriority
          disabled={!statusAvailable}
          fullWidth
          value={formik.values.priority_id}
          label={TranslateHelper.jobPriority()}
          onChanged={(priority) => {
            formik.setFieldValue("priority", priority);
            formik.setFieldValue("priority_id", priority?.id);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextOutlineField
          disabled={isEdit}
          fullWidth
          multiline
          name="notes"
          label={TranslateHelper.notes()}
          value={formik.values.description}
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
