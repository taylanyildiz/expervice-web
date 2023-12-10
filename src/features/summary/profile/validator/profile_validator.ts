import TranslateHelper from "@Local/index";
import { object, ref, string } from "yup";

export const resetPasswordValidator = object().shape({
    old_password: string().nullable().required(TranslateHelper.required()).min(6, TranslateHelper.invalid()),
    password: string().nullable().required(TranslateHelper.required()).min(6, TranslateHelper.invalid()),
    confirm_password: string()
        .oneOf([ref("password")], TranslateHelper.passwordDoesntMatch())
        .nullable()
        .required(TranslateHelper.required()),
});

export const profileValidator = object().shape({
    first_name: string().nullable().required(TranslateHelper.required()),
    last_name: string().nullable().required(TranslateHelper.required()),
    email: string().email(TranslateHelper.invalid()).nullable().required(TranslateHelper.required()),
    user_phone: string().required(TranslateHelper.required()).test("valid", TranslateHelper.invalid(), function (val: any) {
        const pattern = /\+|\_|\ |\(|\)/g;
        const length = val?.replace(pattern, "").length;
        return length === 12;
    }),
});