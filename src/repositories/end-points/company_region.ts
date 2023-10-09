const CompanyRegion = {
    regions: "/companies/regions",
    region: (id: number) => `/${id}`,
    weather: (id: number) => `${id}/weather`,
    groups: (id: number) => `${id}/groups`,
    groupInfo: "groups/info",
    group: (id: number) => `/groups/${id}`,
    groupUnits: (id: number) => `/groups/${id}/units`,
}

export default CompanyRegion;