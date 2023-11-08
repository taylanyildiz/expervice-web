interface FormField {
    field_type_id?: number;
    order_number?: number;
    label?: string;
    description?: string;
    default_value?: string;
    mandantory?: boolean;
    options?: { label?: string }[],
}

export default FormField;