import { boolean, object, string } from "yup";

export const unitValidator = object({
    status: boolean().notRequired(),
    name: string().required().min(2, 'Invalid name'),
    unit_sub_type: object().required(),
    unit_label: object().nullable().notRequired(),
    customer: object().required(),
    imei: string().max(11, "Invalid imei"),
    identity_number: string().notRequired(),
    qr_code: string().notRequired(),
    contract_start_date: string(),
    contract_end_date: string(),
    country: object().notRequired(),
    state: object().notRequired(),
    city: object().notRequired(),
    street_address: string().notRequired(),
    zip_code: string().notRequired(),
    latitude: string().notRequired(),
    longitude: string().notRequired(),
});