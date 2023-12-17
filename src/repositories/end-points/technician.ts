const Technician = {
    technicians: '/companies/technician-users',
    technician: (id: number) => `/${id}`,
    group: (id: number) => `/${id}/group`,
    status: (id: number) => `/${id}/status`,
    invite: (id: number) => `/${id}/invite`,
    jobs: (id: number) => `/${id}/jobs`,
    jobRoles: (id: number) => `/${id}/job-roles`,
    jobStatuses: (id: number) => `/${id}/job-statuses`,
}

export default Technician;