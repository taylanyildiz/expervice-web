import PrimaryButton from "@Components/PrimaryButton";
import InternalUser from "@Models/internal-user/internal_user";
import { Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { EInternalStatus } from "../entities/internal_user_enums";
import { useEffect, useState } from "react";
import { dateToFormat } from "@Utils/functions";
import VisibilityComp from "@Components/VisibilityComp";

interface InternalUserStatusButtonProps {
  formik: FormikProps<InternalUser>;
}

function InternalUserStatusButton(props: InternalUserStatusButtonProps) {
  const { formik } = props;

  const status = formik.values.status;
  const values = formik.values;
  const userStatus = values.is_active;
  const visibilityButton = status !== EInternalStatus.Active && userStatus;
  const isInvited = Boolean(formik.values.invited_at);

  useEffect(() => {
    initTitles();
  }, [formik.values]);

  /// Invite title
  const [title, setTitle] = useState("User has not been invited");

  /// Button title
  const [button, setButton] = useState("Invite User");

  /// Old status
  const [oldStatus, setOldStatus] = useState<number | undefined>(
    EInternalStatus.NotInvited
  );

  /// Initialize titles
  const initTitles = () => {
    let title = "";
    let button = "";
    switch (status) {
      case EInternalStatus.Active:
        title = `Invite Accepted ${dateToFormat(formik.values.accepted_at)}`;
        break;
      case EInternalStatus.Inactive:
        title = "User Inactive";
        if (userStatus) {
          title = "User has not been invited";
          button = "Invite User";
        }
        break;
      case EInternalStatus.NotInvited:
        title = "User has not been invited";
        button = "Invite User";
        break;
      case EInternalStatus.Invited:
        title = "Invite Pending Mon, Jul 17, 5:13 PM";
        button = "Re-Send Invite";
        if (!isInvited) {
          title = "Invite will be sent on save";
          button = "Cancel Invite";
        }
        break;
      case EInternalStatus.ReSend:
        title = "Invite will be sent on save";
        button = "Cancel Invite";
        break;
    }
    setTitle(title);
    if (button) setButton(button);
  };

  /// Changed status handle
  const onChangedStatusHandle = () => {
    setOldStatus(status);
    switch (status) {
      case EInternalStatus.NotInvited:
        formik.setFieldValue("status", EInternalStatus.Invited);
        break;
      case EInternalStatus.ReSend:
        formik.setFieldValue("status", oldStatus);
        break;
      case EInternalStatus.Inactive:
        formik.setFieldValue("status", EInternalStatus.ReSend);
        break;
      case EInternalStatus.Invited:
        if (isInvited)
          return formik.setFieldValue("status", EInternalStatus.ReSend);
        formik.setFieldValue("status", oldStatus);
        break;
    }
  };

  return (
    <Grid container columnSpacing={1} alignItems="center">
      <Grid item>
        <Typography fontSize={12} children={title} />
      </Grid>
      <VisibilityComp visibility={visibilityButton}>
        <Grid item>
          <PrimaryButton
            variant="outlined"
            backgroundColor="white"
            border="solid 1px black"
            children={button}
            onClick={onChangedStatusHandle}
            fontSize={12}
            fontWeight="normal"
            padding={0}
            paddingX={1}
            paddingY={0.1}
          />
        </Grid>
      </VisibilityComp>
    </Grid>
  );
}

export default InternalUserStatusButton;
