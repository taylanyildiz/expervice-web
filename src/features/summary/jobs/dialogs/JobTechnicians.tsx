import { Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { FormikErrors, FormikProps, FormikTouched } from "formik";
import Job from "@Models/job/job";
import PrimaryButton from "@Components/PrimaryButton";
import SelectAvailableTechnicians from "@Components/SelectAvailableTechnicians";
import SelectJobRole from "@Components/SelectJobRole";
import TechnicianUser from "@Models/technician-user/technician_user";
import JobRole from "@Models/job/job_role";
import { EJobRoles } from "../entities/job_enums";
import JobTechnician from "@Models/job/job_technician";

function JobTechnicians(props: { formik: FormikProps<Job> }) {
  const { formik } = props;
  const technicians =
    formik.values?.job_technicians?.map((e) => ({ ...e })) ?? [];

  /// Add technician handle
  const onAddHandle = () => {
    technicians.push({
      technician_user: undefined,
      job_role: undefined,
      role_id: EJobRoles.Asigned,
    });
    formik.setFieldValue("job_technicians", technicians);
  };

  /// Delete technician handle
  const onDeleteHandle = (index: number) => {
    const values = technicians.filter((_, i) => i !== index);
    formik.setFieldValue("job_technicians", values);
  };

  const onChangedTechnician = (
    technician: TechnicianUser | null | undefined,
    index: number
  ) => {
    if (!technician) return;
    technicians[index].technician_user = technician;
    formik.setFieldValue("job_technicians", technicians);
  };

  const onChangedJobrole = (
    role: JobRole | null | undefined,
    index: number
  ) => {
    if (!role) return;
    technicians[index].job_role = role;
    technicians[index].role_id = role.id;
    formik.setFieldValue("job_technicians", technicians);
  };

  const jobTechnicianError = formik.errors
    .job_technicians as FormikErrors<JobTechnician>[];
  const jobTechnicianTouched = formik.touched
    .job_technicians as FormikTouched<JobTechnician>[];

  return (
    <Grid container>
      <Grid item xs={12} pb={1}>
        <Typography variant="h1" fontSize={15} children="Technicians" />
      </Grid>
      {technicians?.map((technician, index) => (
        <Grid key={index} item xs={12}>
          <Grid container alignItems="center">
            <Grid item flex={1}>
              <Grid container columnSpacing={1}>
                <Grid item xs={7}>
                  <SelectAvailableTechnicians
                    fullWidth
                    label="Technician"
                    unitId={formik.values.unit?.id}
                    jobSubTypeId={formik.values?.sub_type_id}
                    value={technician.technician_user}
                    selecteds={technicians
                      .filter((e) => e.technician_user)
                      .map((e) => e.technician_user?.id)}
                    onChanged={(v) => {
                      onChangedTechnician(v, index);
                    }}
                    helperText={
                      jobTechnicianError &&
                      jobTechnicianTouched &&
                      jobTechnicianTouched[index] &&
                      jobTechnicianError[index]?.technician_user
                    }
                    error={
                      jobTechnicianError &&
                      jobTechnicianTouched &&
                      jobTechnicianTouched[index] &&
                      jobTechnicianTouched[index]?.technician_user
                    }
                  />
                </Grid>
                <Grid item xs={5}>
                  <SelectJobRole
                    fullWidth
                    label="Job Role"
                    value={technician.role_id}
                    onChanged={(v) => {
                      onChangedJobrole(v, index);
                    }}
                    helperText={
                      jobTechnicianError &&
                      jobTechnicianTouched &&
                      jobTechnicianTouched[index] &&
                      jobTechnicianError[index]?.role_id
                    }
                    error={
                      jobTechnicianError &&
                      jobTechnicianTouched &&
                      jobTechnicianTouched[index] &&
                      jobTechnicianTouched[index]?.role_id
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton onClick={() => onDeleteHandle(index)}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <PrimaryButton
          onClick={onAddHandle}
          variant="text"
          fontWeight="normal"
          fontSize={13}
          color="blue"
          prefix={<AddIcon />}
          children="Add Technician"
        />
      </Grid>
    </Grid>
  );
}

export default JobTechnicians;
