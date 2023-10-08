import { DialogActions, Grid } from "@mui/material";
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

function DialogCustomActions(props: DialogCustomActionProps) {
  const { leading, actions, actionsSpace, rowSpace } = props;

  return (
    <DialogActions>
      <Grid container rowSpacing={rowSpace ?? 1}>
        <Grid
          item
          flexGrow={1}
          children={leading?.visibility && leading?.children}
        />
        <Grid item>
          <Grid container columnSpacing={actionsSpace ?? 1}>
            {actions.map((e, index) => (
              <Grid item key={index}>
                {e}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </DialogActions>
  );
}

export default DialogCustomActions;
