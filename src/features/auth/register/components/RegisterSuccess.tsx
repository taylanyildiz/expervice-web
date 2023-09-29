import { Box, Grid, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function RegisterSuccess() {
  return (
    <Box sx={{ boxShadow: 10, borderRadius: 4, p: 3, py: 10 }}>
      <Grid container justifyContent="center" rowSpacing={2}>
        <Grid
          item
          children={
            <Box sx={{ border: "solid 1px green", borderRadius: "100%" }}>
              <CheckCircleIcon
                sx={{ width: 100, height: 100, color: "green" }}
              />
            </Box>
          }
        />
        <Grid item>
          <Typography textAlign="center">
            Your account has been created successfully, you can complete your
            activation with the e-mail we sent to your e-mail address.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RegisterSuccess;
