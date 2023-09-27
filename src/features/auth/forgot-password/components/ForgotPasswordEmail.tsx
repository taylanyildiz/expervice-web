import { Grid, Typography } from "@mui/material";
import { ForgotPasswordStep } from "../entities";
import TextOutlineField from "@Components/TextOutlineField";

/// Email Props
interface ForogotPasswordEmailProps {
  step: ForgotPasswordStep;
}

function ForgotPasswordEmail(props: ForogotPasswordEmailProps) {
  const {
    step: { desc },
  } = props;

  return (
    <Grid container rowSpacing={2}>
      <Grid item>
        <Typography variant="subtitle2" fontSize={13} children={desc} />
      </Grid>
      <Grid item xs={12}>
        <TextOutlineField fullWidth label="Email" name="email" />
      </Grid>
    </Grid>
  );
}

export default ForgotPasswordEmail;
