import {
  Backdrop,
  CircularProgress,
  Dialog,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode, createContext, useContext, useRef, useState } from "react";

/// Empty function
const empty = () => {};
const emptyPromise = async () => {};

type openDialog = (children: ReactNode) => void;
type openLoading = (onBuild?: () => Promise<any>) => Promise<any>;
type closeDialog = () => void;

/// Provider consxt
type ProviderContext = readonly [openDialog, openLoading, closeDialog];

const DialogContext = createContext<ProviderContext>([
  empty,
  emptyPromise,
  empty,
]);

export const useDialog = () => {
  const c = useContext(DialogContext);
  return { openDialog: c[0], openLoading: c[1], closeDialog: c[2] };
};

type DialogParams = {
  children: ReactNode;
  open: boolean;
  key?: string | number;
  onClose?: Function;
  onExited?: Function;
};

type DialogContainerProps = DialogParams & {
  onClose: () => void;
  onKill: () => void;
};

function DialogContainer(props: DialogContainerProps) {
  const { children, open, onClose, onKill } = props;

  return (
    <Dialog open={open} onClose={onClose} onTransitionExited={onKill}>
      {children}
    </Dialog>
  );
}

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

export default function DialogProvider(props: { children: ReactNode }) {
  const [dialogs, setDialogs] = useState<DialogParams[]>([
    {
      children: <LoadingDialog />,
      open: false,
      key: "loading-dialog",
    },
  ]);

  /// Create dialog
  const createDialog = (children: ReactNode) => {
    const dialog = { ...{ children }, open: true };
    setDialogs((dialogs) => [...dialogs, dialog]);
  };

  /// Close Dialog
  const closeDialog = () => {
    setDialogs((dialogs) => {
      const latestDialog = dialogs.pop();
      if (!latestDialog) return dialogs;
      if (latestDialog.onClose) latestDialog.onClose();
      return [...dialogs].concat({ ...latestDialog, open: false });
    });
  };

  /// Open loading dialog
  const openLoadingDialog = async (
    onBuild?: () => Promise<any>
  ): Promise<any> => {
    onChangedLoading();
    const result = await onBuild?.();
    onChangedLoading(false);
    return result;
  };

  /// Close loading
  const onChangedLoading = (value?: boolean) => {
    const index = dialogs.findIndex((e) => e.key === "loading-dialog");
    if (index === -1) return;
    const values = [...dialogs];
    values[index].open = value ?? true;
    setDialogs(values);
  };

  /// Context values
  const contextValue = useRef([
    createDialog,
    openLoadingDialog,
    closeDialog,
  ] as const);

  return (
    <DialogContext.Provider value={contextValue.current}>
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
