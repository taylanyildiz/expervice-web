import { object, string } from "yup";

const regionValidator = object({
    name: string().required().min(2, "Invalid name"),
    country: object().required(),
    state: object().required(),
    city: object().required(),
    street_address: string().required().min(2, "Invalid name"),
    zip_code: string().required().min(2, "Invalid name"),
});

export default regionValidator;