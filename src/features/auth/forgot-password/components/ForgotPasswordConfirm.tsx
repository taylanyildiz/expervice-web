import { Grid, Typography } from "@mui/material";
import { ForgotPasswordStep } from "../entities";
import TextOutlineField from "@Components/TextOutlineField";

/// Confirm Props
interface ForogotPasswordConfirmProps {
  step: ForgotPasswordStep;
}

function ForgotPasswordConfirm(props: ForogotPasswordConfirmProps) {
  const {
    step: { desc },
  } = props;

  return (
    <Grid container rowSpacing={2}>
      <Grid item>
        <Typography variant="subtitle2" fontSize={13} children={desc} />
      </Grid>
      <Grid item xs={12}>
        <TextOutlineField fullWidth label="Code" name="text" maxLength={6} />
      </Grid>
    </Grid>
  );
}

export default ForgotPasswordConfirm;
