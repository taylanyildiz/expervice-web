import { useDialog } from "@Utils/hooks/dialog_hook";
import ProfileDialog from "..";
import { useSelector } from "react-redux";
import { RootState } from "@Store/index";
import ResetPasswordDialog from "../dialogs/ResetPasswordDialog";
import { FormikProps } from "formik";
import User from "@Models/user";
import { useEffect, useState } from "react";
import UserProfile from "../entities/user_profile";
import { equalInterface } from "@Utils/functions";

export function useProfile() {
  return useSelector((state: RootState) => state.account);
}

export function useProfileDialog() {
  const { openDialog } = useDialog();
  return {
    openProfileDialog: () => openDialog(<ProfileDialog />, "md"),
    openResetPasswordDailog: () => openDialog(<ResetPasswordDialog />, "xs"),
  };
}

export function useProfileProcess(formik: FormikProps<User>) {
  const { user } = useProfile();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [anyUpdate, setAnyUpdate] = useState<boolean>(false);

  useEffect(() => {
    const values = formik.values;
    setProfile(null);
    setAnyUpdate(false);

    const checkProfile = () => {
      const oldProfile: UserProfile = {
        first_name: user?.first_name,
        last_name: user?.last_name,
        phone_code: user?.user_phone?.phone_code,
        phone_number: user?.user_phone?.phone_number,
        email: user?.email,
      };
      const newProfile: UserProfile = {
        first_name: values?.first_name,
        last_name: values?.last_name,
        phone_code: values?.user_phone?.phone_code,
        phone_number: values?.user_phone?.phone_number,
        email: values?.email,
      };
      const updateProfile = !equalInterface(newProfile, oldProfile);
      setAnyUpdate((prev) => prev || updateProfile);
      if (updateProfile) setProfile(newProfile);
    };

    checkProfile();
  }, [formik.values, user]);

  return {
    anyUpdate,
    profile,
  };
}
