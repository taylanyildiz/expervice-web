import { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { DialogTitle, Grid, IconButton, Typography } from "@mui/material";

interface DialogCustomTitleProps {
  title: ReactNode;
  onClose?: () => void;
}

function DialogCustomTitle(props: DialogCustomTitleProps) {
  const { title, onClose } = props;

  /// Dialog hooks
  const { closeDialog } = useDialog();

  /// Close dialog handle
  const onCloseHandle = () => {
    closeDialog();
    onClose?.();
  };

  return (
    <DialogTitle>
      <Grid container alignItems="center">
        <Grid item flexGrow={1}>
          <Typography variant="h1" fontSize={17} children={title} />
        </Grid>
        <Grid item>
          <IconButton onClick={onCloseHandle}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
    </DialogTitle>
  );
}

export default DialogCustomTitle;
