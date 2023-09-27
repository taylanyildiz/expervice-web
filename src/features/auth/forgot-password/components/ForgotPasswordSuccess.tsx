import { Box, Grid, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function ForgotPasswordSuccess() {
  return (
    <Grid container justifyContent="center" rowSpacing={2}>
      <Grid
        item
        children={
          <Box p={0.1} sx={{ border: "solid 1px green", borderRadius: "100%" }}>
            <CheckCircleIcon sx={{ width: 100, height: 100, color: "green" }} />
          </Box>
        }
      />
      <Grid item>
        <Typography textAlign="center">
          Your password has been successfully updated
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ForgotPasswordSuccess;
