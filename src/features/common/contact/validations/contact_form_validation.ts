import { object, string } from "yup";

/// Contact form schema
export const contactFormSchema = object({
    full_name: string().required("required").min(2, "Invalid name"),
    email: string().email().required("required"),
    phone: string().required("required").min(2, "Invalid phone"),
    subject: string().required("required").min(2, "Invalid subject"),
    messages: string().required("required").min(2, "Invalid message"),
});