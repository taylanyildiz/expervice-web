import { Grid, Typography } from "@mui/material";
import { ForgotPasswordStep } from "../entities";
import TextOutlineField from "@Components/TextOutlineField";

/// Reset Props
interface ForgotPasswordResetProps {
  step: ForgotPasswordStep;
}

function ForgotPasswordReset(props: ForgotPasswordResetProps) {
  const {
    step: { desc },
  } = props;

  return (
    <Grid container rowSpacing={2}>
      <Grid item>
        <Typography variant="subtitle2" fontSize={13} children={desc} />
      </Grid>
      <Grid item xs={12}>
        <TextOutlineField fullWidth secret label="Password" name="password" />
      </Grid>
      <Grid item xs={12}>
        <TextOutlineField
          fullWidth
          secret
          label="Confirm Password"
          name="confirm_password"
        />
      </Grid>
    </Grid>
  );
}

export default ForgotPasswordReset;
