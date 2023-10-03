import ERouter from "@Routes/router_enum";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ForgotPasswordButton() {
  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  // Navigator
  const navigate = useNavigate();

  const { openLoading } = useDialog();

  /// Open forgot password page
  const onForgotPasswordHandle = () => {
    // navigate(ERouter.ForgotPassword);
    openLoading(async () => {
      await timeout(1000);
    });
  };

  return (
    <Typography>
      Forgot your{" "}
      <b className="bold-text" onClick={onForgotPasswordHandle}>
        password
      </b>{" "}
      ?
    </Typography>
  );
}

export default ForgotPasswordButton;
