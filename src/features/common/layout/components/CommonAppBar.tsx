import { MenuCustomLink } from "@Components/index";
import ERouter from "@Routes/router_enum";
import { AppBar, Grid, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@Store/index";
import AppBarLogo from "./AppBarLogo";
import theme from "@Themes/index";
import AppBarActions from "./AppBarActions";
import AppBarMenuButton from "./AppBarMenuButton";
import { setLanguage } from "@Store/user_store";
import TranslateHelper from "@Local/index";

function CommonAppBar() {
  return (
    <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Grid container>
          {/* Left Side */}
          <Grid item flex={1}>
            <Grid
              container
              columnSpacing={6}
              rowSpacing={1}
              sx={{
                [theme.breakpoints.up("lg")]: {
                  flexDirection: "row",
                  alignItems: "end",
                },
                [theme.breakpoints.down("lg")]: {
                  flexDirection: "column",
                  alignItems: "start",
                },
              }}
            >
              <Grid item children={<AppBarLogo />} />
              <Grid
                sx={{
                  [theme.breakpoints.down("md")]: {
                    display: "none",
                  },
                }}
                item
                children={<AppBarLinks />}
              />
            </Grid>
          </Grid>

          <Grid item children={<AppBarActions />} />
          <Grid
            item
            sx={{
              [theme.breakpoints.up("md")]: {
                display: "none",
              },
            }}
          >
            <AppBarMenuButton />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

/// AppBar Links
function AppBarLinks() {
  /// Langauges from Constant Store
  const { languages } = useSelector((state: RootState) => state.constant);

  /// Dispatch
  const dispatch = useDispatch();

  return (
    <Grid container columnSpacing={5} mb={1}>
      <Grid
        item
        children={
          <MenuCustomLink
            title={TranslateHelper.product()}
            to={ERouter.Product}
          />
        }
      />
      <Grid
        item
        children={
          <MenuCustomLink
            title={TranslateHelper.pricing()}
            to={ERouter.Pricing}
          />
        }
      />
      <Grid
        item
        children={
          <MenuCustomLink
            title={TranslateHelper.resources()}
            to={ERouter.Resources}
          />
        }
      />
      <Grid
        item
        children={
          <MenuCustomLink
            title={TranslateHelper.support()}
            to={ERouter.Support}
          />
        }
      />
      <Grid
        item
        children={
          <MenuCustomLink
            title={TranslateHelper.languages()}
            children={languages.map((e) => ({
              onClick: () => {
                dispatch(setLanguage(e));
              },
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
