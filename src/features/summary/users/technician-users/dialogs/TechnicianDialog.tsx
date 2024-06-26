import { DialogCustomTitle } from "@Components/dialogs";
import {
  useTechnician,
  useTechnicianCreate,
  useTechnicianUpdate,
} from "../helper/technician_helper";
import TechnicianDialogAction from "./TechnicianDialogAction";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { useEffect, useState } from "react";
import TechnicianUser, {
  defaultTechnician,
} from "@Models/technician-user/technician_user";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { setTechnician } from "@Store/technician_store";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Box, DialogContent } from "@mui/material";
import TabBar from "@Components/TabBar";
import TechnicianContactInformation from "./TechnicianContactInformation";
import TechnicianSecurity from "./TechnicianSecurity";
import TechnicianRepository from "@Repo/technician_repository";
import { technicianValidator } from "../validator/technician_validator";
import TranslateHelper from "@Local/index";
import AnyUpdateBox from "@Components/AnyUpdateBox";
import TechnicianJobs from "./TechnicianJobs";
import TechnicianUserInfo from "../components/TechnicianUserInfo";

function TechnicianDialog() {
  /// Technician store
  const { technician } = useTechnician();
  const isEdit = Boolean(technician);

  /// Technician repository
  const technicianRepo = new TechnicianRepository();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Dialog hooks
  const { closeDialog, openConfirm, openLoading } = useDialog();

  /// Title of dialog
  const title: string = isEdit
    ? TranslateHelper.technicianUserEdit()
    : TranslateHelper.technicianUserCreate();

  /// Action type state
  const [actionType, setActionType] = useState<EActionType | null>(null);

  /// Changed actiont type
  const onChangedAction = async (type: EActionType) => {
    if (type === EActionType.Delete) {
      const confirm = await openConfirm(
        TranslateHelper.deleteTechnician(),
        TranslateHelper.sureDeleteTechnician()
      );
      if (confirm) {
        const result = await openLoading(async () => {
          return await technicianRepo.deleteTechnician();
        });
        if (result) closeDialog();
      }
      return;
    }
    setActionType(type);
    formik.handleSubmit();
  };

  /// Process
  const process = async (): Promise<TechnicianUser | null> => {
    const result = await openLoading(async () => {
      let result: TechnicianUser | null = null;
      if (!isEdit) {
        result = await technicianRepo.createTechnician(createTechnician!);
      } else {
        if (info) {
          result = await technicianRepo.updateTechnician(info!);
          dispatch(setTechnician(result));
        }
        if (group) {
          result = await technicianRepo.updateTechnicianGroup(group!);
        }
        if (activate !== null) {
          result = await technicianRepo.updateTechnicianStatus(activate);
        }
        if (status) {
          result = await technicianRepo.sendInvite();
        }
      }
      return result;
    });
    return result ?? technician;
  };

  /// Handle submit
  const onSubmitHandle = async () => {
    const result = await process();
    if (!result) return;
    dispatch(setTechnician(result));
    switch (actionType) {
      case EActionType.SaveNew:
        formik.resetForm();
        dispatch(setTechnician(null));
        break;
      case EActionType.SaveClose:
        closeDialog();
        break;
    }
  };

  /// Initialize component
  useEffect(() => {
    if (!technician) return;
    for (let [k, v] of Object.entries(technician)) {
      formik.setFieldValue(k, v);
    }
    formik.setFieldValue("group", technician.technician_group?.group);
    formik.setFieldValue("group_role", technician.technician_group?.group_role);
  }, [technician]);

  /// Destroy component
  useEffect(() => {
    return () => {
      dispatch(setTechnician(null));
      technicianRepo.getTechnicians();
    };
  }, []);

  /// Formik
  const initialValues: TechnicianUser = defaultTechnician;
  const formik = useFormik({
    initialValues,
    validationSchema: technicianValidator,
    onSubmit: onSubmitHandle,
  });

  /// Create technician hook
  const createTechnician = useTechnicianCreate(formik);

  /// Update technician hook
  const { info, group, activate, status, anyUpdate } = useTechnicianUpdate(
    formik,
    technician
  );

  return (
    <>
      <DialogCustomTitle title={title} />
      <AnyUpdateBox anyUpdate={anyUpdate} />
      <DialogContent>
        <TechnicianUserInfo />
        <Box mt={1}>
          <TabBar
            tabs={[
              {
                title: TranslateHelper.contactInformation(),
                panel: <TechnicianContactInformation formik={formik} />,
              },
              {
                title: TranslateHelper.securityLogin(),
                panel: <TechnicianSecurity formik={formik} />,
              },
              {
                visibility: isEdit,
                title: "Technician Jobs",
                panel: <TechnicianJobs />,
              },
            ]}
          />
        </Box>
      </DialogContent>
      <TechnicianDialogAction onChanged={onChangedAction} />
    </>
  );
}

export default TechnicianDialog;
