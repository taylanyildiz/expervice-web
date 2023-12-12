import TranslateHelper from "@Local/index";
import { object, string } from "yup";

export const formCustomerValidation = object({
    first_name: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
    last_name: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
    signature: string().required(TranslateHelper.required()),
});
