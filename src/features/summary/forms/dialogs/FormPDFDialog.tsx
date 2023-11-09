import { DialogCustomTitle } from "@Components/dialogs";
import { useForm, useFormProcess } from "../helper/form_helper";
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
import FormCustomersContent from "./FormCustomersContent";
import { object, string } from "yup";

function FormPDFDialog() {
  const { form, formId } = useForm();
  const isEdit = Boolean(form);

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Dialog hook
  const { openLoading, closeDialog } = useDialog();

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
    formik.handleSubmit();
  };

  /// Process form
  const process = async () => {
    const result = await openLoading(async () => {
      if (!isEdit) return await formRepo.createForm(formProcess!);
      // update form
    });
    return result ?? form;
  };

  /// Submit handle
  const onSubmitHandle = async () => {
    const result = await process();
    switch (actionType) {
      case EActionType.Save:
        dispatch(setForm(result));
        break;
      case EActionType.SaveClose:
        closeDialog();
        break;
      case EActionType.SaveNew:
        formik.resetForm();
        dispatch(setForm(null));
        break;
    }
  };

  /// Formik
  const initialValues: Form = {
    name: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: object({
      name: string().nullable().required().min(2, "Invalid name"),
    }),
    onSubmit: onSubmitHandle,
  });

  /// Form process
  const { formProcess } = useFormProcess(formik, form);

  /// Initialize component
  useEffect(() => {
    if (!formId) return;
    openLoading(async () => {
      await formRepo.getForm(formId);
    });
  }, [formId]);

  /// Template pdf
  useEffect(() => {
    formRepo.formPdfTemplate({
      fields: form?.fields,
      name: form?.name,
    });
  }, [form]);

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
              {
                visibility: isEdit,
                title: "Customers",
                panel: <FormCustomersContent />,
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
