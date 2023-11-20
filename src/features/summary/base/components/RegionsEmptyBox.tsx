import { Stack, Typography } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PrimaryButton from "@Components/PrimaryButton";
import { useDialog } from "@Utils/hooks/dialog_hook";
import RegionDialog from "../dialogs/RegionDialog";

function RegionsEmptyBox() {
  /// Dialog hook
  const { openDialog } = useDialog();

  const handleClick = () => {
    openDialog(<RegionDialog />, "md");
  };

  return (
    <Stack
      height="100%"
      display="flex"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <ReceiptLongIcon sx={{ height: 200, width: 200 }} />
      <Typography fontWeight="bold" children="No Found Any Region" />
      <Typography children="Create Region And Management" />
      <Stack mt={1} direction="row" spacing={3}>
        <PrimaryButton
          children="Create Region"
          onClick={handleClick}
          variant="contained"
          fontWeight="normal"
          color="white"
        />
      </Stack>
    </Stack>
  );
}

export default RegionsEmptyBox;
