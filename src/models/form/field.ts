import FieldType from "./field_type";

interface Field {
    id?: number;
    form_id?: number;
    field_type_id?: number;
    order_number?: number;
    label?: string;
    description?: string;
    default_value?: string;
    mandantory?: boolean;
    options?: { label: string }[]
    field_type?: FieldType;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default Field;