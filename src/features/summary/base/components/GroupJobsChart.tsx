import { Box, Grid } from "@mui/material";
import { BarChart } from "@mui/x-charts";

function GroupJobsChart() {
  return (
    <Box p={4} sx={{ backgroundColor: "white" }}>
      {/* <Grid container></Grid> */}
      <BarChart
        xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        width={600}
        height={300}
      />
    </Box>
  );
}

export default GroupJobsChart;
