import { object, string } from "yup";

export const technicianValidator = object({
    first_name: string().required().min(2, "Invalid name"),
    last_name: string().required().min(2, "Invalid name"),
    email: string().nullable().email(),
    phone: string().nullable().min(2, "Invalid phone"),
    group: object().required(),
    group_role: object().required(),
});