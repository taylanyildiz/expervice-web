import TranslateHelper from "@Local/index";
import { object, string } from "yup";

export const loginValidationSchema = object({
    email: string().email(TranslateHelper.invalid()).required(TranslateHelper.required()),
    password: string().required(TranslateHelper.required()),
});
