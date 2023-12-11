import TranslateHelper from "@Local/index";
import { Stack, Typography } from "@mui/material";

function WelcomeBox() {
  return (
    <Stack direction="column" spacing={3}>
      <Typography
        variant="subtitle1"
        children={TranslateHelper.wellcomeHeader1()}
      />
      <Typography variant="h1" children={TranslateHelper.wellcomeHeader2()} />
      <Typography
        variant="subtitle2"
        children={TranslateHelper.wellcomeHeader3()}
      />
    </Stack>
  );
}

export default WelcomeBox;
