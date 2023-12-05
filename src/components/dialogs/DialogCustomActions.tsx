import { DialogActions, DialogActionsProps, Grid } from "@mui/material";
import { ReactNode } from "react";
import { VisibilityComp } from "..";

interface LeadingProps {
  visibility?: boolean;
  children: ReactNode;
}

interface DialogCustomActionProps {
  leading?: LeadingProps;
  actions: ReactNode[];
  actionsSpace?: number;
  rowSpace?: number;
  actionVisibility?: boolean;
}

/**
 * Click Action Types
 */
export enum EActionType {
  Save = 1,
  SaveClose = 2,
  SaveNew = 3,
  Delete = 4,
}

function DialogCustomActions(
  props: DialogCustomActionProps & DialogActionsProps
) {
  const { leading, actions, actionsSpace, rowSpace, actionVisibility } = props;

  return (
    <DialogActions {...props} sx={{ zIndex: 4 }}>
      <Grid container rowSpacing={rowSpace ?? 1} alignItems="center">
        <Grid
          item
          flexGrow={1}
          children={leading?.visibility && leading?.children}
        />
        <VisibilityComp visibility={actionVisibility ?? true}>
          <Grid item>
            <Grid container columnSpacing={actionsSpace ?? 1}>
              {actions.map((e, index) => (
                <Grid item key={index}>
                  {e}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </VisibilityComp>
      </Grid>
    </DialogActions>
  );
}

export default DialogCustomActions;
