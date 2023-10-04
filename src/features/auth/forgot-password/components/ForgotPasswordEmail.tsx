import { Grid, Typography } from "@mui/material";
import TextOutlineField from "@Components/TextOutlineField";
import { useForgotPassword } from "@Utils/hooks/forgot_password_hook";
import PrimaryButton from "@Components/PrimaryButton";
import { useFormik } from "formik";
import { object, string } from "yup";
import AuthRepository from "@Repo/auth_repository";
import { useDialog } from "@Utils/hooks/dialog_hook";

function ForgotPasswordEmail() {
  /// Forgot password hooks
  const { steps, onNext } = useForgotPassword();
  const desc = steps[0].desc;

  /// Dialog hook
  const { openLoading } = useDialog();

  /// Authentication repo
  const authRepo = new AuthRepository();

  /// Next button click
  const onNextHandle = () => {
    formik.handleSubmit();
  };

  /// Submit handle
  const onSubmitHandle = async (values: { email: string }) => {
    const result = await openLoading(async () => {
      return authRepo.forgotPassword(values);
    });
    if (!result) return;
    sessionStorage.setItem("forgot_password_email", values.email);
    onNext();
  };

  const initialValues = { email: "" };
  const formik = useFormik({
    initialValues,
    validationSchema: object({ email: string().email().required() }),
    onSubmit: onSubmitHandle,
  });

  return (
    <Grid container rowSpacing={2}>
      <Grid item>
        <Typography variant="subtitle2" fontSize={13} children={desc} />
      </Grid>
      <Grid item xs={12}>
        <TextOutlineField
          fullWidth
          label="Email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          helperText={formik.touched.email && formik.errors.email}
          error={Boolean(formik.errors.email && formik.touched.email)}
        />
      </Grid>
      <Grid item xs={12}>
        <PrimaryButton
          fullWidth
          height={30}
          fontSize={13}
          children="Send Code"
          color="white"
          fontWeight="normal"
          onClick={onNextHandle}
        />
      </Grid>
    </Grid>
  );
}

export default ForgotPasswordEmail;
