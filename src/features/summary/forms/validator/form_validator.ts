import { array, object, string } from "yup";
import { EFormFielType } from "../entities/form_enums";
import TranslateHelper from "@Local/index";

export const formValidator = object({
    name: string()
        .nullable()
        .required(TranslateHelper.required())
        .min(2, TranslateHelper.invalid()),
});

export const formFieldValidator = object({
    field_type: object().nullable().required(TranslateHelper.required()),
    label: string().required().min(2, TranslateHelper.invalid()),
    description: string()
        .nullable()
        .notRequired()
        .min(2, TranslateHelper.invalid()),
    options: array().when(["field_type_id"], {
        is: (fieldType: number | null) => {
            const isDropdown = fieldType === EFormFielType.DropDown;
            return !isDropdown;
        },
        then: () => array().nullable().notRequired(),
        otherwise: () =>
            array()
                .nullable()
                .of(
                    object({
                        label: string().nullable().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
                    })
                )
                .min(1, TranslateHelper.invalid()),
    }),
});

export const formCustomerValidator = object({
    customer_user: object().nullable().required(TranslateHelper.required()),
    name: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
    current_job_status: object().nullable().required(TranslateHelper.required()),
    next_job_status: object().nullable().required(TranslateHelper.required()),
    unit_sub_type: object().nullable().notRequired(),
    job_sub_type: object().nullable().notRequired(),
});