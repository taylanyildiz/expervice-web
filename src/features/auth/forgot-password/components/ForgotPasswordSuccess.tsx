import { Grid } from "@mui/material";
import SuccessBox from "@Components/SuccessBox";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ERouter from "@Routes/router_enum";
import PrimaryButton from "@Components/PrimaryButton";
import Colors from "@Themes/colors";
import { useForgotPassword } from "@Utils/hooks/forgot_password_hook";

function ForgotPasswordSuccess() {
  /// Forgot password hooks
  const { completedAll } = useForgotPassword();

  /// Navigator
  const navigate = useNavigate();

  /// Timing
  const [timer, setTimer] = useState<number>(2);

  /// Initialize component
  /// Listen [completedAll]
  useEffect(() => {
    if (!completedAll) return;
    const interval = setInterval(() => {
      setTimer((value) => --value);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [completedAll]);

  useEffect(() => {
    if (timer <= 0) {
      navigate(ERouter.Login);
      return;
    }
  }, [timer]);

  /// If not completed all
  if (!completedAll) return <></>;

  return (
    <Grid container justifyContent="center" rowSpacing={3}>
      <Grid item xs={12}>
        <SuccessBox message="Your password has been updated successfully" />
      </Grid>
      <Grid item xs={12}>
        <PrimaryButton
          fullWidth
          variant="text"
          fontWeight="normal"
          color={Colors.secodaryDark}
          backgroundColor="transparent"
          onClick={() => navigate(ERouter.Login)}
          children={
            <div style={{ alignItems: "center", display: "flex" }}>
              <section>Go Login</section>
              <section style={{ fontSize: 10, color: "grey" }}>
                ({timer})
              </section>
            </div>
          }
        />
      </Grid>
    </Grid>
  );
}

export default ForgotPasswordSuccess;
