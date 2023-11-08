import { DialogCustomTitle } from "@Components/dialogs";
import { useForm } from "../helper/form_helper";
import FormPDFDialogAction from "./FormPDFDialogAction";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Form from "@Models/form/form";
import { Box, DialogContent } from "@mui/material";
import TabBar from "@Components/TabBar";
import FormPdFDialogContent from "./FormPdFDialogContent";
import FormRepository from "@Repo/form_repository";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { setForm, setFormId } from "@Store/form_store";

function FormPDFDialog() {
  const { form, formId } = useForm();
  const isEdit = Boolean(form);

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Dialog hook
  const { openLoading } = useDialog();

  /// Form repository
  const formRepo = new FormRepository();

  /// Title of dialog
  const title = isEdit ? "Form Edit" : "Form Create";

  /// Action type state
  const [actionType, setActionType] = useState<EActionType | null>(null);

  /// Action handle
  const onChangedActionHandle = (type: EActionType) => {
    if (type === EActionType.Delete) {
      return;
    }
    setActionType(type);
  };

  /// Submit handle
  const onSubmitHandle = () => {
    switch (actionType) {
      case EActionType.Save:
        break;
      case EActionType.SaveClose:
        break;
      case EActionType.SaveNew:
        break;
    }
  };

  /// Formik
  const initialValues: Form = {};
  const formik = useFormik({
    initialValues,
    onSubmit: onSubmitHandle,
  });

  /// Initialize component
  useEffect(() => {
    if (!formId) return;
    openLoading(async () => {
      await formRepo.getForm(formId);
    });
  }, [formId]);

  /// Initialize formik
  useEffect(() => {
    if (!form) return;
    for (let [k, v] of Object.entries(form)) {
      formik.setFieldValue(k, v);
    }
  }, [form]);

  /// Destory
  useEffect(() => {
    return () => {
      dispatch(setForm(null));
      dispatch(setFormId(null));
    };
  }, []);

  return (
    <>
      <DialogCustomTitle title={title} />
      <DialogContent>
        <Box mt={1}>
          <TabBar
            tabs={[
              {
                title: "Content",
                panel: <FormPdFDialogContent formik={formik} />,
              },
            ]}
          />
        </Box>
      </DialogContent>
      <FormPDFDialogAction onChanged={onChangedActionHandle} />
    </>
  );
}

export default FormPDFDialog;
