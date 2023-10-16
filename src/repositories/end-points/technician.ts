const Technician = {
    technicians: '/companies/technician-users',
    technician: (id: number) => `/${id}`,
    group: (id: number) => `/${id}/group`,
    status: (id: number) => `/${id}/status`,
    invite: (id: number) => `/${id}/invite`,
}

export default Technician;