import InternalUser from "@Models/internal-user/internal_user";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";

function InternalUserSecurityContent(props: {
  formik: FormikProps<InternalUser>;
}) {
  const { formik } = props;
  return (
    <Grid container>
      <Grid item xs={12} children={<Header />} />
      <Grid item xs={12} mt={2}>
        <Typography variant="h1" fontSize={13} children="User Status" />
      </Grid>
      <Grid item>
        <FormControlLabel
          checked={formik.values.is_active}
          onChange={() => formik.setFieldValue("is_active", true)}
          control={<Checkbox size="small" />}
          label={"Active"}
        />
      </Grid>
      <Grid item>
        <FormControlLabel
          checked={!formik.values.is_active}
          onChange={() => formik.setFieldValue("is_active", false)}
          control={<Checkbox size="small" />}
          label={"Inactive"}
        />
      </Grid>
    </Grid>
  );
}

export default InternalUserSecurityContent;

function Header() {
  return (
    <Box>
      <Grid container>
        <Grid item flexGrow={1}>
          <Typography variant="h1" fontSize={15} children="Security & Login" />
        </Grid>
      </Grid>
    </Box>
  );
}
