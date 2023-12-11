import PrimaryButton from "@Components/PrimaryButton";
import TextOutlineField from "@Components/TextOutlineField";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import { Box, DialogContent, Grid } from "@mui/material";
import { useFormik } from "formik";
import UserPassword from "../entities/user_password";
import { useDialog } from "@Utils/hooks/dialog_hook";
import UserRepository from "@Repo/user_repository";
import { resetPasswordValidator } from "../validator/profile_validator";
import TranslateHelper from "@Local/index";

type ResetPassword = {
  old_password?: string;
  password?: string;
  confirm_password?: string;
};

function ResetPasswordDialog() {
  /// Dialog hook
  const { openLoading, closeDialog } = useDialog();

  /// User repository
  const userRepo = new UserRepository();

  /// Submit handle
  const onSubmitHandle = async (value: ResetPassword) => {
    const userPassword: UserPassword = {
      new_password: value.password!,
      old_password: value.old_password!,
    };
    const result = await openLoading(async () => {
      return userRepo.resetPassword(userPassword);
    });
    if (!result) return;
    closeDialog();
  };

  /// formik
  const initialValues: ResetPassword = {
    password: "",
    confirm_password: "",
    old_password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: resetPasswordValidator,
    onSubmit: onSubmitHandle,
  });

  return (
    <>
      <DialogCustomTitle title={TranslateHelper.resetPassword()} />
      <DialogContent>
        <Box mt={1} p={1} sx={{ backgroundColor: "white" }}>
          <Grid container columnSpacing={1}>
            <Grid item xs={12}>
              <TextOutlineField
                fullWidth
                secret
                type="password"
                name="old_password"
                label={TranslateHelper.oldPassword()}
                onChange={formik.handleChange}
                value={formik.values.old_password}
                error={Boolean(
                  formik.touched.old_password && formik.errors.old_password
                )}
                helperText={
                  formik.touched.old_password && formik.errors.old_password
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextOutlineField
                fullWidth
                secret
                type="password"
                name="password"
                label={TranslateHelper.password()}
                onChange={formik.handleChange}
                value={formik.values.password}
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextOutlineField
                fullWidth
                secret
                type="password"
                name="confirm_password"
                label={TranslateHelper.confirmPassword()}
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
                error={Boolean(
                  formik.touched.confirm_password &&
                    formik.errors.confirm_password
                )}
                helperText={
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                }
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogCustomActions
        actions={[
          <PrimaryButton
            variant="contained"
            fontWeight="normal"
            children={TranslateHelper.save()}
            color="white"
            onClick={() => {
              formik.handleSubmit();
            }}
          />,
        ]}
      />
    </>
  );
}

export default ResetPasswordDialog;
