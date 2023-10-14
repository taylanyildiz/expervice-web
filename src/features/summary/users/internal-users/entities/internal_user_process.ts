

interface InternalUserProcess {
    id?: number;
    role_id: number;
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    is_active: boolean;
    access_regions?: number[];
    permissions?: number[];
    send_invite: boolean;
}

export default InternalUserProcess;