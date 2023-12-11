import Images from "@Assets/images";
import PrimaryButton from "@Components/PrimaryButton";
import TextOutlineField from "@Components/TextOutlineField";
import ERouter from "@Routes/router_enum";
import Colors from "@Themes/colors";
import { Box, Grid } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SocialMediaBox from "./components/SocialMediaBox";
import StoreImageBox from "./components/StoreImageBox";
import ForgotPasswordButton from "./components/ForgotPasswordButtons";
import { useFormik } from "formik";
import UserLogin from "./entities/user_login";
import { loginValidationSchema } from "./validator/login_validator";
import AuthRepository from "@Repo/auth_repository";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { useSelector } from "react-redux";
import { RootState } from "@Store/index";
import TranslateHelper from "@Local/index";

function LoginPage() {
  /// Navigate
  const navigate = useNavigate();

  /// Auth repository
  const authRepo = new AuthRepository();

  /// Account store
  const { user } = useSelector((state: RootState) => state.account);

  /// Dialog hook
  const { openLoading } = useDialog();

  /// Login handle
  const onClickLoginHandle = () => {
    formik.handleSubmit();
  };

  /// Submit handle
  const onSubmitHandle = async (user: UserLogin): Promise<void> => {
    const result = await openLoading(async () => {
      return authRepo.login(user);
    });
    if (!result) return;
    navigate(ERouter.Summary);
  };

  /// Formik
  const initialValues: UserLogin = { email: "", password: "" };
  const formik = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: onSubmitHandle,
  });

  /// Redirect to summary
  if (user) return <Navigate to={ERouter.Summary} />;

  return (
    <Box className="login-page">
      <Grid container alignItems="center" direction="column">
        <Grid
          item
          children={
            <Link
              to={ERouter.Base}
              children={Images.logoTextWhite({ width: 300 })}
            />
          }
        />
        <Grid mt={3} item width={350}>
          <Box className="login-box">
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <TextOutlineField
                  fullWidth
                  label={TranslateHelper.email()}
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  helperText={formik.touched.email && formik.errors.email}
                  error={Boolean(formik.errors.email && formik.touched.email)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextOutlineField
                  fullWidth
                  secret
                  label={TranslateHelper.password()}
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  helperText={formik.touched.password && formik.errors.password}
                  error={Boolean(
                    formik.errors.password && formik.touched.password
                  )}
                />
              </Grid>
              <Grid item xs={12} mt={3}>
                <PrimaryButton
                  fullWidth
                  fontWeight="normal"
                  children={TranslateHelper.login()}
                  backgroundColor={Colors.primaryDark}
                  color="white"
                  onClick={onClickLoginHandle}
                />
              </Grid>
              <Grid item xs={12} mt={2} justifyContent="center" display="flex">
                <ForgotPasswordButton />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} children={<StoreImageBox />} />
        <Grid item xs={12} children={<SocialMediaBox />} />
      </Grid>
    </Box>
  );
}

export default LoginPage;
