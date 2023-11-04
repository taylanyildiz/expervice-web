import { array, number, object, string } from "yup";

/**
 * Job Create - Update validator
 */
export const jobValidaotr = object({
    unit: object().nullable().required(),
    description: string().nullable().min(2, "Invalid notes"),
    job_technicians: array().nullable().of(
        object().shape({
            technician_user: object().required("Required"),
            role_id: number().required("Required")
        })
    ),
});