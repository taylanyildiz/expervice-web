import PrimaryButton from "@Components/PrimaryButton";
import SelectUnit from "@Components/SelectUnit";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import { Box, DialogContent } from "@mui/material";
import { useJobDialog } from "../helper/job_helper";
import { useState } from "react";
import Unit from "@Models/units/unit";
import TranslateHelper from "@Local/index";

function SelectUnitDialog() {
  /// Job dialog hook
  const { openJobDialog, closeDialog } = useJobDialog();

  /// Selected unit state
  const [unit, setUnit] = useState<Unit | null>(null);

  return (
    <>
      <DialogCustomTitle title={TranslateHelper.selectUnit()} />
      <DialogContent>
        <Box mt={1} p={1} sx={{ backgroundColor: "white" }}>
          <SelectUnit
            fullWidth
            label={TranslateHelper.unit()}
            value={unit}
            onChanged={(e) => {
              setUnit(e);
            }}
          />
        </Box>
      </DialogContent>
      <DialogCustomActions
        actions={[
          <PrimaryButton
            onClick={() => {
              closeDialog();
              openJobDialog({ unit: unit });
            }}
            paddingX={1}
            paddingY={0.1}
            fontWeight="normal"
            fontSize={14}
            variant="outlined"
            children={TranslateHelper.continue()}
          />,
        ]}
      />
    </>
  );
}

export default SelectUnitDialog;
