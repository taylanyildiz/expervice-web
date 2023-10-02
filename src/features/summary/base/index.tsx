import { Box, Grid } from "@mui/material";
import GroupsList from "./components/GroupsList";

function SummaryPage() {
  return (
    <div className="summary-base-layout">
      <Box className="summary-base-page">
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Box height={200} sx={{ backgroundColor: "white" }} />
          </Grid>
          <Grid item xs={12}>
            <Box height={200} sx={{ backgroundColor: "white" }} />
          </Grid>
          <Grid item xs={12}>
            <Box height={200} sx={{ backgroundColor: "white" }} />
          </Grid>
          <Grid item xs={12}>
            <Box height={200} sx={{ backgroundColor: "white" }} />
          </Grid>
          <Grid item xs={12}>
            <Box height={200} sx={{ backgroundColor: "white" }} />
          </Grid>
        </Grid>
      </Box>
      <Box className="summary-base-groups" children={<GroupsList />} />
    </div>
  );
}

export default SummaryPage;
