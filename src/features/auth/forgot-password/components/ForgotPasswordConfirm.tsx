import { Grid, Typography } from "@mui/material";
import TextOutlineField from "@Components/TextOutlineField";
import { useForgotPassword } from "@Utils/hooks/forgot_password_hook";
import PrimaryButton from "@Components/PrimaryButton";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDialog } from "@Utils/hooks/dialog_hook";
import AuthRepository from "@Repo/auth_repository";

function ForgotPasswordConfirm() {
  /// Forgot password hooks
  const { steps, onNext } = useForgotPassword();
  const desc = steps[1].desc;

  /// Dialog hooks
  const { openLoading } = useDialog();

  /// Auth repository
  const authRepo = new AuthRepository();

  /// Next button clikc handle
  const onNextHandle = () => {
    formik.handleSubmit();
  };

  /// Submit handle
  const onSubmitHandle = async (values: { code: string }) => {
    const email = sessionStorage.getItem("forgot_password_email");
    if (!email) return;
    const result = await openLoading(async () => {
      return authRepo.checkResetCode({ email, ...values });
    });
    if (!result) return;
    sessionStorage.setItem("forgot_password_code", values.code);
    onNext();
  };

  /// Formik
  const initialValues = { code: "" };
  const formik = useFormik({
    initialValues,
    validationSchema: object({
      code: string().required().min(6, "Invalid code"),
    }),
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
          label="Code"
          name="code"
          maxLength={6}
          onChange={formik.handleChange}
          value={formik.values.code}
          helperText={formik.touched.code && formik.errors.code}
          error={Boolean(formik.errors.code && formik.touched.code)}
        />
      </Grid>
      <Grid item xs={12}>
        <PrimaryButton
          fullWidth
          height={30}
          fontSize={13}
          children="Confirm"
          color="white"
          fontWeight="normal"
          onClick={onNextHandle}
        />
      </Grid>
    </Grid>
  );
}

export default ForgotPasswordConfirm;
