interface TechnicianProcess {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    is_active: boolean;
    group_id?: number;
    group_role_id?: number;
    signing_authority: boolean;
    send_invite: boolean;
}

export default TechnicianProcess;