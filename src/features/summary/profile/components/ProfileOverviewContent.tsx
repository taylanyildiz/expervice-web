import TextOutlineField from "@Components/TextOutlineField";
import User from "@Models/user";
import { Grid, Stack, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { PhoneMask } from "@Components/TextInputMask";
import { phoneMaskParse } from "@Utils/functions";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import PrimaryButton from "@Components/PrimaryButton";
import { useProfileDialog } from "../helper/profile_helper";
import TranslateHelper from "@Local/index";

interface ProfileOverviewContentProps {
  formik: FormikProps<User>;
}

function ProfileOverviewContent(props: ProfileOverviewContentProps) {
  const { formik } = props;
  const values = formik.values;
  const phoneNumber = `${values.user_phone?.phone_code}${values.user_phone?.phone_number}`;

  /// Profile dialog hook
  const { openResetPasswordDailog } = useProfileDialog();

  return (
    <Grid container columnSpacing={1}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography
            variant="h1"
            fontSize={15}
            children={TranslateHelper.overView()}
          />
          <PrimaryButton
            variant="outlined"
            fontWeight="normal"
            children={TranslateHelper.resetPassword()}
            prefix={<LockPersonOutlinedIcon />}
            onClick={() => {
              openResetPasswordDailog();
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <TextOutlineField
          fullWidth
          name="first_name"
          label={TranslateHelper.firstName()}
          value={formik.values.first_name}
          onChange={formik.handleChange}
          helperText={formik.touched.first_name && formik.errors.first_name}
          error={Boolean(formik.touched.first_name && formik.errors.first_name)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextOutlineField
          fullWidth
          name="last_name"
          label={TranslateHelper.lastName()}
          onChange={formik.handleChange}
          value={formik.values.last_name}
          helperText={formik.touched.last_name && formik.errors.last_name}
          error={Boolean(formik.touched.last_name && formik.errors.last_name)}
        />
      </Grid>
      <Grid item xs={6}>
        <Grid container direction="column">
          <Grid item>
            <TextOutlineField
              fullWidth
              name="email"
              label={TranslateHelper.email()}
              onChange={formik.handleChange}
              value={formik.values.email}
              helperText={formik.touched.email && formik.errors.email}
              error={Boolean(formik.touched.email && formik.errors.email)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextOutlineField
              fullWidth
              name="user_phone"
              label={TranslateHelper.phone()}
              type="tel"
              onChange={(e) => {
                const value = e.target.value ?? "";
                const { code, number } = phoneMaskParse(value)!;
                formik.setFieldValue("user_phone.phone_code", code);
                formik.setFieldValue("user_phone.phone_number", number);
              }}
              value={phoneNumber}
              helperText={formik.touched.user_phone && formik.errors.user_phone}
              error={Boolean(
                formik.touched.user_phone && formik.errors.user_phone
              )}
              inputComponent={PhoneMask}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileOverviewContent;
