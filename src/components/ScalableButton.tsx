import { Button } from "@mui/material";
import React, { ReactNode } from "react";

/// Scalable button props
interface ScalableButtonProps {
  children?: ReactNode;
  backgroundColor?: string;
  color?: string;
  padding?: string | number;
  paddingX?: string | number;
  paddingY?: string | number;
  radius?: string | number;
  variant?: "text" | "contained" | "outlined";
  link?: string;
  suffix?: ReactNode;
  prefix?: ReactNode;
  fontSize?: number | string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function ScalableButton(props?: ScalableButtonProps) {
  let { suffix, prefix, children, fontSize, onClick } = props ?? {};

  return (
    <Button
      onClick={onClick}
      className="scale-button"
      href={props?.link}
      variant={props?.variant ?? "contained"}
      children={children}
      endIcon={suffix}
      startIcon={prefix}
      sx={{
        ":hover": { backgroundColor: props?.backgroundColor },
        fontSize: fontSize,
        backgroundColor: props?.backgroundColor,
        color: props?.color,
        padding: props?.padding,
        borderRadius: props?.radius ?? 2,
        paddingX: props?.paddingX ?? 2,
        paddingY: props?.paddingY ?? 1,
      }}
    />
  );
}

export default ScalableButton;
