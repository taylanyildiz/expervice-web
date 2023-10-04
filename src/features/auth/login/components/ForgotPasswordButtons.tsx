import ERouter from "@Routes/router_enum";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ForgotPasswordButton() {
  // Navigator
  const navigate = useNavigate();

  /// Open forgot password page
  const onForgotPasswordHandle = () => {
    navigate(ERouter.ForgotPassword);
  };

  return (
    <Typography>
      Forgot your{" "}
      <b className="bold-text" onClick={onForgotPasswordHandle}>
        password
      </b>
      ?
    </Typography>
  );
}

export default ForgotPasswordButton;
