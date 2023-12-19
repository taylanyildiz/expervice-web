import { Stack } from "@mui/material";
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
import { setLeftSideBarStatus } from "@Store/summary_store";
import GroupUnitsJobChart from "./components/GroupUnitsJobChart";

function SummaryPage() {
  /// Region store
  const { regions, groups, groupsLoading, regionsLoading } = useSelector(
    (state: RootState) => state.companyRegion
  );

  const dispatch = useDispatch();

  const isRegionEmpty = regions?.rows?.length === 0 && !regionsLoading;
  const isGroupEmpty =
    groups?.rows?.length === 0 && !groupsLoading && !regionsLoading;

  /// Close side bar
  const handleClick = () => {
    if (window.innerWidth <= 900) {
      dispatch(setLeftSideBarStatus(false));
    }
  };

  return (
    <div className="summary-layout">
      <SummarySideBar />
      <div className="summary-right-side" onClick={handleClick}>
        <Condition2Comp
          showFirst={!isRegionEmpty}
          secondComp={<RegionsEmptyBox />}
          firstComp={
            <Stack overflow="hidden" m="10px" flex={1} spacing={1}>
              <RegionInfoBox />
              <Condition2Comp
                showFirst={!isGroupEmpty}
                secondComp={<GroupsEmptyBox />}
                firstComp={
                  <>
                    <GroupInfoBox />
                    <GroupJobsChart />
                    <GroupUnitsJobChart />
                  </>
                }
              />
            </Stack>
          }
        />
        <GroupsList />
      </div>
    </div>
  );
}

export default SummaryPage;
