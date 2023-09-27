import Icons from "@Assets/icons";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

function SocialMediaBox(){

    /// Icons size
    const size = 25;

    return (
        <Grid container columnSpacing={2}>
            <Grid item>
                <Link to="" children={Icons.facebookWhite({width:size})}/>
            </Grid>
            <Grid item>
                <Link to="" children={Icons.instagramWhite({width:size})}/>
            </Grid>
            <Grid item>
                <Link to="" children={Icons.twitterWhite({width:size})}/>
            </Grid>
            <Grid item>
                <Link to="" children={Icons.linkedinWhite({width:size})}/>
            </Grid>
        </Grid>
    )
}

export default SocialMediaBox;