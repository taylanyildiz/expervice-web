import { useForgotPassword } from "@Utils/hooks/forgot_password_hook";
import { Box, Grid } from "@mui/material";
import ForgotPasswordConfirm from "./ForgotPasswordConfirm";
import ForgotPasswordEmail from "./ForgotPasswordEmail";
import ForgotPasswordReset from "./ForgotPasswordReset";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess";
import VisibilityComp from "@Components/VisibilityComp";

function ForgotPasswordStepper() {
  /// Forgot password hook
  const { step, completedAll } = useForgotPassword();

  /// Forgot passsword pages
  const views = [
    ForgotPasswordEmail,
    ForgotPasswordConfirm,
    ForgotPasswordReset,
  ];

  const CurrentView = views[step];

  return (
    <Box className="forgot-password-box">
      <Grid container rowSpacing={2}>
        <VisibilityComp
          visibility={!completedAll}
          children={<Grid item children={<CurrentView />} />}
        />
        <VisibilityComp
          visibility={completedAll}
          children={<Grid item xs={12} children={<ForgotPasswordSuccess />} />}
        />
      </Grid>
    </Box>
  );
}

export default ForgotPasswordStepper;
