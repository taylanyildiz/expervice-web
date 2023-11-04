import { Box, DialogContent, Typography } from "@mui/material";
import { DialogCustomActions, DialogCustomTitle } from ".";
import { PrimaryButton } from "..";
import SelectLocation, { LatLng } from "@Components/SelectLocation";
import { useEffect, useState } from "react";
import { useDialog } from "@Utils/hooks/dialog_hook";

interface SelectLocationDialogProps {
  value: LatLng | null;
  onDone: (value: LatLng | null) => void;
}

function SelectLocationDialog(props: SelectLocationDialogProps) {
  const { value, onDone } = props;

  /// Dialog hook
  const { closeDialog } = useDialog();

  /// Selected marker state
  const [marker, setMarker] = useState<LatLng | null>(null);

  /// Changed marker
  const handleChanged = (value?: LatLng) => {
    if (!value) return;
    setMarker(value);
  };

  /// Initialize component
  useEffect(() => {
    setMarker(value);
  }, [value]);

  return (
    <>
      <DialogCustomTitle
        title="Select Location"
        onClose={() => {
          onDone(null);
        }}
      />
      <DialogContent>
        <Box mt={1} height={500} width="100%" sx={{ backgroundColor: "white" }}>
          <SelectLocation
            width="100%"
            height="100%"
            onChanged={handleChanged}
            value={marker}
          />
        </Box>
        <Box
          width="100%"
          position="absolute"
          display="flex"
          justifyContent="center"
          top={50}
        >
          <Typography
            paddingX={10}
            sx={{ backgroundColor: "white" }}
            children={`${marker?.lat} / ${marker?.lng}`}
          />
        </Box>
      </DialogContent>
      <DialogCustomActions
        actions={[
          <PrimaryButton
            height={30}
            fontWeight="normal"
            color="black"
            children="Close"
            variant="outlined"
            onClick={() => {
              closeDialog();
            }}
          />,
          <PrimaryButton
            disabled={!Boolean(marker)}
            height={30}
            fontWeight="normal"
            color="white"
            children="Save"
            onClick={() => {
              onDone(marker);
            }}
          />,
        ]}
      />
    </>
  );
}

export default SelectLocationDialog;
