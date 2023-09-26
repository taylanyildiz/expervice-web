import Colors from "@Themes/colors";
import { Box } from "@mui/material";
import { ReactNode } from "react";

/// Circle button props
interface CircleButtonProps {
    borderColor?: string;
    color?: string;
    children: ReactNode;
    paddingX?: string | number;
    paddingY?: string | number;
    padding?: string | number;
}

function CircleButton(props: CircleButtonProps) {
    const { borderColor, color, children, paddingX, paddingY, padding } = props;
    const border = `solid 2px ${borderColor ?? Colors.secodary}`;

    return (
        <Box
            className="scalable-circle-button"
            p={padding ?? 1.0}
            px={paddingX}
            paddingY={paddingY}
            alignItems="center"
            display="flex"
            justifyContent="center"
            sx={{ borderRadius: "100%", border: border, backgroundColor: color }}>
            {children}
        </Box>
    )
}

export default CircleButton;