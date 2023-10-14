import { object, string } from "yup";

export const customerValidator = object({
    first_name: string().nullable(),
    last_name: string().nullable(),
    display_name: string().nullable().required(),
    group: object().nullable().required(),
    email: string().nullable().email(),
    phone: string().nullable().min(2, "Invalid phone"),
    cell_phone: string().nullable().min(2, "Invalid phone"),
    company: object().nullable(),
    state: object().nullable(),
    city: object().nullable(),
    zip_code: string().nullable().min(2, "Invalid zip code"),
    street_address: string().nullable().min(2, "Invalid address"),
});

