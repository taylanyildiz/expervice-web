import { object, string } from "yup";
import { urlRegex } from "@Utils/functions";
import TranslateHelper from "@Local/index";

export const companyValidator = object({
    name: string().required(TranslateHelper.required()).min(2, "Invalid name"),
    web_site: string().matches(urlRegex, TranslateHelper.invalid()),
    phone_number: string().nullable().min(2, TranslateHelper.invalid()),
    fax_number: string().nullable().min(2, TranslateHelper.invalid()),
    company_address: object({
        country: object().nullable().required(TranslateHelper.required()),
        state: object().required(TranslateHelper.required()),
        city: object().required(TranslateHelper.required()),
        street_address: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
        zip_code: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
    }),
});