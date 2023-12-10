import TranslateHelper from "@Local/index";
import TechnicianUser from "@Models/technician-user/technician_user";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";

function TechnicianSecurity(props: { formik: FormikProps<TechnicianUser> }) {
  const { formik } = props;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <Grid container>
            <Grid item flexGrow={1}>
              <Typography
                variant="h1"
                fontSize={15}
                children={TranslateHelper.securityLogin()}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Typography
          variant="h1"
          fontSize={13}
          children={TranslateHelper.userStatus()}
        />
      </Grid>
      <Grid item>
        <FormControlLabel
          checked={formik.values.is_active}
          onChange={() => formik.setFieldValue("is_active", true)}
          control={<Checkbox size="small" />}
          label={TranslateHelper.active()}
        />
      </Grid>
      <Grid item>
        <FormControlLabel
          checked={!formik.values.is_active}
          onChange={() => formik.setFieldValue("is_active", false)}
          control={<Checkbox size="small" />}
          label={TranslateHelper.inactive()}
        />
      </Grid>
    </Grid>
  );
}

export default TechnicianSecurity;
