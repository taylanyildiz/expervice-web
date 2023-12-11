import { Box, Stack, Typography } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PrimaryButton from "@Components/PrimaryButton";
import { useUnitDialog } from "../helper/unit_helper";
import TranslateHelper from "@Local/index";

function UnitEmptyBox() {
  /// Unit dialog
  const { openUnitDialog } = useUnitDialog();

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
    >
      <Stack textAlign="center" alignItems="center" spacing={1}>
        <ReceiptLongIcon sx={{ color: "black", height: 100, width: 100 }} />
        <Typography children={TranslateHelper.noFoundUnit()} />
        <PrimaryButton
          fontWeight="normal"
          color="white"
          variant="contained"
          children={TranslateHelper.addUnit()}
          onClick={() => {
            openUnitDialog();
          }}
        />
      </Stack>
    </Box>
  );
}

export default UnitEmptyBox;
