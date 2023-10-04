import Images from "@Assets/images";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import ERouter from "@Routes/router_enum";
import RegisterStepper from "./components/RegisterStepper";
import { RootState } from "@Store/index";
import RegisterProvider from "@Utils/hooks/register_hook";
import RegisterSuccess from "./components/RegisterSuccess";

function RegisterPage() {
  /// Authentication store
  const { plan } = useSelector((state: RootState) => state.auth);

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

          {/* <Grid item xs={12} children={<RegisterStepper />} /> */}
          <Grid item xs={6} children={<RegisterSuccess />} />
        </Grid>
      </Box>
    </RegisterProvider>
  );
}

export default RegisterPage;
