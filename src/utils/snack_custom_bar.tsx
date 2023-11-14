import { IconButton, Stack, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { enqueueSnackbar, closeSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { MessagePayload } from "firebase/messaging";
import Images from "@Assets/images";

abstract class SnackCustomBar {
  /**
   * Response status snackbar
   * @param response
   * @param props
   * @returns
   */
  public static status(
    response: AxiosResponse<any, any>,
    props?: { display?: boolean }
  ) {
    let { display } = props ?? { display: true };
    if (!display) return;
    const statusCode = response.status;
    const success = statusCode === 200 || statusCode === 201;
    let message = response.data?.message;
    message ??= success ? "Success" : "An Error Occured";
    if (response.status === 422) {
      message = JSON.stringify(response.data.error);
    }
    const variant = success ? "success" : "error";
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: "center", vertical: "top" },
      autoHideDuration: 2000,
      action: (id) => {
        return (
          <IconButton
            sx={{ color: "white" }}
            onClick={() => closeSnackbar(id)}
            children={<CloseIcon sx={{ width: 20, height: 20 }} />}
          />
        );
      },
    });
  }

  /**
   * Notification displayed
   * @param payload
   */
  public static notification(payload: MessagePayload) {
    const title = payload.notification?.title;
    const body = payload.notification?.body;
    const children = (
      <Stack direction="row" spacing={1} alignItems="center">
        {Images.logoBlack({ width: 30 })}
        <Stack flex={1} direction="column" spacing={0.3}>
          <Typography variant="h1" fontSize={14} children={title} />
          <Typography fontSize={13} children={body} />
        </Stack>
      </Stack>
    );
    enqueueSnackbar(children, {
      anchorOrigin: { horizontal: "right", vertical: "top" },
      autoHideDuration: 4000,
      style: {
        backgroundColor: "white",
        boxShadow: "10.0",
      },
      action: (id) => {
        return (
          <IconButton
            sx={{ color: "black" }}
            onClick={() => closeSnackbar(id)}
            children={<CloseIcon sx={{ width: 20, height: 20 }} />}
          />
        );
      },
    });
  }
}

export default SnackCustomBar;
