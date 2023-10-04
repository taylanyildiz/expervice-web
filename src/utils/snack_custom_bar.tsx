import { IconButton } from "@mui/material";
import { AxiosResponse } from "axios";
import { enqueueSnackbar, closeSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";

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
}

export default SnackCustomBar;
