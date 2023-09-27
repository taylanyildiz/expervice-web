import Images from "@Assets/images";
import { Box, Grid, Typography } from "@mui/material";

function ContactBox() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Box
                position="absolute"
                className="contact-box-gradient"
                sx={{ height: 400, width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} position="absolute">
              <Grid
                container
                padding={10}
                px={20}
                direction="column"
                rowSpacing={3}
              >
                <Grid
                  item
                  children={
                    <Typography
                      variant="h3"
                      fontSize={20}
                      color="white"
                      children="Contact Us"
                    />
                  }
                />
                <Grid
                  item
                  children={
                    <Typography
                      variant="h1"
                      color="white"
                      children="We’re always here for you"
                    />
                  }
                />
                <Grid
                  item
                  children={
                    <Typography
                      variant="h3"
                      fontSize={16}
                      color="white"
                      children="Our team has your back with unlimited support whenever you need it."
                    />
                  }
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              justifyContent="end"
              alignContent="end"
              display="flex"
              justifySelf="end"
            >
              <Box children={Images.contactUs({ height: 400 })} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContactBox;
