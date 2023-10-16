import {
  Backdrop,
  Breakpoint,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Fragment,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import PrimaryButton from "@Components/PrimaryButton";

/// Empty function
const empty = () => {};
const emptyPromise = async () => {};
const emptyPromiseBoolean = async () => false;

interface ProviderContext {
  openDialog: (children: ReactNode, width?: Breakpoint) => void;
  openLoading: (onBuild?: () => Promise<any>) => Promise<any>;
  closeDialog: () => void;
  openConfirm: (
    title: ReactNode | string,
    content: ReactNode | string
  ) => Promise<boolean>;
}

/// Dialog Context
const DialogContext = createContext<ProviderContext>({
  openDialog: empty,
  openLoading: emptyPromise,
  closeDialog: empty,
  openConfirm: emptyPromiseBoolean,
});

/// Dailog Hooks
export const useDialog = () => useContext(DialogContext);

type DialogParams = {
  children: ReactNode;
  width?: Breakpoint;
  open: boolean;
  key?: string | number;
  onClose?: Function;
  onExited?: Function;
};

type DialogContainerProps = DialogParams & {
  onClose: () => void;
  onKill: () => void;
};

/// Dialog Container
function DialogContainer(props: DialogContainerProps) {
  const { children, width, open, onClose, onKill } = props;

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth={width}
      onClose={onClose}
      onTransitionExited={onKill}
    >
      {children}
    </Dialog>
  );
}

/// Loading Dialog
function LoadingDialog() {
  return (
    <Backdrop open sx={{ color: "#fff", backgroundColor: "transparent" }}>
      <Stack gap={1} justifyContent="center" alignItems="center">
        <CircularProgress color="inherit" />
        <Typography color="white">Loading...</Typography>
      </Stack>
    </Backdrop>
  );
}

/// Confirm Dialog
function ConfirmDialog(props: {
  onProcess: (result: boolean) => void;
  title: ReactNode | string;
  content: ReactNode | string;
}) {
  const { onProcess, title, content } = props;

  const onClickHandle = (result: boolean) => {
    onProcess(result);
  };

  return (
    <Fragment>
      <DialogTitle>
        <Grid container alignItems="center">
          <Grid item flexGrow={1}>
            <Typography variant="h1" fontSize={17} children={title} />
          </Grid>
          <Grid item>
            <IconButton onClick={() => onClickHandle(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent sx={{ p: 1, backgroundColor: "white" }}>
        <Grid container sx={{ borderRadius: 1 }}>
          <Grid item xs={12}>
            <Typography children={content} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ boxShadow: "none" }}>
        <PrimaryButton
          height={30}
          fontWeight="normal"
          color="black"
          children="Close"
          variant="outlined"
          onClick={() => onClickHandle(false)}
        />
        <PrimaryButton
          height={30}
          fontWeight="normal"
          color="white"
          children="Confirm"
          onClick={() => onClickHandle(true)}
        />
        ,
      </DialogActions>
    </Fragment>
  );
}

export default function DialogProvider(props: { children: ReactNode }) {
  const [dialogs, setDialogs] = useState<DialogParams[]>([]);

  /// Create dialog
  const openDialog = (children: ReactNode, width?: Breakpoint) => {
    const dialog = { ...{ children }, open: true, width: width };
    setDialogs((dialogs) => [...dialogs, dialog]);
  };

  /// Close Dialog
  const closeDialog = () => {
    setDialogs((dialogs) => {
      const latestDialog = dialogs.pop();
      if (!latestDialog) return dialogs;
      if (latestDialog.onClose) latestDialog.onClose();
      return [...dialogs];
    });
  };

  /// Open loading dialog
  const openLoading = async (onBuild?: () => Promise<any>): Promise<any> => {
    openDialog(<LoadingDialog />);
    const result = await onBuild?.();
    closeDialog();
    return result;
  };

  /// Open loading dialog
  const openConfirm = async (
    title: ReactNode | string,
    content: ReactNode | string
  ): Promise<boolean> => {
    return await new Promise((resolve) => {
      openDialog(
        <ConfirmDialog
          onProcess={(result: boolean) => {
            closeDialog();
            resolve(result);
          }}
          content={content}
          title={title}
        />,
        "xs"
      );
    });
  };

  /// Context values
  const contextValue: ProviderContext = {
    openDialog,
    closeDialog,
    openLoading,
    openConfirm,
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {props.children}

      {/* Dialogs */}
      {dialogs.map((dialog, i) => {
        const { onClose, ...dialogParams } = dialog;
        const handleKill = () => {
          if (dialog.onExited) dialog.onExited();
          setDialogs((dialogs) => dialogs.slice(0, dialogs.length - 1));
        };

        return (
          <DialogContainer
            key={i}
            onClose={closeDialog}
            onKill={handleKill}
            {...dialogParams}
          />
        );
      })}
    </DialogContext.Provider>
  );
}
