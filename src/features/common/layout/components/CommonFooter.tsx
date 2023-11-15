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
    <Grid container className="common-footer">
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
              <Link
                target="_blank"
                to="https://www.instagram.com/acritechnology/"
                children={Images.instagramBlack({ height: 25 })}
              />
            }
          />
          <Grid
            item
            children={
              <Link
                target="_blank"
                to=""
                children={Images.facebookBlack({ height: 25 })}
              />
            }
          />
          <Grid
            item
            children={
              <Link
                target="_blank"
                to="https://www.linkedin.com/company/acritechnology/mycompany/"
                children={Images.linkedinBlack({ height: 25 })}
              />
            }
          />
          <Grid
            item
            children={
              <Link to="" children={Images.twitterBlack({ height: 25 })} />
            }
          />
          <Grid
            item
            children={
              <Link
                target="_blank"
                to=""
                children={Images.youtubeBlack({ height: 25 })}
              />
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CommonFooter;
