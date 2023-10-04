import Images from "@Assets/images";
import ERouter from "@Routes/router_enum";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ForgotPasswordStepperHeader from "./components/ForgotPaswordStepperHeader";
import ForgotPasswordProvider from "@Utils/hooks/forgot_password_hook";
import ForgotPasswordStepper from "./components/ForgotPasswordStepper";
import { useEffect } from "react";

function ForgotPasswordPage() {
  /// Clear storage about forgot-password
  const resetStorage = () => {
    sessionStorage.clear();
  };

  /// Initialize component
  useEffect(() => {
    resetStorage();
    return () => resetStorage();
  }, []);

  return (
    <ForgotPasswordProvider>
      <Box className="forgot-password-page">
        <Grid container width="100%" alignItems="center" direction="column">
          <Grid item>
            <Link to={ERouter.Base}>
              {Images.logoTextWhite({ width: 300 })}
            </Link>
          </Grid>
          <Grid item mt={3} xs={12}>
            <ForgotPasswordStepperHeader />
          </Grid>
          <Grid item xs={12} width={350} mt={3}>
            <ForgotPasswordStepper />
          </Grid>
        </Grid>
      </Box>
    </ForgotPasswordProvider>
  );
}

export default ForgotPasswordPage;
