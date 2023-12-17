import TranslateHelper from "@Local/index";
import { urlRegex } from "@Utils/functions";
import { ref, object, string, mixed } from "yup";

/// Primary contact validation
export const registerPrimaryContactValidation = object({
    first_name: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
    last_name: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
    email: string().email().required(TranslateHelper.required()),
    phone: string().required(TranslateHelper.required()).test("valid", TranslateHelper.invalid(), function (val: any) {
        const pattern = /\+|\_|\ |\(|\)/g;
        const length = val?.replace(pattern, "").length;
        return length === 12;
    }),
    company_name: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
    company_web_site: string().matches(urlRegex, TranslateHelper.invalid()),
    company_phone: string().min(2, TranslateHelper.invalid()),
    company_fax: string().min(2, TranslateHelper.invalid()),
    country: object().required(TranslateHelper.required()),
    state: object().required(TranslateHelper.required()),
    city: object().required(TranslateHelper.required()),
    street_address: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
    zip_code: string().required(TranslateHelper.required()),
});

/// Billing validation
export const registerBillingValidation = object({
    card_holder_name: string().required(TranslateHelper.required()),
    card_number: mixed().required(TranslateHelper.required()).test("len", TranslateHelper.invalid(), function (val: any) {
        const newValue = val?.replace(/\ |_/g, "");
        const length = newValue?.length;
        return length === 16;
    }),
    cvc: string().required(TranslateHelper.required()).min(3, TranslateHelper.invalid()),
    expire: mixed().required(TranslateHelper.required()).test("valid", TranslateHelper.invalid(), function (val: any) {
        const newValue = val?.replace(/\//g, "");
        const length = newValue?.length;
        return length === 4;
    })
});

/// Password validation
export const registerPasswordValidation = object({
    password: string().required(TranslateHelper.required()).min(6, TranslateHelper.invalid()),
    confirm_password: string().required(TranslateHelper.required()).oneOf([ref("password")], TranslateHelper.passwordDoesntMatch()),
});