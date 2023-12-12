const Job = {
    jobs: "/companies/jobs",
    job: (id: number) => `/${id}`,
    jobStatus: (id: number, status: number) => `/${id}/statuses/${status}`,
    jobPdf: (id: number) => `/forms/${id}/pdf`,
    technician: (id: number, technicianId: number) => `/${id}/technicians/${technicianId}`,
    technicianRole: (id: number, technicianId: number) => `/${id}/technicians/${technicianId}/role`,
    customerForm: (id: number) => `/forms/${id}/customer`,
    customerFormSignature: (id: number) => `/forms/${id}/customer-signature`,
    formStatus: (id: number) => `/forms/${id}/status`,
    signFormAsCustomer: (id: number) => `/forms/${id}/customer-signature`,
}

export default Job;