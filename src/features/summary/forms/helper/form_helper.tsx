import { RootState } from "@Store/index";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { useSelector } from "react-redux";
import FormPDFDialog from "../dialogs/FormPDFDialog";
import Field from "@Models/form/field";
import FormFieldDialog from "../dialogs/FormFieldDialog";

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
  };
}
