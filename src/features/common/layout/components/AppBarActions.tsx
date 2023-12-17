import MenuCustomLink from "@Components/MenuCustomLink";
import ScalableButton from "@Components/ScalableButton";
import ERouter from "@Routes/router_enum";
import { Grid } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import theme from "@Themes/index";
import TranslateHelper from "@Local/index";

function AppBarActions() {
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
      <Grid item display="flex" justifyContent="end">
        <ScalableButton
          link={ERouter.Pricing}
          children={TranslateHelper.tryItNow()}
        />
      </Grid>
    </Grid>
  );
}

export default AppBarActions;
