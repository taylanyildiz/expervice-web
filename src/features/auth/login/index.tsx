import Images from "@Assets/images";
import PrimaryButton from "@Components/PrimaryButton";
import TextOutlineField from "@Components/TextOutlineField";
import ERouter from "@Routes/router_enum";
import Colors from "@Themes/colors";
import { Box, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SocialMediaBox from "./components/SocialMediaBox";
import StoreImageBox from "./components/StoreImageBox";

function LoginPage() {
  /// Navigator
  const navigate = useNavigate();

  /// Open forgot password page
  const onForgotPasswordHandle = () => {
    navigate(ERouter.ForgotPassword);
  };

  return (
    <Box className="login-page">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
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
            <Grid container rowSpacing={1} justifyContent="center">
              <Grid item xs={12}>
                <TextOutlineField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextOutlineField
                  fullWidth
                  secret
                  label="Password"
                  name="password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12} mt={3}>
                <PrimaryButton
                  fullWidth
                  fontWeight="normal"
                  children="Login"
                  backgroundColor={Colors.primaryDark}
                  color="white"
                />
              </Grid>
              <Grid item xs={12} mt={2} justifyContent="center" display="flex">
                <Typography>
                  Forgot your{" "}
                  <b className="bold-text" onClick={onForgotPasswordHandle}>
                    password
                  </b>{" "}
                  ?
                </Typography>
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
