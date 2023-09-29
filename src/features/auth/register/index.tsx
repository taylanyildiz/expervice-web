import Images from "@Assets/images";
import { RootState } from "@Utils/hooks";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RegisterStep } from "./entities";
import { Link, useNavigate } from "react-router-dom";
import ERouter from "@Routes/router_enum";
import RegisterSuccess from "./components/RegisterSuccess";
import RegisterStepper from "./components/RegisterStepper";

function RegisterPage() {
  /// Authentication store
  const { plan } = useSelector((state: RootState) => state.auth);

  /// Active page
  const [active, setActive] = useState(0);

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
        {!completedAll && (
          <Grid item xs={12}>
            <RegisterStepper
              onBack={onBackHandle}
              onNext={onNextHandle}
              active={active}
              steps={steps}
            />
          </Grid>
        )}
        {completedAll && <Grid item xs={6} children={<RegisterSuccess />} />}
      </Grid>
    </Box>
  );
}

export default RegisterPage;
