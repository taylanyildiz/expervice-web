import { Grid, Typography } from "@mui/material";

function EmptyGrid() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="100%"
      flexGrow={1}
      sx={{ backgroundColor: "white" }}
    >
      <Grid item>
        <Typography children="Empty" />
      </Grid>
    </Grid>
  );
}

export default EmptyGrid;
