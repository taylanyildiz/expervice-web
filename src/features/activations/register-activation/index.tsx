import Images from "@Assets/images";
import AuthRepository from "@Repo/auth_repository";
import ERouter from "@Routes/router_enum";
import { useQuery } from "@Utils/functions";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SuccessBox from "@Components/SuccessBox";

function RegisterActivationPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);

  /// Url query
  const query = useQuery();
  const email = query.get("email");
  const code = query.get("code");

  /// Navigator
  const navigate = useNavigate();

  /// Authentication repository
  const authRepo = new AuthRepository();

  /// Activation account
  const activateAccount = async () => {
    const result = await authRepo.activation({ email: email!, code: code! });
    if (typeof result === "boolean") {
      setCompleted(true);
      return;
    }
    setErrorMessage(result);
  };

  /// Initialize component
  useEffect(() => {
    if (!email || !code) return navigate(ERouter.Base);
    activateAccount();
  }, []);

  return (
    <Box className="login-page">
      <Grid container textAlign="center" justifyContent="center">
        <Grid
          item
          xs={12}
          children={Images.logoTextWithWhite({ height: 100 })}
        />
        <Grid
          item
          xs={12}
          children={<Typography color="white" children={errorMessage} />}
        />
        <Grid
          item
          xs={12}
          mt={4}
          children={<CircularProgress color="secondary" size={30} />}
        />
        <Grid item>{completed && <SuccessBox />}</Grid>
      </Grid>
    </Box>
  );
}

export default RegisterActivationPage;
