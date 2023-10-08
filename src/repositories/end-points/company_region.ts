const CompanyRegion = {
    regions: "/companies/regions",
    region: (regionId: number) => `/${regionId}`,
    weather: (regionId: number) => `${regionId}/weather`,
    groups: (regionId: number) => `${regionId}/groups`,
    groupInfo: "groups/info",
    group: (groupId: number) => `/groups/${groupId}`,
}

export default CompanyRegion;