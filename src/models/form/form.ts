import Field from "./field";

interface Form {
    id?: number;
    company_id?: number;
    user_id?: number;
    name?: string;
    fields?: Field[];
    field_count?: number;
    customer_count?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default Form;