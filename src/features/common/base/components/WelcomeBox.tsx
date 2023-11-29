import { Stack, Typography } from "@mui/material";

function WelcomeBox() {
  return (
    <Stack direction="column" spacing={3}>
      <Typography
        variant="subtitle1"
        children="EXPERVICE JOB MANAGEMENT SOFTWARE"
      />
      <Typography variant="h1" children="Say goodbye to constant chaos" />
      <Typography
        variant="subtitle2"
        children="Align your team. Drive growth. Impress clients. With Buildertrend construction software, you can finally work simpler and run your business – without letting it run you."
      />
    </Stack>
  );
}

export default WelcomeBox;
