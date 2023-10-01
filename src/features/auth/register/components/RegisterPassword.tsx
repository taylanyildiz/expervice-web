import TextOutlineField from "@Components/TextOutlineField";
import { Grid, Typography } from "@mui/material";

function RegisterPassword() {
  return (
    <Grid container mt={3}>
      <Grid item xs={12} justifyContent="start" display="flex">
        <Typography
          variant="h1"
          fontSize={20}
          children="Define Your Password"
        />
      </Grid>
      <Grid item xs={7} mt={2}>
        <TextOutlineField
          fullWidth
          secret
          type="password"
          name="password"
          label="Password"
        />
      </Grid>
      <Grid item xs={7}>
        <TextOutlineField
          fullWidth
          secret
          name="confirm_password"
          label="Confirm Password"
          type="password"
        />
      </Grid>
    </Grid>
  );
}

export default RegisterPassword;
