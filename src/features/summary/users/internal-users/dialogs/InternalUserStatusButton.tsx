import PrimaryButton from "@Components/PrimaryButton";
import InternalUser from "@Models/internal-user/internal_user";
import { Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { EInternalStatus } from "../entities/internal_user_enums";
import { useEffect, useState } from "react";
import { dateToFormat } from "@Utils/functions";
import VisibilityComp from "@Components/VisibilityComp";
import TranslateHelper from "@Local/index";

interface InternalUserStatusButtonProps {
  formik: FormikProps<InternalUser>;
}

function InternalUserStatusButton(props: InternalUserStatusButtonProps) {
  const { formik } = props;

  const status = formik.values.status;
  const values = formik.values;
  const userStatus = values.is_active;
  const visibilityButton = status !== EInternalStatus.Active && userStatus;
  const inviteDate = formik.values.invited_at;
  const isInvited = Boolean(inviteDate);

  useEffect(() => {
    initTitles();
  }, [formik.values]);

  /// Invite title
  const [title, setTitle] = useState(TranslateHelper.userNotInvited());

  /// Button title
  const [button, setButton] = useState(TranslateHelper.inviteUser());

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
        title = `${TranslateHelper.inviteAccepted()} ${dateToFormat(
          formik.values.accepted_at
        )}`;
        break;
      case EInternalStatus.Inactive:
        title = TranslateHelper.userInactive();
        if (userStatus) {
          title = TranslateHelper.userNotInvited();
          button = TranslateHelper.inviteUser();
        }
        break;
      case EInternalStatus.NotInvited:
        title = TranslateHelper.userNotInvited();
        button = TranslateHelper.inviteUser();
        break;
      case EInternalStatus.Invited:
        title = `${TranslateHelper.invitePending()} ${dateToFormat(
          inviteDate
        )}`;
        button = TranslateHelper.resendInvite();
        if (!isInvited) {
          title = TranslateHelper.inviteWillSent();
          button = TranslateHelper.cancelInvite();
        }
        break;
      case EInternalStatus.ReSend:
        title = TranslateHelper.inviteWillSent();
        button = TranslateHelper.cancelInvite();
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
