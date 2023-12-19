const CompanyRegion = {
    regions: "/companies/regions",
    region: (id: number) => `/${id}`,
    weather: (id: number) => `${id}/weather`,
    groups: (id: number) => `${id}/groups`,
    groupInfo: `groups/info`,
    groupJobsInfo: (id: number) => `groups/${id}/jobs-info`,
    groupUnitsJobInfo: (id: number) => `groups/${id}/units-info`,
    group: (id: number) => `/groups/${id}`,
    groupUnits: (id: number) => `/groups/${id}/units`,
    image: (id: number) => `/${id}/image`,
}

export default CompanyRegion;