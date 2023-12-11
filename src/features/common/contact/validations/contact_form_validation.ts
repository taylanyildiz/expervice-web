import TranslateHelper from "@Local/index";
import { object, string } from "yup";

/// Contact form schema
export const contactFormSchema = object({
    full_name: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
    email: string().email(TranslateHelper.invalid()).required("required"),
    phone: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
    subject: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
    messages: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
});