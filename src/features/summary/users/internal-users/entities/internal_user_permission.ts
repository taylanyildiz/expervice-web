interface InternalUserPermission {
    role_id: number;
    access_regions?: number[] | null;
    permissions?: number[] | null;
}

export default InternalUserPermission;