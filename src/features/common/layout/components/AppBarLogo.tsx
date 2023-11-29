import Images from "@Assets/images";
import ERouter from "@Routes/router_enum";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

function AppBarLogo() {
  return (
    <Link to={ERouter.Base}>
      <Grid alignItems="end" container columnSpacing={2}>
        <Grid item children={Images.logoBlack({ height: 60 })} />
        <Grid item children={Images.logoTextWithBlack({ height: 50 })} />
      </Grid>
    </Link>
  );
}

export default AppBarLogo;
