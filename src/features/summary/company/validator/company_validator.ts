import { object, string } from "yup";
import TranslateHelper from "@Local/index";

export const urlRegex =
    /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]{1,63}(\.[a-zA-Z]{1,63}){1,5}(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

export const companyValidator = object({
    name: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
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