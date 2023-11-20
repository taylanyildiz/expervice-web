import PrimaryButton from "@Components/PrimaryButton";
import SelectUnit from "@Components/SelectUnit";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import { Box, DialogContent } from "@mui/material";
import { useJobDialog } from "../helper/job_helper";
import { useState } from "react";
import Unit from "@Models/units/unit";

function SelectUnitDialog() {
  /// Job dialog hook
  const { openJobDialog, closeDialog } = useJobDialog();

  /// Selected unit state
  const [unit, setUnit] = useState<Unit | null>(null);

  return (
    <>
      <DialogCustomTitle title="Select Unit" />
      <DialogContent>
        <Box mt={1} p={1} sx={{ backgroundColor: "white" }}>
          <SelectUnit
            fullWidth
            label="Unit"
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
            children="Continue"
          />,
        ]}
      />
    </>
  );
}

export default SelectUnitDialog;
