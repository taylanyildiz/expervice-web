import { Divider, Grid, Typography } from "@mui/material";

function GroupsList() {
  return (
    <Grid container>
      <Grid item p={2} xs={12}>
        <Typography variant="h1" fontSize={19} children="Groups" />
      </Grid>
      <Grid item xs={12} children={<Divider />} />
    </Grid>
  );
}

export default GroupsList;
