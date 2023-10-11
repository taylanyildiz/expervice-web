import PrimaryButton from "@Components/PrimaryButton";
import TabBar from "@Components/TabBar";
import VisibilityComp from "@Components/VisibilityComp";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { AppDispatch, RootState } from "@Store/index";
import { setInternalUser } from "@Store/internal_user_store";
import { Box, DialogContent } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OverViewContent from "./InternalUserOverviewContent";
import InternalUserPermissionsContent from "./InternalUserPermissionsContent";
import ConstantRepository from "@Repo/constant_repository";
import { useDialog } from "@Utils/hooks/dialog_hook";

function InternalUserDialog() {
  /// Internal user store
  const { internalUser } = useSelector(
    (state: RootState) => state.internalUser
  );
  const isEdit = Boolean(internalUser);

  /// Dialog hook
  const { openLoading } = useDialog();

  /// Constant repository
  const conantRepo = new ConstantRepository();

  /// Dispach
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Dialog title depends on [isEdit]
  const title = isEdit ? "Internal User Edit" : "Internal User Create";

  /// Click action
  const onChangedAction = (type: EActionType) => {};

  /// Get permission resources
  const getPermissions = async () => {
    openLoading(async () => {
      await Promise.all([conantRepo.getPermissionResources()]);
    });
  };

  /// Initialize component
  useEffect(() => {
    getPermissions();
  }, []);

  /// Destroyed
  useEffect(() => {
    return () => {
      dispatch(setInternalUser(null));
    };
  }, []);

  return (
    <>
      <DialogCustomTitle title={title} />
      <DialogContent>
        <Box mt={1} sx={{ backgroundColor: "transparent" }}>
          <TabBar
            tabs={["Overview", "Permissions"]}
            panels={[<OverViewContent />, <InternalUserPermissionsContent />]}
          />
        </Box>
      </DialogContent>
      <DialogCustomActions
        actions={[
          <VisibilityComp
            visibility={false}
            children={
              <PrimaryButton
                height={30}
                fontWeight="normal"
                color="black"
                children="Delete"
                variant="outlined"
                onClick={() => onChangedAction(EActionType.Delete)}
              />
            }
          />,
          <PrimaryButton
            height={30}
            fontWeight="normal"
            color="white"
            children="Save"
            onClick={() => onChangedAction(EActionType.Save)}
          />,
          <PrimaryButton
            height={30}
            fontWeight="normal"
            color="white"
            children="Save & New"
            onClick={() => onChangedAction(EActionType.SaveNew)}
          />,
          <PrimaryButton
            height={30}
            fontWeight="normal"
            color="white"
            children="Save & Close"
            onClick={() => onChangedAction(EActionType.SaveClose)}
          />,
        ]}
      />
    </>
  );
}

export default InternalUserDialog;
