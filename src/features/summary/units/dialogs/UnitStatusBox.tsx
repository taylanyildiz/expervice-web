import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function UnitStatusBox(props: { status: boolean }) {
  const { status } = props;

  /// Tİtle state
  const [title, setTitle] = useState<string>("CLOSED");
  const [color, setColor] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("");

  /// Initialize component
  useEffect(() => {
    if (status) {
      setBgColor("#D7F7E4");
      setColor("#262C28");
      return setTitle("OPENED");
    }
    setBgColor("#CAD0D7");
    setColor("#1A1B1C");
    setTitle("Closed");
  }, [status]);

  return (
    <Box py={0.3} px={1} sx={{ backgroundColor: bgColor, borderRadius: 10 }}>
      <Typography variant="h1" fontSize={11} color={color} children={title} />
    </Box>
  );
}

export default UnitStatusBox;
