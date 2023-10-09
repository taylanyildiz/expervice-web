import Images from "@Assets/images";
import { MenuCustomLink, ScalableButton } from "@Components/index";
import ERouter from "@Routes/router_enum";
import Colors from "@Themes/colors";
import { AppBar, Grid, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@Store/index";
import { setAuthPlan } from "@Store/auth_store";

function CommonAppBar() {
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
    <AppBar>
      <Toolbar>
        <Grid container justifyContent="space-between">
          {/* Left Side */}
          <Grid item>
            <Grid container columnSpacing={6} alignItems="end">
              <Grid item children={<AppBarLogo />} />
              <Grid item children={<AppBarLinks />} />
            </Grid>
          </Grid>

          {/* Right Side */}
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="end" alignItems="center">
                  <Grid
                    item
                    children={
                      <MenuCustomLink title="Contact" to={ERouter.Contact} />
                    }
                  />
                  <Grid
                    item
                    children={
                      <ScalableButton
                        link={ERouter.Login}
                        color="black"
                        backgroundColor="transparent"
                        children="Login"
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
                        children="Schedule a demo"
                      />
                    }
                  />
                  <Grid
                    item
                    children={
                      <ScalableButton
                        link={ERouter.Pricing}
                        children="Try it now"
                      />
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

/// AppBar Logo
function AppBarLogo() {
  return (
    <Link to={ERouter.Base}>
      <Grid container columnSpacing={2} alignItems="end">
        <Grid item children={Images.logoBlack({ height: 60 })} />
        <Grid item children={Images.logoTextWithBlack({ height: 50 })} />
      </Grid>
    </Link>
  );
}

/// AppBar Links
function AppBarLinks() {
  /**
   * Langauges from Constant Store
   */
  const { languages } = useSelector((state: RootState) => state.constant);

  return (
    <Grid container columnSpacing={5} mb={1}>
      <Grid
        item
        children={<MenuCustomLink title="Product" to={ERouter.Product} />}
      />
      <Grid
        item
        children={<MenuCustomLink title="Pricing" to={ERouter.Pricing} />}
      />
      <Grid
        item
        children={<MenuCustomLink title="Resources" to={ERouter.Resources} />}
      />
      <Grid
        item
        children={<MenuCustomLink title="Support" to={ERouter.Support} />}
      />
      <Grid
        item
        children={
          <MenuCustomLink
            title="Languages"
            children={languages.map((e) => ({
              title: e.native,
              suffix: e.emoji,
            }))}
          />
        }
      />
    </Grid>
  );
}

export default CommonAppBar;
