import UnitLabel from "@Models/units/unit_label";
import { Box, Typography } from "@mui/material";

interface UnitLabelBoxProps {
  label: UnitLabel;
}

function UnitLabelBox(props: UnitLabelBoxProps) {
  const { label } = props;

  const color = label.hex_code;
  const name = label.name;

  return (
    <Box
      sx={{
        backgroundColor: color,
        borderRadius: 1,
        padding: 1,
        py: 0.3,
      }}
    >
      <Typography fontSize={12} children={name} />
    </Box>
  );
}

export default UnitLabelBox;
