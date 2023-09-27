import Images from "@Assets/images";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

function StoreImageBox() {
    return (
        <Grid container direction="row" columnSpacing={2} my={3}>
            <Grid item xs={0} children={<Link to="" children={Images.appStore({ height: 40 })} />} />
            <Grid item xs={0} children={<Link to="" children={Images.googlePlay({ height: 40 })} />} />
        </Grid>
    )
}

export default StoreImageBox;