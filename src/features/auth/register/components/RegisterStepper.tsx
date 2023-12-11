import { Grid, Typography } from "@mui/material";
import RegisterStepperHeader from "./RegisterStepperHeader";
import Colors from "@Themes/colors";
import { useNavigate } from "react-router-dom";
import ERouter from "@Routes/router_enum";
import RegisterContact from "./RegisterContact";
import RegisterBilling from "./RegisterBilling";
import RegisterPassword from "./RegisterPassword";
import { useRegister } from "@Utils/hooks/register_hook";
import TranslateHelper from "@Local/index";

function RegisterStepper() {
  /// Register hook
  const { step, completedAll } = useRegister();
  if (completedAll) return <></>; // all done

  /// Register pages
  const views = [RegisterContact, RegisterBilling, RegisterPassword];

  /// Current register view
  const CurrentView = views[step];

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
          {TranslateHelper.alreadyExistCustomer()}{" "}
          <b onClick={onClickLoginHandle} className="bold-text">
            {TranslateHelper.login()}
          </b>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Grid container>
          <Grid item xs={12} mt={4} children={<RegisterStepperHeader />} />
          <Grid item xs={12} children={<CurrentView />} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RegisterStepper;
