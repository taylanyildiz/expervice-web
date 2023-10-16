import StatusBox from "@Components/StatusBox";
import TechnicianUser from "@Models/technician-user/technician_user";
import { Box, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { useTechnician } from "../helper/technician_helper";
import TechnicianStatusButton from "./TechnicianStatusButton";
import TextOutlineField from "@Components/TextOutlineField";
import SelectUserGroup from "@Components/SelectUserGroup";
import SelectGroupRole from "@Components/SelectGroupRole";

interface TechnicianContactProps {
  formik: FormikProps<TechnicianUser>;
}

function Header(props: { formik: FormikProps<TechnicianUser> }) {
  const { formik } = props;
  const { technician } = useTechnician();
  const email = technician?.email;
  const status = technician?.status;
  return (
    <Box mb={2} py={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Grid container>
        <Grid item flex={1}>
          <Grid container columnSpacing={1}>
            <Grid item>
              <Typography
                variant="h1"
                fontSize={14}
                children="Contact Information"
              />
            </Grid>
            <Grid item>
              <StatusBox email={email} status={status!} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TechnicianStatusButton formik={formik} />
        </Grid>
      </Grid>
    </Box>
  );
}

function TechnicianContactInformation(props: TechnicianContactProps) {
  const { formik } = props;
  return (
    <>
      <Header formik={formik} />
      <Grid container columnSpacing={1}>
        <Grid item xs={6}>
          <TextOutlineField
            fullWidth
            name="first_name"
            label="First Name"
            onChange={formik.handleChange}
            value={formik.values.first_name}
            helperText={formik.touched.first_name && formik.errors.first_name}
            error={Boolean(
              formik.touched.first_name && formik.errors.first_name
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <TextOutlineField
            fullWidth
            name="last_name"
            label="Last Name"
            onChange={formik.handleChange}
            value={formik.values.last_name}
            helperText={formik.touched.last_name && formik.errors.last_name}
            error={Boolean(formik.touched.last_name && formik.errors.last_name)}
          />
        </Grid>
        <Grid item xs={8}>
          <TextOutlineField
            fullWidth
            name="email"
            label="Email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            helperText={formik.touched.email && formik.errors.email}
            error={Boolean(formik.touched.email && formik.errors.email)}
          />
        </Grid>
        <Grid item xs={8}>
          <TextOutlineField
            fullWidth
            name="phone"
            label="Phone"
            type="tel"
            onChange={formik.handleChange}
            value={formik.values.phone}
            helperText={formik.touched.phone && formik.errors.phone}
            error={Boolean(formik.touched.phone && formik.errors.phone)}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectUserGroup
            fullWidth
            label="Group"
            onChanged={(group) => {
              formik.setFieldValue("group", group);
            }}
            value={formik.values.group}
            helperText={formik.touched.group && formik.errors.group}
            error={Boolean(formik.touched.group && formik.errors.group)}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectGroupRole
            fullWidth
            label="Group Role"
            onChanged={(role) => {
              formik.setFieldValue("group_role", role);
            }}
            value={formik.values.group_role}
            helperText={formik.touched.group_role && formik.errors.group_role}
            error={Boolean(
              formik.touched.group_role && formik.errors.group_role
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default TechnicianContactInformation;