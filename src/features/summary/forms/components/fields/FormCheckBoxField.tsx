import { FormFieldProps } from "./FormFields";

type FormCheckBoxFieldProps = Omit<FormFieldProps, "options" | "field_type">;

function FormCheckBoxField(props: FormCheckBoxFieldProps) {
  const {} = props;
  return <></>;
}

export default FormCheckBoxField;
