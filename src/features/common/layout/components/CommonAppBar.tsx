import { MenuCustomLink } from "@Components/index";
import ERouter from "@Routes/router_enum";
import { AppBar, Grid, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@Store/index";
import AppBarLogo from "./AppBarLogo";
import theme from "@Themes/index";
import AppBarActions from "./AppBarActions";

import AppBarMenuButton from "./AppBarMenuButton";

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
