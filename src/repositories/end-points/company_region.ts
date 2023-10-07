const CompanyRegion = {
    regions: "/companies/regions",
    weather: (regionId: number) => `${regionId}/weather`,
    groups: (regionId: number) => `${regionId}/groups`,
    groupInfo: "groups/info",
}

export default CompanyRegion;