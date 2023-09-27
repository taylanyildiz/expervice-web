import ScalableButton from "@Components/ScalableButton";
import Colors from "@Themes/colors";
import { Box, Grid, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

/// Pricing Props
interface PricingProps {
  title?: string;
  pricing?: string;
  description?: string;
  permissions?: string[];
  best?: boolean;
  onClick: () => void;
}

function PricingBox(props: PricingProps) {
  const { title, pricing, description, permissions, best, onClick } = props;

  /// Default Box
  let component = (radius?: string, elevation?: number) => (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: radius ?? 2,
        width: 350,
        minHeight: 450,
        boxShadow: elevation ?? 5,
      }}
    >
      <Grid
        container
        px={3}
        py={3}
        direction="column"
        alignItems="center"
        rowSpacing={2}
      >
        <Grid
          item
          children={<Typography variant="h2" fontSize={30} children={title} />}
        />
        <Grid
          item
          children={
            <Typography
              variant="h3"
              fontSize={24}
              fontWeight={100}
              children={pricing}
            />
          }
        />
        <Grid
          item
          children={
            <ScalableButton
              backgroundColor={Colors.secodary}
              color={Colors.primaryDark}
              fontSize={18}
              onClick={onClick}
              children="Get Started"
            />
          }
        />
        <Grid
          item
          px={3}
          children={
            <Typography
              variant="subtitle2"
              textAlign="center"
              children={description}
            />
          }
        />
        <Grid item display="flex" alignSelf="start">
          <Grid container direction="column">
            {permissions?.map((e, index) => (
              <Grid key={index} item>
                <Grid container direction="row" columnSpacing={1}>
                  <Grid
                    item
                    children={<DoneIcon sx={{ color: Colors.secodary }} />}
                  />
                  <Grid
                    item
                    children={
                      <Typography
                        variant="subtitle2"
                        fontSize={15}
                        children={e}
                      />
                    }
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );

  /// Best One Box
  if (best === true) {
    return (
      <Box
        p={0.1}
        pb={0.2}
        sx={{ boxShadow: 5, backgroundColor: "#F6C47C", borderRadius: 2 }}
      >
        <Grid container direction="column" alignItems="center">
          <Grid
            item
            pt={1}
            pb={3}
            children={
              <Typography variant="h1" fontSize={15} children="BEST VALUE" />
            }
          />
          <Grid item children={component("0px 0px 2% 2%", 0)} />
        </Grid>
      </Box>
    );
  }

  return component();
}

export default PricingBox;
