import Images from "@Assets/images";
import PrimaryButton from "@Components/PrimaryButton";
import TextOutlineField from "@Components/TextOutlineField";
import ERouter from "@Routes/router_enum";
import Colors from "@Themes/colors";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import SocialMediaBox from "./components/SocialMediaBox";
import StoreImageBox from "./components/StoreImageBox";
import ForgotPasswordButton from "./components/ForgotPasswordButtons";

function LoginPage() {
  /// Login handle
  const onClickLoginHandle = () => {};

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
