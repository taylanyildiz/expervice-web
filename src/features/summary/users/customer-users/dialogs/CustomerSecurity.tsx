import DisabledComp from "@Components/DisabledComp";
import { useAccount } from "@Features/summary/company/helper/company_helper";
import TranslateHelper from "@Local/index";
import Customer from "@Models/customer/customer";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";

function CustomerSecurity(props: { formik: FormikProps<Customer> }) {
  const { formik } = props;

  /// Account store
  const { isOwner, isInternal } = useAccount();

  return (
    <DisabledComp disabled={!(isInternal || isOwner)}>
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
    </DisabledComp>
  );
}

export default CustomerSecurity;
