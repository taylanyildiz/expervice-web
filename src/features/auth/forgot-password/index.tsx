import Images from "@Assets/images";
import ERouter from "@Routes/router_enum";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { ForgotPasswordStep } from "./entities";
import PrimaryButton from "@Components/PrimaryButton";
import Colors from "@Themes/colors";
import ForgotPasswordStepperHeader from "./components/ForgotPaswordStepperHeader";
import { useState } from "react";
import ForgotPasswordEmail from "./components/ForgotPasswordEmail";
import ForgotPasswordConfirm from "./components/ForgotPasswordConfirm";
import ForgotPasswordReset from "./components/ForgotPasswordReset";
import ForgotPasswordSuccess from "./components/ForgotPasswordSuccess";

function ForgotPasswordPage() {
  /// Active page
  const [active, setActive] = useState(0);

  /// Page steppers
  const [steps, setSteps] = useState<ForgotPasswordStep[]>([
    {
      title: "Reset your password",
      desc: "Please enter the email associated with your account and we'll send you an email with a password reset code to get you logged in.",
      completed: false,
    },
    {
      title: "Confirmation Code",
      desc: "Please enter the code which one we send to your email",
      completed: false,
    },
    {
      title: "Reset Password",
      desc: "Please enter password to reset",
      completed: false,
    },
  ]);

  /// Is all done
  const done = !steps.some((e) => !e.completed);

  /// On next handle
  const onNextHandle = () => {
    if (active === steps.length) return;
    const values = [...steps];
    values[active].completed = true;
    setSteps(values);
    setActive((value) => ++value);
  };

  return (
    <Box className="forgot-password-page">
      <Grid container width="100%" alignItems="center" direction="column">
        <Grid item>
          <Link
            to={ERouter.Base}
            children={Images.logoTextWhite({ width: 300 })}
          />
        </Grid>
        <Grid item mt={3} xs={12} width="40%">
          <ForgotPasswordStepperHeader steps={steps} active={active} />
        </Grid>
        <Grid item xs={12} width={350} mt={2}>
          <Box className="forgot-password-box">
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                {/* Stepper Content */}
                {active === 0 && <ForgotPasswordEmail step={steps[active]} />}
                {active === 1 && <ForgotPasswordConfirm step={steps[active]} />}
                {active === 2 && <ForgotPasswordReset step={steps[active]} />}
                {done && <ForgotPasswordSuccess />}
              </Grid>
              <Grid item xs={12}>
                <PrimaryButton
                  fullWidth
                  color="white"
                  backgroundColor={Colors.primaryDark}
                  children="Next"
                  onClick={onNextHandle}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ForgotPasswordPage;
