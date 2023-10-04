import { object, string } from "yup";

export const loginValidationSchema = object({
    email: string().email("Invalid e-mail address").required("Required"),
    password: string().required("Required"),
});
