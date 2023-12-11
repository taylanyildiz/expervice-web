import { Stack, Typography } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PrimaryButton from "@Components/PrimaryButton";
import { useSummaryDialog } from "../helper/summary_helper";
import TranslateHelper from "@Local/index";

function GroupsEmptyBox() {
  /// Dialog hook
  const { openGroupDialog } = useSummaryDialog();

  return (
    <Stack
      height="100%"
      display="flex"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <ReceiptLongIcon sx={{ height: 200, width: 200 }} />
      <Typography fontWeight="bold" children={TranslateHelper.noFoundGroup()} />
      <Typography children={TranslateHelper.createGroupAndManagement()} />
      <Stack mt={1} direction="row" spacing={3}>
        <PrimaryButton
          children={TranslateHelper.createGroup()}
          onClick={() => openGroupDialog()}
          variant="contained"
          fontWeight="normal"
          color="white"
        />
      </Stack>
    </Stack>
  );
}

export default GroupsEmptyBox;
