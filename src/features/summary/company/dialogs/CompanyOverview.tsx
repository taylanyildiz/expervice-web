import { Grid, Typography } from "@mui/material";

function CompanyOverview() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1" fontSize={14} children="Company Information" />
      </Grid>
    </Grid>
  );
}

export default CompanyOverview;
