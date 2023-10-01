import { Box, Grid } from "@mui/material";

function SummaryPage() {
  return (
    <Grid container columnSpacing={2}>
      <Grid sx={{ flexGrow: 1 }} item mr={3}>
        {/* Left Side */}
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{ borderRadius: 1, height: 200, backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{ borderRadius: 1, height: 200, backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{ borderRadius: 1, height: 200, backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{ borderRadius: 1, height: 200, backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{ borderRadius: 1, height: 200, backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{ borderRadius: 1, height: 200, backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{ borderRadius: 1, height: 200, backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{ borderRadius: 1, height: 200, backgroundColor: "white" }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} sx={{ backgroundColor: "white" }}>
        {/* Right Side */}
      </Grid>
    </Grid>
  );
}

export default SummaryPage;
