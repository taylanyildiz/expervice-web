import Icons from "@Assets/icons";
import Images from "@Assets/images";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface FooterProps {
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
}

function CommonFooter(props: FooterProps) {
  const { scrollRef } = props;

  /// Click logo to
  /// Scroll position
  const onClickLogoHandle = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="end"
      component="footer"
      px={10}
      pt={10}
      pb={1}
    >
      <Grid item>
        <Grid container direction="column" justifyContent="start">
          <Grid
            item
            children={
              <Button
                onClick={onClickLogoHandle}
                children={Images.logoBlack({ height: 50 })}
              />
            }
          />
          <Grid
            item
            children={
              <Typography
                variant="subtitle2"
                children="© Copyright Expervice. All rights reserved."
              />
            }
          />
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" columnSpacing={3}>
          <Grid
            item
            children={
              <Link to="" children={Icons.instagramBlack({ height: 25 })} />
            }
          />
          <Grid
            item
            children={
              <Link to="" children={Icons.facebookBlack({ height: 25 })} />
            }
          />
          <Grid
            item
            children={
              <Link to="" children={Icons.linkedinBlack({ height: 25 })} />
            }
          />
          <Grid
            item
            children={
              <Link to="" children={Icons.twitterBlack({ height: 25 })} />
            }
          />
          <Grid
            item
            children={
              <Link to="" children={Icons.youtubeBlack({ height: 25 })} />
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CommonFooter;
