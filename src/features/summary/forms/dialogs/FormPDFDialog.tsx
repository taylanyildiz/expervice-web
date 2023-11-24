import { DialogCustomTitle } from "@Components/dialogs";
import { useForm, useFormProcess } from "../helper/form_helper";
import FormPDFDialogAction from "./FormPDFDialogAction";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Form from "@Models/form/form";
import { Box, DialogContent, Typography } from "@mui/material";
import TabBar from "@Components/TabBar";
import FormPdFDialogContent from "./FormPdFDialogContent";
import FormRepository from "@Repo/form_repository";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import {
  setForm,
  setFormDialogStatus,
  setFormId,
  setFormPdfTemplate,
} from "@Store/form_store";
import FormCustomersContent from "./FormCustomersContent";
import { object, string } from "yup";
import VisibilityComp from "@Components/VisibilityComp";
import Colors from "@Themes/colors";
import { useCustomEffect } from "@Utils/functions";

function FormPDFDialog() {
  const { form, formId } = useForm();
  const isEdit = Boolean(form);

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Dialog hook
  const { openLoading, closeDialog, openConfirm } = useDialog();

  /// Form repository
  const formRepo = new FormRepository();

  /// Title of dialog
  const title = isEdit ? "Form Edit" : "Form Create";

  /// Action type state
  const [actionType, setActionType] = useState<EActionType | null>(null);

  /// Action handle
  const onChangedActionHandle = async (type: EActionType) => {
    if (type === EActionType.Delete) {
      const confirm = await openConfirm(
        "Delete Form",
        "Are you sure to delete form"
      );
      if (confirm) {
        const result = await openLoading(async () => {
          return await formRepo.deleteForm(form!.id!);
        });
        if (result) closeDialog();
      }
      return;
    }
    setActionType(type);
    formik.handleSubmit();
  };

  /// Process form
  const process = async (): Promise<void> => {
    await openLoading(async () => {
      // Create form
      if (!isEdit) return await formRepo.createForm(formProcess!);
      if (formName) await formRepo.updateForm(form!.id!, formName);
      if (addedFields) await formRepo.addFields(form!.id!, addedFields);
      if (deletedFields) {
        for (const field of deletedFields) {
          await formRepo.deleteField(form!.id!, field);
        }
      }
      if (updatedFieds) {
        for (const field of updatedFieds) {
          await formRepo.updateField(form!.id!, field);
        }
      }
      await formRepo.getForm(form!.id!);
    });
  };

  /// Submit handle
  const onSubmitHandle = async () => {
    await process();
    switch (actionType) {
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
    fields: [],
  };
  const formik = useFormik({
    initialValues,
    validationSchema: object({
      name: string().nullable().required().min(2, "Invalid name"),
    }),
    onSubmit: onSubmitHandle,
  });

  /// Form process
  const {
    formProcess,
    addedFields,
    deletedFields,
    updatedFieds,
    anyUpdate,
    formName,
  } = useFormProcess(formik, form);

  const getForm = async () => {
    const result = await openLoading(async () => {
      return await formRepo.getForm(formId!);
    });
    if (!result) closeDialog();
  };

  /// Initialize component
  useEffect(() => {
    if (!formId) return;
    getForm();
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

  const destory = () => {
    dispatch(setFormDialogStatus(false));
    dispatch(setForm(null));
    dispatch(setFormId(null));
    dispatch(setFormPdfTemplate(null));
    formRepo.getForms();
  };

  useCustomEffect(
    destory,
    () => {
      dispatch(setFormDialogStatus(true));
    },
    []
  );

  return (
    <>
      <DialogCustomTitle title={title} />
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
