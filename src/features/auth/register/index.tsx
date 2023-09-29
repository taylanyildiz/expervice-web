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
import RegisterBilling from "./components/RegisterBilling";
import RegisterPassword from "./components/RegisterPassword";
import RegisterActions from "./components/RegisterActions";
import RegisterSuccess from "./components/RegisterSuccess";

function RegisterPage() {
  /// Authentication store
  const { plan } = useSelector((state: RootState) => state.auth);

  /// Active page
  const [active, setActive] = useState(0);

  /// Register pages
  const views = [RegisterContact, RegisterBilling, RegisterPassword];

  /// Current register view
  const CurrentView = views[active];

  /// Navigator
  const navigate = useNavigate();

  /// Initialize component
  useEffect(() => {
    if (!plan) navigate(ERouter.Base);
    return;
  });

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
    if (active === steps.length - 1) return;
    setActive((value) => ++value);
  };

  /// Back step handle
  const onBackHandle = () => {
    if (active === 0) return;
    const values = [...steps];
    values[active - 1].completed = false;
    setActive((value) => --value);
  };

  /// All complted
  const completedAll = !steps.some((e) => !e.completed);

  return (
    <Box className="register-page">
      <Grid container rowSpacing={2} textAlign="center" justifyContent="center">
        <Grid item xs={12}>
          <Link
            to={ERouter.Base}
            children={Images.logoTextWithBlack({ height: 80 })}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Typography
                variant="h1"
                fontSize={25}
                color={Colors.primaryLight}
              >
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
                <Grid item xs={12} mt={4}>
                  <RegisterStepperHeader steps={steps} active={active} />
                </Grid>
                <Grid item xs={12} children={<CurrentView />} />
              </Grid>
              <Grid
                item
                xs={12}
                mt={2}
                children={
                  <RegisterActions
                    onBack={onBackHandle}
                    onNext={onNextHandle}
                    active={active}
                  />
                }
              />
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item xs={6}>
          <RegisterSuccess />
        </Grid>
      </Grid>
    </Box>
  );
}

export default RegisterPage;
