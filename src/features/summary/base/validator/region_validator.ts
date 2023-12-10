import TranslateHelper from "@Local/index";
import { object, string } from "yup";

const regionValidator = object({
    name: string().required().min(2, "Invalid name"),
    country: object().required(TranslateHelper.required()),
    state: object().required(TranslateHelper.required()),
    city: object().required(TranslateHelper.required()),
    street_address: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
    zip_code: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
});

export default regionValidator;