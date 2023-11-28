import { Box, Grid } from "@mui/material";
import GroupsList from "./components/GroupsList";
import SummarySideBar from "./components/SummarySideBar";
import RegionInfoBox from "./components/RegionInfoBox";
import GroupInfoBox from "./components/GroupInfoBox";
import GroupJobsChart from "./components/GroupJobsChart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@Store/index";
import Condition2Comp from "@Components/Condition2Comp";
import RegionsEmptyBox from "./components/RegionsEmptyBox";
import GroupsEmptyBox from "./components/GroupsEmptyBox";
import theme from "@Themes/index";
import { setLeftSideBarStatus } from "@Store/summary_store";

function SummaryPage() {
  /// Region store
  const { regions, groups, groupsLoading, regionsLoading } = useSelector(
    (state: RootState) => state.companyRegion
  );

  const dispatch = useDispatch();

  const isRegionEmpty = regions?.rows?.length === 0 && !regionsLoading;
  const isGroupEmpty =
    groups?.rows?.length === 0 && !groupsLoading && !regionsLoading;

  return (
    <div className="summary-layout">
      <SummarySideBar />
      <div
        onClick={() => {
          if (window.innerWidth <= 900) {
            dispatch(setLeftSideBarStatus(false));
          }
        }}
        className="summary-right-side"
      >
        <Condition2Comp
          showFirst={!isRegionEmpty}
          secondComp={<RegionsEmptyBox />}
          firstComp={
            <Grid
              container
              columnSpacing={1}
              direction="row"
              px={1}
              sx={{
                [theme.breakpoints.down("lg")]: {
                  flexDirection: "column",
                },
              }}
            >
              <Grid flex={1} item xs py={1}>
                <Box>
                  <Grid container rowSpacing={2}>
                    <Grid item xs={12} children={<RegionInfoBox />} />
                    <Grid item xs={12}>
                      <Condition2Comp
                        showFirst={!isGroupEmpty}
                        secondComp={<GroupsEmptyBox />}
                        firstComp={
                          <Grid container rowSpacing={2}>
                            <Grid item xs={12} children={<GroupInfoBox />} />
                            <Grid item xs={12} children={<GroupJobsChart />} />
                          </Grid>
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid mt={1} item>
                <Box
                  className="summary-base-groups"
                  children={<GroupsList />}
                />
              </Grid>
            </Grid>
          }
        />
      </div>
    </div>
  );
}

export default SummaryPage;
