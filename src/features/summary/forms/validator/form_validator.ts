import { array, object, string } from "yup";
import { EFormFielType } from "../entities/form_enums";

export const formFieldValidator = object({
    field_type: object().nullable().required(),
    label: string().required().min(2, "Invalid label"),
    description: string()
        .nullable()
        .notRequired()
        .min(2, "Invalid description"),
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
                        label: string().nullable().required().min(2, "Invalid label"),
                    })
                )
                .min(1, "Min 1 option"),
    }),
})