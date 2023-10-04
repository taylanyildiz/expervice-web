import { urlRegex } from "@Utils/functions";
import { ref, object, string, mixed } from "yup";

/// Primary contact validation
export const registerPrimaryContactValidation = object({
    first_name: string().required().min(2, "Invalid name"),
    last_name: string().required().min(2, "Invalid name"),
    email: string().email().required(),
    phone: string().required().test("valid", "Invalid Phone", function (val: any) {
        const pattern = /\+|\_|\ |\(|\)/g;
        const length = val?.replace(pattern, "").length;
        return length === 12;
    }),
    company_name: string().required().min(2, "Invalid company name"),
    company_web_site: string().matches(urlRegex, "Invalid web site"),
    company_phone: string().min(2, "Invalid phone"),
    company_fax: string().min(2, "Invalid fax"),
    country: object().required(),
    state: object().required(),
    city: object().required(),
    street_address: string().required().min(2, "Invalid address"),
    zip_code: string().required(),
});

/// Billing validation
export const registerBillingValidation = object({
    card_holder_name: string().required(),
    card_number: mixed().test("len", "Invalid card number", function (val: any) {
        const length = val?.replace(/\ |_/g, "").length;
        return length === 16;
    }),
    cvc: string().required().min(3, "Invalid cvc"),
    expire: mixed().test("valid", "Invalid expire", function (val: any) {
        const length = val?.replace(/\//g, "").length;
        return length === 4;
    })
});

/// Password validation
export const registerPasswordValidation = object({
    password: string().required().min(6, "Invalid password"),
    confirm_password: string().required().oneOf([ref("password")], "Password must match"),
});