const Unit = {
    units: "/companies/units",
    unit: (id: number) => `/${id}`,
    customer: (id: number) => `/${id}/customer`,
    status: (id: number) => `/${id}/status`,
    technicians: (id: number) => `/${id}/technicians`,
    jobs: (id: number) => `/${id}/jobs`,
}

export default Unit;