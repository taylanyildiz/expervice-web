import PrimaryButton from "@Components/PrimaryButton";
import { Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { dateToFormat } from "@Utils/functions";
import VisibilityComp from "@Components/VisibilityComp";
import { ECustomerStatus } from "../entities/customer_enums";
import Customer from "@Models/customer/customer";
import TranslateHelper from "@Local/index";

interface CustomerStatusButtonProps {
  formik: FormikProps<Customer>;
}

function CustomerStatusButton(props: CustomerStatusButtonProps) {
  const { formik } = props;

  const status = formik.values.status;
  const values = formik.values;
  const userStatus = values.is_active;
  const visibilityButton = status !== ECustomerStatus.Active && userStatus;
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
    ECustomerStatus.NotInvited
  );

  /// Initialize titles
  const initTitles = () => {
    let title = "";
    let button = "";
    switch (status) {
      case ECustomerStatus.Active:
        title = `${TranslateHelper.inviteAccepted()} ${dateToFormat(
          formik.values.accepted_at
        )}`;
        break;
      case ECustomerStatus.Inactive:
        title = TranslateHelper.userInactive();
        if (userStatus) {
          title = TranslateHelper.userNotInvited();
          button = TranslateHelper.inviteUser();
        }
        break;
      case ECustomerStatus.NotInvited:
        title = TranslateHelper.userNotInvited();
        button = TranslateHelper.inviteUser();
        break;
      case ECustomerStatus.Invited:
        title = `${TranslateHelper.invitePending()} ${dateToFormat(
          inviteDate
        )}`;
        button = TranslateHelper.resendInvite();
        if (!isInvited) {
          title = TranslateHelper.inviteWillSent();
          button = TranslateHelper.cancelInvite();
        }
        break;
      case ECustomerStatus.ReSend:
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
      case ECustomerStatus.NotInvited:
        formik.setFieldValue("status", ECustomerStatus.Invited);
        break;
      case ECustomerStatus.ReSend:
        formik.setFieldValue("status", oldStatus);
        break;
      case ECustomerStatus.Inactive:
        formik.setFieldValue("status", ECustomerStatus.ReSend);
        break;
      case ECustomerStatus.Invited:
        if (isInvited)
          return formik.setFieldValue("status", ECustomerStatus.ReSend);
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

export default CustomerStatusButton;
