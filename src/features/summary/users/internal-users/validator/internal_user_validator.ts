import TranslateHelper from "@Local/index";
import PermissionSubResource from "@Models/permission/permission_sub_resource";
import { array, boolean, number, object, string } from "yup";

/// Process internal user validator
export const internalUserValidator = object({
    first_name: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
    last_name: string().required(TranslateHelper.required()).min(2, TranslateHelper.invalid()),
    email: string().email(TranslateHelper.invalid()).nullable(),
    phone: string().min(2, TranslateHelper.invalid()).nullable(),
    role_id: number().required(TranslateHelper.required()),
    is_active: boolean().required(TranslateHelper.required()),
    regions: array().when(['permission_sub_resources', 'role_id'], {
        is: (permissions: PermissionSubResource[] | null, role: number) => {
            const per = Boolean((permissions && permissions.some(e => e.id === 6)));
            return per || role === 4;
        },
        then: () => array().nullable().notRequired(),
        otherwise: () => array().nullable().required(TranslateHelper.required()),
    }),
    permission_sub_resources: array().nullable().notRequired(),
});