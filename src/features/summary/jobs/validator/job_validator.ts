import TranslateHelper from "@Local/index";
import { array, number, object, string } from "yup";

/**
 * Job Create - Update validator
 */
export const jobValidaotr = object({
    unit: object().nullable().required(TranslateHelper.required()),
    description: string().nullable().min(2, TranslateHelper.invalid()),
    job_technicians: array().nullable().of(
        object().shape({
            technician_user: object().required(TranslateHelper.required()),
            role_id: number().required(TranslateHelper.required())
        })
    ),
});