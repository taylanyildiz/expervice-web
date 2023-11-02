const Job = {
    jobs: "/companies/jobs",
    job: (id: number) => `/${id}`,
    jobPdf: (id: number) => `/forms/${id}/pdf`,
    technician: (id: number, technicianId: number) => `/${id}/technicians/${technicianId}`,
    technicianRole: (id: number, technicianId: number) => `/${id}/technicians/${technicianId}/role`,
}

export default Job;