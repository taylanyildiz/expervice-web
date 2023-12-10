import { array, object, string } from "yup";
import { EFormFielType } from "../entities/form_enums";
import TranslateHelper from "@Local/index";

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
})