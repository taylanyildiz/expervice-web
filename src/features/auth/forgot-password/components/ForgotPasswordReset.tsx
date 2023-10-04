import { Grid, Typography } from "@mui/material";
import TextOutlineField from "@Components/TextOutlineField";
import { useForgotPassword } from "@Utils/hooks/forgot_password_hook";
import PrimaryButton from "@Components/PrimaryButton";
import { useFormik } from "formik";
import AuthRepository from "@Repo/auth_repository";
import { useDialog } from "@Utils/hooks/dialog_hook";

function ForgotPasswordReset() {
  /// Forgot password hooks
  const { steps, onNext } = useForgotPassword();
  const desc = steps[2].desc;

  /// Authentication repo
  const authRepo = new AuthRepository();

  /// Dialog hook
  const { openLoading } = useDialog();

  /// Next button clikc handle
  const onNextHandle = () => {
    formik.handleSubmit();
  };

  /// Submit handle
  const onSubmitHandle = async (values: {
    password: string;
    confirm_password: string;
  }) => {
    const email = sessionStorage.getItem("forgot_password_email");
    const code = sessionStorage.getItem("forgot_password_code");
    if (!email || !code) return;
    const result = await openLoading(async () => {
      return authRepo.resetPassword({ password: values.password, email, code });
    });
    if (!result) return;
    onNext();
  };

  /// formik
  const initialValues = { password: "", confirm_password: "" };
  const formik = useFormik({
    initialValues,
    onSubmit: onSubmitHandle,
  });

  return (
    <Grid container>
      <Grid item>
        <Typography variant="subtitle2" fontSize={13} children={desc} />
      </Grid>
      <Grid item xs={12} mt={2}>
        <TextOutlineField
          fullWidth
          secret
          label="Password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          helperText={formik.touched.password && formik.errors.password}
          error={Boolean(formik.errors.password && formik.touched.password)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextOutlineField
          fullWidth
          secret
          label="Confirm Password"
          name="confirm_password"
          onChange={formik.handleChange}
          value={formik.values.confirm_password}
          helperText={
            formik.touched.confirm_password && formik.errors.confirm_password
          }
          error={Boolean(
            formik.errors.confirm_password && formik.touched.confirm_password
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <PrimaryButton
          fullWidth
          height={30}
          fontSize={13}
          children="Reset Password"
          color="white"
          fontWeight="normal"
          onClick={onNextHandle}
        />
      </Grid>
    </Grid>
  );
}

export default ForgotPasswordReset;
