import { Grid, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircleButton from "@Components/CircleButton";
import ScalableButton from "@Components/ScalableButton";
import RoofingOutlinedIcon from "@mui/icons-material/RoofingOutlined";
import Colors from "@Themes/colors";

function SolutionButtons() {
  return (
    <Grid
      container
      rowSpacing={3}
      py={5}
      justifyContent="center"
      sx={{ backgroundColor: Colors.pageBackground }}
    >
      <Grid
        item
        textAlign="center"
        xs={12}
        children={
          <Typography variant="h3" children="Management solutions for" />
        }
      />
      <Grid item>
        <Grid container columnSpacing={15} direction="row">
          <Grid item>
            <Grid
              container
              direction="column"
              rowSpacing={1}
              alignItems="center"
            >
              <Grid
                item
                children={
                  <CircleButton
                    children={<BusinessIcon sx={{ width: 40, height: 40 }} />}
                  />
                }
              />
              <Grid
                item
                children={<Typography variant="body1" children="Business" />}
              />
              <Grid
                item
                children={
                  <ScalableButton
                    backgroundColor="transparent"
                    variant="text"
                    suffix={<ArrowForwardIcon />}
                    children="Learn More"
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              rowSpacing={1}
              alignItems="center"
            >
              <Grid
                item
                children={
                  <CircleButton
                    children={
                      <RoofingOutlinedIcon sx={{ width: 40, height: 40 }} />
                    }
                  />
                }
              />
              <Grid
                item
                children={<Typography variant="body1" children="Customer" />}
              />
              <Grid
                item
                children={
                  <ScalableButton
                    backgroundColor="transparent"
                    variant="text"
                    suffix={<ArrowForwardIcon />}
                    children="Learn More"
                  />
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SolutionButtons;
