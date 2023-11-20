import { RootState, store } from "@Store/index";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { useSelector } from "react-redux";
import FormPDFDialog from "../dialogs/FormPDFDialog";
import Field from "@Models/form/field";
import FormFieldDialog from "../dialogs/FormFieldDialog";
import FormCustomerDialog from "../dialogs/FormCustomerDialog";
import { FormikProps } from "formik";
import Form from "@Models/form/form";
import { useEffect, useState } from "react";
import FormProcess from "../entities/form_process";
import FormField from "../entities/form_field";
import { EFormFielType } from "../entities/form_enums";
import { equalInterface } from "@Utils/functions";
import { setFormDialogStatus, setFormId } from "@Store/form_store";

export function useForm() {
  return useSelector((state: RootState) => state.form);
}

export function useFormDialog() {
  const { openDialog, closeDialog } = useDialog();
  const { formDialogStatus } = useForm();
  return {
    openFormDialog: (id?: number) => {
      if (formDialogStatus) return;
      store.dispatch(setFormDialogStatus(true));
      if (id) store.dispatch(setFormId(id));
      openDialog(<FormPDFDialog />, "xl");
    },
    closeDialog,
    openFieldDialog: async (field?: Field): Promise<Field | null> => {
      return await new Promise((resolve) => {
        openDialog(<FormFieldDialog field={field} onDone={resolve} />);
      });
    },
    openCustomerDialog: async (
      onDone: (form: any) => Promise<boolean>
    ): Promise<boolean> => {
      return await new Promise((resolve) => {
        openDialog(
          <FormCustomerDialog
            onDone={async (form) => {
              const result = await onDone(form);
              resolve(result);
              return result;
            }}
          />,
          "xs"
        );
      });
    },
  };
}

export function useFormProcess(formik: FormikProps<Form>, form: Form | null) {
  const values = formik.values;

  const [formProcess, setFormProcess] = useState<FormProcess | null>(null);
  const [formName, setFormName] = useState<string | null>(null);
  const [addedFields, setAddedFields] = useState<FormField[] | null>(null);
  const [updatedFieds, setUpdatedFields] = useState<FormField[] | null>(null);
  const [deletedFields, setDeletedFields] = useState<number[] | null>(null);
  const [anyUpdate, setAnyUpdate] = useState<boolean>(false);

  const isDropdown = (type?: number) => type === EFormFielType.DropDown;

  /// When changed values if form does not exist
  useEffect(() => {
    if (values.id) return;
    const process: FormProcess = {
      fields: values.fields?.map(
        (e) =>
          ({
            options: isDropdown(e.field_type_id) ? e.options : null,
            default_value: e.default_value,
            description: e.description,
            field_type_id: e.field_type?.id,
            label: e.label,
            order_number: e.order_number,
            mandantory: e.mandantory,
          } as FormField)
      ),
      name: values.name,
    };
    setFormProcess(process);
  }, [values]);

  /// When changed values and form if form exists
  useEffect(() => {
    setAddedFields(null);
    setDeletedFields(null);
    setUpdatedFields(null);
    setFormName(null);
    setAnyUpdate(false);
    if (!values.id) return;

    setFormName(values.name !== form?.name ? values!.name! : null);

    setAnyUpdate(values.name !== form?.name);

    const checkAddedFields = () => {
      const fields = values.fields;
      const addedsFilter = fields?.filter((e) => !e.id);
      const addeds: FormField[] | undefined = addedsFilter?.map(
        (e) =>
          ({
            default_value: e.default_value,
            description: e.description,
            field_type_id: e.field_type_id,
            label: e.label,
            mandantory: e.mandantory,
            options: isDropdown(e.field_type_id) ? e.options : null,
            order_number: e.order_number,
          } as FormField)
      );
      setAnyUpdate((prev) => prev || Boolean(addeds && addeds?.length !== 0));

      setAddedFields(addeds && addeds.length !== 0 ? addeds : null);
    };

    const checkDeletedFields = () => {
      const newFields = values.fields;
      const formFields = form?.fields;
      const deletedFields = formFields?.filter(
        (e1) => !newFields?.some((e2) => e2.id && e1.id === e2.id)
      );
      const fields: number[] | null = deletedFields?.map((e) => e.id!) ?? null;
      setAnyUpdate((prev) => prev || Boolean(fields?.length !== 0));
      setDeletedFields(fields?.length !== 0 ? fields : null);
    };

    const checkUpdatedFields = () => {
      const newFields = values.fields;
      const formFields = form?.fields;
      const updatedFields = newFields?.filter(
        (e1) =>
          e1.id &&
          formFields?.some((e2) => e1.id === e2.id && !equalInterface(e1, e2))
      );
      const fields: FormField[] | undefined = updatedFields?.map(
        (e) =>
          ({
            id: e.id,
            default_value: e.default_value,
            description: e.description,
            field_type_id: e.field_type_id,
            label: e.label,
            mandantory: e.mandantory,
            options: isDropdown(e.field_type_id) ? e.options : null,
            order_number: e.order_number,
          } as FormField)
      );
      setAnyUpdate((prev) => prev || Boolean(fields && fields?.length !== 0));
      setUpdatedFields(fields && fields?.length !== 0 ? fields : null);
    };

    checkAddedFields();
    checkDeletedFields();
    checkUpdatedFields();
  }, [values, form]);

  return {
    formProcess,
    addedFields,
    deletedFields,
    updatedFieds,
    formName,
    anyUpdate,
  };
}
