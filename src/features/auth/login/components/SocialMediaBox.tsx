import Images from "@Assets/images";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

function SocialMediaBox() {
  /// Icons size
  const size = 25;

  return (
    <Grid container columnSpacing={2}>
      <Grid item>
        <Link to="" children={Images.facebookWhite({ width: size })} />
      </Grid>
      <Grid item>
        <Link
          target="_blank"
          to="https://www.instagram.com/acritechnology/"
          children={Images.instagramWhite({ width: size })}
        />
      </Grid>
      <Grid item>
        <Link to="" children={Images.twitterWhite({ width: size })} />
      </Grid>
      <Grid item>
        <Link
          target="_blank"
          to="https://www.linkedin.com/company/acritechnology/mycompany/"
          children={Images.linkedinWhite({ width: size })}
        />
      </Grid>
    </Grid>
  );
}

export default SocialMediaBox;
