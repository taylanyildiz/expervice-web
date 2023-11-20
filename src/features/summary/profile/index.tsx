import PrimaryButton from "@Components/PrimaryButton";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import Colors from "@Themes/colors";
import { Box, DialogContent, Typography } from "@mui/material";
import UserInformationBox from "./components/UserInformationBox";
import { useProfile, useProfileProcess } from "./helper/profile_helper";
import User from "@Models/user";
import { useFormik } from "formik";
import { useEffect } from "react";
import TabBar from "@Components/TabBar";
import ProfileOverviewContent from "./components/ProfileOverviewContent";
import VisibilityComp from "@Components/VisibilityComp";
import UserRepository from "@Repo/user_repository";
import { useDialog } from "@Utils/hooks/dialog_hook";

function ProfileDialog() {
  /// Account store
  const { user } = useProfile();

  /// Dialog hook
  const { openLoading, closeDialog } = useDialog();

  /// User repository
  const userRepo = new UserRepository();

  const onSubmitHandle = async () => {
    const result = await openLoading(async () => {
      let result: boolean = false;
      if (profile) result = await userRepo.updateProfile(profile);
      return result;
    });
    if (!result) return;
    closeDialog();
  };

  /// Formik
  const initialValues: User = {
    first_name: "",
    last_name: "",
    email: "",
    user_phone: {
      phone_code: "+90",
      phone_number: "",
    },
  };
  const formik = useFormik({
    initialValues,
    onSubmit: onSubmitHandle,
  });

  // Profile process hook
  const { anyUpdate, profile } = useProfileProcess(formik);

  /// Initial state
  useEffect(() => {
    if (!user) return;
    for (let [k, v] of Object.entries(user)) {
      formik.setFieldValue(k, v);
    }
  }, [user]);

  return (
    <>
      <DialogCustomTitle title="Profile" />
      <VisibilityComp visibility={anyUpdate}>
        <Box pl={1} m={0} sx={{ backgroundColor: Colors.warning }}>
          <Typography
            fontSize={13}
            color="white"
            children="Please click save to save changes"
          />
        </Box>
      </VisibilityComp>
      <DialogContent>
        <UserInformationBox />
        <Box mt={1}>
          <TabBar
            tabs={[
              {
                title: "Overivew",
                panel: <ProfileOverviewContent formik={formik} />,
              },
            ]}
          />
        </Box>
      </DialogContent>
      <DialogCustomActions
        actions={[
          <PrimaryButton
            variant="outlined"
            fontWeight="normal"
            color="white"
            children="Save"
            backgroundColor={Colors.primaryDark}
            onClick={() => formik.handleSubmit()}
          />,
        ]}
      />
    </>
  );
}

export default ProfileDialog;
