import TranslateHelper from "@Local/index";
import { object, string } from "yup";

export const technicianValidator = object({
    first_name: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
    last_name: string().required().min(2, TranslateHelper.invalid()),
    email: string().nullable().email(TranslateHelper.invalid()),
    phone: string().nullable().min(2, TranslateHelper.invalid()),
    group: object().required(TranslateHelper.required()),
    group_role: object().required(TranslateHelper.required()),
});