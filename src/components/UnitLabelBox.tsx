import { useUser } from "@Features/summary/company/helper/company_helper";
import UnitLabel from "@Models/units/unit_label";
import { Box, Typography } from "@mui/material";

interface UnitLabelBoxProps {
  label: UnitLabel;
}

function UnitLabelBox(props: UnitLabelBoxProps) {
  const { label } = props;

  /// user store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  const color = label.hex_code;
  const name = label.translations?.name?.[lng];

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
