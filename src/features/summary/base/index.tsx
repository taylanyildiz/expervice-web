import { Box, Grid } from "@mui/material";
import GroupsList from "./components/GroupsList";
import SummarySideBar from "./components/SummarySideBar";
import RegionInfoBox from "./components/RegionInfoBox";
import GroupInfoBox from "./components/GroupInfoBox";
import GroupJobsChart from "./components/GroupJobsChart";
import { useSelector } from "react-redux";
import { RootState } from "@Store/index";
import Condition2Comp from "@Components/Condition2Comp";
import RegionsEmptyBox from "./components/RegionsEmptyBox";
import GroupsEmptyBox from "./components/GroupsEmptyBox";

function SummaryPage() {
  /// Region store
  const { regions, groups, groupsLoading, regionsLoading } = useSelector(
    (state: RootState) => state.companyRegion
  );

  const isRegionEmpty = regions?.rows?.length === 0 && !regionsLoading;
  const isGroupEmpty =
    groups?.rows?.length === 0 && !groupsLoading && !regionsLoading;

  return (
    <div className="summary-layout">
      <SummarySideBar />
      <div style={{ flex: 1 }}>
        <Condition2Comp
          showFirst={!isRegionEmpty}
          firstComp={
            <Grid container px={1}>
              <Grid item xs={9} py={1}>
                <Box>
                  <Grid container rowSpacing={2}>
                    <Grid item xs={12} children={<RegionInfoBox />} />
                    <Grid item xs={12}>
                      <Condition2Comp
                        showFirst={!isGroupEmpty}
                        firstComp={
                          <Grid container rowSpacing={2}>
                            <Grid item xs={12} children={<GroupInfoBox />} />
                            <Grid item xs={12} children={<GroupJobsChart />} />
                          </Grid>
                        }
                        secondComp={<GroupsEmptyBox />}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid mt={1} item xs={3}>
                <Box
                  className="summary-base-groups"
                  children={<GroupsList />}
                />
              </Grid>
            </Grid>
          }
          secondComp={<RegionsEmptyBox />}
        />
      </div>
    </div>
  );
}

export default SummaryPage;
