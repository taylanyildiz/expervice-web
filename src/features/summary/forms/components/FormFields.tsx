import { EFormFielType } from "../entities/form_enums";
import Field from "@Models/form/field";
import { useFormDialog } from "../helper/form_helper";
import { FormikProps } from "formik";
import Form from "@Models/form/form";
import FormFieldItem from "./FormFieldItem";
import { useDialog } from "@Utils/hooks/dialog_hook";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import TranslateHelper from "@Local/index";

export interface FormFieldProps {
  fieldType?: EFormFielType | null;
  label?: string | null;
  default_value?: string | null;
  description?: string | null;
  options?: { label: string }[] | null;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  background: isDragging ? "lightgreen" : "none",
  ...draggableStyle,
});

interface Props {
  formik: FormikProps<Form>;
}

function FormFields(props: Props) {
  const { formik } = props;
  const fields = formik.values.fields ?? [];

  /// Form dialog hook
  const { openFieldDialog } = useFormDialog();

  /// Dialog hook
  const { openConfirm } = useDialog();

  /// Edit field
  const onEdit = async (field: Field, index: number) => {
    const result = await openFieldDialog(field);
    if (!result) return;
    const values = [...fields];
    values[index] = { ...result };
    formik.setFieldValue("fields", values);
  };

  /// Edit field
  const onDelete = async (index: number) => {
    const confirm = await openConfirm(
      TranslateHelper.deleteField(),
      TranslateHelper.sureDeleteField()
    );
    if (!confirm) return;
    formik.setFieldValue(
      "fields",
      fields.filter((_, i) => i !== index)
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const list = [...fields];
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    const orderedList = [...list.map((e, i) => ({ ...e, order_number: i }))];
    formik.setFieldValue("fields", orderedList);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, _) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {fields.map((field, index) => (
              <Draggable key={index} draggableId={`${index}-id`} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={index}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <FormFieldItem
                      field={field}
                      onDelete={() => onDelete(index)}
                      onEdit={() => onEdit(field, index)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default FormFields;
