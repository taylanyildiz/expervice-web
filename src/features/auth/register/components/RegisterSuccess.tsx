import { Box } from "@mui/material";
import SuccessBox from "@Components/SuccessBox";
import { useRegister } from "@Utils/hooks/register_hook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ERouter from "@Routes/router_enum";
import PrimaryButton from "@Components/PrimaryButton";
import Colors from "@Themes/colors";
import TranslateHelper from "@Local/index";

function RegisterSuccess() {
  /// Register hooks
  const { completedAll } = useRegister();

  /// Navigator
  const navigate = useNavigate();

  /// Timing
  const [timer, setTimer] = useState<number>(60);

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

  // If not completed all
  if (!completedAll) return <></>;

  return (
    <Box sx={{ boxShadow: 10, borderRadius: 4, px: 10, py: 10 }}>
      <SuccessBox message={TranslateHelper.registerSuccessHeader()} />
      <PrimaryButton
        variant="text"
        fontWeight="normal"
        color={Colors.secodaryDark}
        backgroundColor="transparent"
        onClick={() => navigate(ERouter.Login)}
        children={
          <div style={{ alignItems: "center", display: "flex" }}>
            <section>{TranslateHelper.goLogin()}</section>
            <section style={{ fontSize: 10, color: "grey" }}>({timer})</section>
          </div>
        }
      />
    </Box>
  );
}

export default RegisterSuccess;
