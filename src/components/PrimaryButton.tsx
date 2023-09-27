import { Button } from "@mui/material";
import { ReactNode } from "react";

/// Primary button props
interface PrimaryButtonProps {
    children?: ReactNode,
    backgroundColor?: string,
    color?: string,
    padding?: string | number,
    paddingX?: string | number,
    paddingY?: string | number,
    radius?: string | number,
    variant?: "text" | "contained" | "outlined",
    link?: string,
    suffix?: ReactNode,
    prefix?: ReactNode,
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "submit" | "button" | "reset";
    width?: number | string,
    height?: number | string,
    fullWidth?: boolean,
    fontWeight?: string | number,
    fontSize?: string | number
}

function PrimaryButton(props?: PrimaryButtonProps) {
    let { prefix, suffix, children, onClick, type, fullWidth, width, height, fontWeight, fontSize } = props ?? {};

    return (
        <Button
            fullWidth={fullWidth}
            type={type}
            onClick={onClick}
            href={props?.link}
            variant={props?.variant ?? "contained"}
            children={children}
            endIcon={suffix}
            startIcon={prefix}
            disableFocusRipple
            disableRipple
            disableTouchRipple
            sx={{
                ":hover": { backgroundColor: props?.backgroundColor },
                height: height,
                width: width,
                backgroundColor: props?.backgroundColor,
                color: props?.color ?? "black",
                padding: props?.padding,
                borderRadius: props?.radius,
                paddingX: props?.paddingX,
                paddingY: props?.paddingY,
                fontWeight: fontWeight,
                fontSize: fontSize,
            }}
        />
    )
}

export default PrimaryButton;