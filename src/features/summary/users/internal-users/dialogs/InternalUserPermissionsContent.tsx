import { Box, Grid, Typography } from "@mui/material";
import InternalUserPermission from "./InternalUserPermission";
import SelectUserRole from "@Components/SelectUserRole";
import { FormikProps } from "formik";
import InternalUser from "@Models/internal-user/internal_user";

function InternalUserPermissionsContent(props: {
  formik: FormikProps<InternalUser>;
}) {
  const { formik } = props;

  return (
    <Grid container>
      <Grid item xs={12} children={<Header />} />
      <Grid item xs={4} mt={2}>
        <SelectUserRole
          fullWidth
          label="Role"
          roleType={3}
          value={formik.values.role_id}
          helperText={formik.touched.role_id && formik.errors.role_id}
          error={Boolean(formik.touched.role_id && formik.errors.role_id)}
          onChanged={(value) => {
            formik.setFieldValue("role_id", value?.id);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <InternalUserPermission formik={formik} />
      </Grid>
    </Grid>
  );
}

function Header() {
  return (
    <Box>
      <Grid container>
        <Grid item flexGrow={1}>
          <Typography variant="h1" fontSize={15} children="Permissions" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default InternalUserPermissionsContent;
