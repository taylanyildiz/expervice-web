import { Grid, Typography } from "@mui/material";
import RegisterStepperHeader from "./RegisterStepperHeader";
import RegisterActions from "./RegisterActions";
import Colors from "@Themes/colors";
import { useNavigate } from "react-router-dom";
import ERouter from "@Routes/router_enum";
import { RegisterStep } from "../entities";
import RegisterContact from "./RegisterContact";
import RegisterBilling from "./RegisterBilling";
import RegisterPassword from "./RegisterPassword";

interface RegisterStepperProps {
  steps: RegisterStep[];
  active: number;
  onNext: () => void;
  onBack: () => void;
}

function RegisterStepper(props: RegisterStepperProps) {
  const { steps, active, onNext, onBack } = props;

  /// Register pages
  const views = [RegisterContact, RegisterBilling, RegisterPassword];

  /// Current register view
  const CurrentView = views[active];

  /// Navigator
  const navigate = useNavigate();

  /// Login handle
  const onClickLoginHandle = () => {
    navigate(ERouter.Login);
  };

  return (
    <Grid container justifyContent="center">
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
          <Grid item xs={12} mt={4}>
            <RegisterStepperHeader steps={steps} active={active} />
          </Grid>
          <Grid item xs={12} children={<CurrentView />} />
        </Grid>
        <Grid item xs={12} mt={2}>
          <RegisterActions onBack={onBack} onNext={onNext} active={active} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RegisterStepper;
