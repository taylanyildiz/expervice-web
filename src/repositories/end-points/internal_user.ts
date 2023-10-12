const InternalUser = {
    internalUsers: "/companies/internal-users",
    invite: (id: number) => `/${id}/invite`,
    user: (id: number) => `/${id}`,
    permissions: (id: number) => `/${id}/permissions`,
    status: (id: number) => `/${id}/status`,
}

export default InternalUser;