import { TransitionsOptions } from "@mui/material";

interface Translations {
    role?: TransitionsOptions;
    description?: TransitionsOptions;
}

interface UserRole {
    id?: number;
    role_type_id?: number;
    role?: string;
    description?: string;
    translations?: Translations;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export default UserRole;