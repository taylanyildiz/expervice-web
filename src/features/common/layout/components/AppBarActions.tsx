import MenuCustomLink from "@Components/MenuCustomLink";
import ScalableButton from "@Components/ScalableButton";
import ERouter from "@Routes/router_enum";
import { Grid } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Colors from "@Themes/colors";
import { RootState } from "@Store/index";
import { useDispatch, useSelector } from "react-redux";
import { setAuthPlan } from "@Store/auth_store";
import theme from "@Themes/index";
import TranslateHelper from "@Local/index";

function AppBarActions() {
  /// Production store
  const { production } = useSelector((state: RootState) => state.production);

  /// Application dispatch
  const dispatch = useDispatch();

  /// Select best pricing
  const onClickDemoHandle = () => {
    const plan = production?.plans?.[1];
    dispatch(setAuthPlan(plan));
  };

  return (
    <Grid
      sx={{
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      }}
      container
      direction="column"
    >
      <Grid item>
        <Grid container justifyContent="end" alignItems="center">
          <Grid
            item
            children={
              <MenuCustomLink
                title={TranslateHelper.contact()}
                to={ERouter.Contact}
              />
            }
          />
          <Grid
            item
            children={
              <ScalableButton
                link={ERouter.Login}
                color="black"
                backgroundColor="transparent"
                children={TranslateHelper.login()}
                prefix={<AccountCircleOutlinedIcon />}
              />
            }
          />
        </Grid>
      </Grid>
      <Grid item>
        <Grid container>
          <Grid item />
        </Grid>
        <Grid container columnSpacing={1.2}>
          <Grid
            item
            children={
              <ScalableButton
                link={ERouter.Regiter}
                onClick={onClickDemoHandle}
                color={Colors.primary}
                backgroundColor={Colors.secodary}
                children={TranslateHelper.scheduleDemo()}
              />
            }
          />
          <Grid
            item
            children={
              <ScalableButton
                link={ERouter.Pricing}
                children={TranslateHelper.tryItNow()}
              />
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AppBarActions;
