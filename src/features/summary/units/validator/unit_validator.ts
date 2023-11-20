import { boolean, object, string } from "yup";
import { parseISO, compareAsc } from 'date-fns';


export const unitValidator = object({
    status: boolean().notRequired(),
    name: string().required().min(2, 'Invalid name'),
    unit_sub_type: object().required(),
    unit_label: object().nullable().notRequired(),
    customer: object().required(),
    imei: string().nullable().max(11, "Invalid imei"),
    identity_number: string().notRequired(),
    qr_code: string().notRequired(),
    country: object().notRequired(),
    state: object().notRequired(),
    city: object().notRequired(),
    street_address: string().notRequired(),
    zip_code: string().notRequired(),
    latitude: string().notRequired(),
    longitude: string().notRequired(),
    contract_end_date: string().nullable().notRequired(),
    date: string().when(['contract_start_date', 'contract_end_date'], {
        is: (start: any, end: any) => {
            const hasAny = !Boolean(start || end);

            if (Boolean(start && end)) {
                const date1 = parseISO(start);
                const date2 = parseISO(end);
                const value = compareAsc(date2, date1);;
                return value === 1;
            }
            return hasAny;
        },
        otherwise: () => string().nullable().required("End date must bigger than start date"),
        then: () => string().nullable().notRequired(),
    })

});