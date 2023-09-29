import UserRole from "./user_role";

interface User {
    role_id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    status?: boolean;
    role?: UserRole;
    created_at?: string;
    updated_at?: string;
}

export default User;