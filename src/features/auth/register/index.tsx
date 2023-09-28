import Images from "@Assets/images";
import { RootState } from "@Utils/hooks";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RegisterStep } from "./entities";
import Colors from "@Themes/colors";
import { Link, useNavigate } from "react-router-dom";
import ERouter from "@Routes/router_enum";
import RegisterStepperHeader from "./components/RegisterStepperHeader";
import RegisterContact from "./components/RegisterContact";
import PrimaryButton from "@Components/PrimaryButton";
import RegisterBilling from "./components/RegisterBilling";

function RegisterPage() {
  /// Authentication store
  const { plan } = useSelector((state: RootState) => state.auth);

  /// Navigator
  const navigate = useNavigate();

  /// Initialize component
  useEffect(() => {
    if (!plan) navigate(ERouter.Base);
    return;
  });

  /// Active page
  const [active, setActive] = useState(0);

  /// Register steps
  const [steps, setSteps] = useState<RegisterStep[]>([
    {
      title: "Contact",
      completed: false,
    },
    {
      title: "Billing",
      completed: false,
    },
    {
      title: "Finished",
      completed: false,
    },
  ]);

  /// Login click handle
  const onClickLoginHandle = () => {
    navigate(ERouter.Login);
  };

  /// Next step handle
  const onNextHandle = () => {
    if (active === steps.length) return;
    const values = [...steps];
    values[active].completed = true;
    setSteps(values);
    setActive((value) => ++value);
  };

  return (
    <Box className="register-page">
      <Grid container rowSpacing={2} textAlign="center" justifyContent="center">
        <Grid item xs={12}>
          <Link
            to={ERouter.Base}
            children={Images.logoTextBlack({ height: 80 })}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h1" fontSize={25} color={Colors.primaryLight}>
            Create a Expervice account
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Already an existing customer?{" "}
            <b onClick={onClickLoginHandle} className="bold-text">
              Log in
            </b>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid
              item
              xs={12}
              children={<RegisterStepperHeader steps={steps} active={active} />}
            />
            {/* <Grid item xs={12} children={<RegisterContact />} /> */}
            <Grid item xs={12} children={<RegisterBilling />} />
          </Grid>
          <Grid item xs={12} mt={2} display="flex" justifyContent="end">
            <PrimaryButton
              onClick={onNextHandle}
              children="Continue"
              backgroundColor={Colors.primaryLight}
              color="white"
              fontWeight="normal"
              fontSize={14}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RegisterPage;
