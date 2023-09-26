import { Button, Grid } from "@mui/material";
import { ReactNode } from "react";

/// Scalable button props
interface ScalableButtonProps {
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
    fontSize?: number | string
}

function ScalableButton(props?: ScalableButtonProps) {
    let { suffix, prefix, children, fontSize } = props ?? {};

    /// With icon
    if (prefix || suffix) {
        children = (
            <Grid container columnSpacing={0.4}>
                {prefix && <Grid item children={prefix} />}
                <Grid item children={children} />
                {suffix && <Grid item children={suffix} />}
            </Grid>
        )
    }

    return (
        <Button
            className="scale-button"
            href={props?.link}
            variant={props?.variant ?? "contained"}
            children={children}
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
    )
}

export default ScalableButton;