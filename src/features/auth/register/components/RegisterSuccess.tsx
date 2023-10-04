import { Box } from "@mui/material";
import SuccessBox from "@Components/SuccessBox";
import { useRegister } from "@Utils/hooks/register_hook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ERouter from "@Routes/router_enum";
import PrimaryButton from "@Components/PrimaryButton";
import Colors from "@Themes/colors";

function RegisterSuccess() {
  /// Register hooks
  const { completedAll } = useRegister();

  /// Navigator
  const navigate = useNavigate();

  /// Timing
  const [time, setTimer] = useState<number>(60);

  /// Initialize component
  /// Listen [completedAll]
  useEffect(() => {
    if (!completedAll) return;
    const interval = setInterval(() => {
      setTimer((value) => --value);
      if (time <= 0) {
        navigate(ERouter.Login);
        clearInterval(interval);
        return;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [completedAll]);

  /// If not completed all
  if (!completedAll) return <></>;

  return (
    <Box sx={{ boxShadow: 10, borderRadius: 4, px: 10, py: 10 }}>
      <SuccessBox message="Your account has been created successfully, you can complete your activation with the e-mail we sent to your e-mail address." />
      <PrimaryButton
        variant="text"
        fontWeight="normal"
        color={Colors.secodaryDark}
        backgroundColor="transparent"
        onClick={() => navigate(ERouter.Login)}
        children={
          <div style={{ alignItems: "center", display: "flex" }}>
            <section>Go Login</section>
            <section style={{ fontSize: 10, color: "grey" }}>({time})</section>
          </div>
        }
      />
    </Box>
  );
}

export default RegisterSuccess;
