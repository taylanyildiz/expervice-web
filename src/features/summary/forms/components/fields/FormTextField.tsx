import { FormFieldProps } from "./FormFields";

type FormTextFieldProps = Omit<FormFieldProps, "options" | "field_type">;

function FormTextField(props: FormTextFieldProps) {
  const {} = props;
  return <></>;
}

export default FormTextField;
