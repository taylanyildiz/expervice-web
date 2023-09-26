import { Button, Grid } from "@mui/material";
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
    icon?:ReactNode,
}

function PrimaryButton(props?: PrimaryButtonProps) {
    let {icon,children} = props ?? {};


    /// With icon
    if(icon){
        children = (
            <Grid container>
                <Grid item children={icon}/>
                <Grid item children={children}/>
            </Grid>
        )
    }

    return (
        <Button
            href={props?.link}
            variant={props?.variant ?? "contained"}
            children={children}
            disableFocusRipple
            disableRipple
            disableTouchRipple
            sx={{
                ":hover": {backgroundColor: props?.backgroundColor },
                backgroundColor: props?.backgroundColor,
                color: props?.color??"black",
                padding: props?.padding,
                borderRadius: props?.radius ?? 2,
                paddingX: props?.paddingX ?? 2,
                paddingY: props?.paddingY ?? 1,
            }}
        />
    )
}

export default PrimaryButton;