import { Box, Grid } from "@mui/material";
import GroupsList from "./components/GroupsList";
import SummarySideBar from "./components/SummarySideBar";
import RegionInfoBox from "./components/RegionInfoBox";
import GroupInfoBox from "./components/GroupInfoBox";
import GroupJobsChart from "./components/GroupJobsChart";

function SummaryPage() {
  return (
    <div className="summary-layout">
      <SummarySideBar />
      <Grid container ml={1}>
        <Grid item xs={9} py={1.3}>
          <Box>
            <Grid container rowSpacing={2}>
              <Grid item xs={12} children={<RegionInfoBox />} />
              <Grid item xs={12} children={<GroupInfoBox />} />
              <Grid item xs={12} children={<GroupJobsChart />} />
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box className="summary-base-groups" children={<GroupsList />} />
        </Grid>
      </Grid>
    </div>
  );
}

export default SummaryPage;
