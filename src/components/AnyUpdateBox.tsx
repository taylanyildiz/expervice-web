import TranslateHelper from "@Local/index";
import Colors from "@Themes/colors";
import { Box, Typography } from "@mui/material";

function AnyUpdateBox(props: { anyUpdate: boolean }) {
  if (!props.anyUpdate) return <></>;
  return (
    <Box pl={1} m={0} sx={{ backgroundColor: Colors.warning }}>
      <Typography
        fontSize={13}
        color="white"
        children={TranslateHelper.pleaseClickSave()}
      />
    </Box>
  );
}

export default AnyUpdateBox;
