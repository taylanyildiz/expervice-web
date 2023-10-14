import PermissionSubResource from "@Models/permission/permission_sub_resource";
import { array, boolean, number, object, string } from "yup";

/// Process internal user validator
export const internalUserValidator = object({
    first_name: string().required().min(2, "Invalid name"),
    last_name: string().required().min(2, "Invalid name"),
    email: string().email().nullable(),
    phone: string().min(2, "Invalid Phone").nullable(),
    role_id: number().required(),
    is_active: boolean().required(),
    regions: array().when(['permission_sub_resources', 'role_id'], {
        is: (permissions: PermissionSubResource[] | null, role: number) => {
            const per = Boolean((permissions && permissions.some(e => e.id === 6)));
            return per || role === 4;
        },
        then: () => array().nullable().notRequired(),
        otherwise: () => array().nullable().required("Required"),
    }),
    permission_sub_resources: array().nullable().notRequired(),
});