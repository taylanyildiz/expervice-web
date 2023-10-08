import Images from "@Assets/images";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import ERouter from "@Routes/router_enum";
import RegisterStepper from "./components/RegisterStepper";
import { RootState } from "@Store/index";
import RegisterProvider from "@Utils/hooks/register_hook";
import RegisterSuccess from "./components/RegisterSuccess";
import { useEffect } from "react";
import { setAuthPlan } from "@Store/auth_store";

function RegisterPage() {
  /// Authentication store
  const { plan } = useSelector((state: RootState) => state.auth);

  /// Dispatch
  const dispatch = useDispatch();

  /// Reset store about register
  const resetStorage = (force?: boolean) => {
    sessionStorage.clear();
    if (force) dispatch(setAuthPlan(null));
  };

  /// Initialize component
  useEffect(() => {
    resetStorage();
  }, []);

  /// Destroy component
  useEffect(() => {
    return () => {
      resetStorage(true);
    };
  }, []);

  /// If not have plan
  if (!plan) return <Navigate to={ERouter.Pricing} />;

  return (
    <RegisterProvider>
      <Box className="register-page">
        <Grid
          container
          rowSpacing={2}
          textAlign="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Link
              to={ERouter.Base}
              children={Images.logoTextWithBlack({ height: 80 })}
            />
          </Grid>

          <Grid item xs={12} children={<RegisterStepper />} />
          <Grid item xs={6} children={<RegisterSuccess />} />
        </Grid>
      </Box>
    </RegisterProvider>
  );
}

export default RegisterPage;
