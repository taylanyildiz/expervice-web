import Images from "@Assets/images";
import AuthRepository from "@Repo/auth_repository";
import ERouter from "@Routes/router_enum";
import { useQuery } from "@Utils/functions";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SuccessBox from "@Components/SuccessBox";
import VisibilityComp from "@Components/VisibilityComp";

function RegisterActivationPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);

  /// Url query
  const [query] = useQuery();
  const email = query.get("email");
  const code = query.get("code");

  /// Navigator
  const navigate = useNavigate();

  /// Authentication repository
  const authRepo = new AuthRepository();

  /// Activation account
  const registerActivate = async () => {
    const result = await authRepo.activation({ email: email!, code: code! });
    if (typeof result === "boolean") {
      setCompleted(true);
      navigate(ERouter.Summary);
      return;
    }
    setErrorMessage(result);
  };

  /// Initialize component
  useEffect(() => {
    if (email && code) registerActivate();
    console.log(`Email: ${email}\nCode: ${code}\n`);
  }, [email, code]);

  // if (!email || !code) return <Navigate to={ERouter.Base} />;

  return (
    <Box className="login-page">
      <Grid container textAlign="center" justifyContent="center">
        <Grid item xs={12}>
          <Link
            to={ERouter.Login}
            children={Images.logoTextWithWhite({ height: 100 })}
          />
        </Grid>
        <Grid item minHeight={100}>
          <Grid container>
            <VisibilityComp visibility={Boolean(errorMessage)}>
              <Grid item>
                <Typography
                  p={1}
                  sx={{ backgroundColor: "white" }}
                  color="red"
                  children={errorMessage}
                />
              </Grid>
            </VisibilityComp>

            <VisibilityComp visibility={!errorMessage && !completed}>
              <Grid item xs={12} mt={4}>
                <CircularProgress color="secondary" size={30} />
              </Grid>
            </VisibilityComp>

            <VisibilityComp visibility={completed}>
              <Grid xs={12} mt={2} item>
                <SuccessBox color="white" />
              </Grid>
            </VisibilityComp>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RegisterActivationPage;
