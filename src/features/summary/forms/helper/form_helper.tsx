import { RootState } from "@Store/index";
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

export function useForm() {
  return useSelector((state: RootState) => state.form);
}

export function useFormDialog() {
  const { openDialog, closeDialog } = useDialog();
  return {
    openDilaog: () => openDialog(<FormPDFDialog />, "xl"),
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

  const isDropdown = (type?: number) => type === EFormFielType.DropDown;

  /// When changed values if form does not exist
  useEffect(() => {
    if (values.id) return;
    const process: FormProcess = {
      fields: values.fields?.map(
        (e) =>
          ({
            options: isDropdown(e.field_type_id) ? null : e.options,
            default_value: e.default_value,
            description: e.description,
            field_type_id: e.field_type?.id,
            label: e.label,
            // order_number: 0,
            // mandantory: false,
          } as FormField)
      ),
      name: values.name,
    };
    setFormProcess(process);
  }, [values]);

  /// When changed values and form if form exists
  useEffect(() => {
    if (!values.id) return;
  }, [values, form]);

  return {
    formProcess,
  };
}
