import { Box, Stack, Typography } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PrimaryButton from "@Components/PrimaryButton";
import { useUnitDialog } from "../helper/unit_helper";

function UnitEmptyBox() {
  /// Unit dialog
  const { openUnitDialog } = useUnitDialog();

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack>
        <ReceiptLongIcon sx={{ color: "black", height: 100, width: 100 }} />
        <Typography children="No Found Unit" />
        <PrimaryButton
          fontWeight="normal"
          color="white"
          variant="contained"
          children="Add Unit"
          onClick={() => {
            openUnitDialog();
          }}
        />
      </Stack>
    </Box>
  );
}

export default UnitEmptyBox;
