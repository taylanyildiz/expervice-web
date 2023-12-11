import TranslateHelper from "@Local/index";
import { object, string } from "yup";

export const customerValidator = object({
    first_name: string().nullable(),
    last_name: string().nullable(),
    display_name: string().nullable().required(TranslateHelper.required()),
    group: object().nullable().required(TranslateHelper.required()),
    email: string().nullable().email(TranslateHelper.invalid()),
    phone: string().nullable().min(2, TranslateHelper.invalid()),
    cell_phone: string().nullable().min(2, TranslateHelper.invalid()),
    company: object().nullable(),
    state: object().nullable(),
    city: object().nullable(),
    zip_code: string().nullable().min(2, TranslateHelper.invalid()),
    street_address: string().nullable().min(2, TranslateHelper.invalid()),
});

