import { Box, Divider, Grid, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import Images from "@Assets/images";
import { Link } from "react-router-dom";
import ERouter from "@Routes/router_enum";
import PrimaryButton from "@Components/PrimaryButton";
import Colors from "@Themes/colors";
import TextOutlineField from "@Components/TextOutlineField";
import SearchIcon from "@mui/icons-material/Search";
import "../../../../assets/css/summary.css";
import { AppDispatch, RootState } from "@Store/index";
import { setLeftSideBarStatus } from "@Store/summary_store";
import RegionsList from "./RegionList";
import { useSummaryDialog } from "../helper/summary_helper";
import { useAccount } from "@Features/summary/company/helper/company_helper";
import VisibilityComp from "@Components/VisibilityComp";
import { useEffect, useMemo, useState } from "react";
import { compareString } from "@Utils/functions";
import CompanyRegionRepository from "@Repo/company_region_repository";
import { setSelectedRegion } from "@Store/company_region_store";
import RegionFilterPopover from "./RegionFilterPopover";
import { ERegionFilterType, ERegionSortType } from "../entities/enums";
import RegionSortPopover from "./RegionSortPopover";

/// Animated arrow button
function ArrowButton() {
  /// Summary store
  const { leftSideBarStatus } = useSelector(
    (state: RootState) => state.summary
  );
  /// Dispatch
  const dispatch = useDispatch<AppDispatch>();

  /// Click arrow icon
  /// Changed status of side bar
  const onClickHandle = () => {
    dispatch(setLeftSideBarStatus(!leftSideBarStatus));
  };

  const deg = leftSideBarStatus ? 0 : -180;

  return (
    <div
      className="side-bar-icon"
      style={{ transform: `rotate(${deg}deg)` }}
      onClick={onClickHandle}
    >
      <ArrowLeftIcon sx={{ fontSize: 30 }} />
    </div>
  );
}

function SummarySideBar() {
  /// Account store
  const { isInternal, isOwner } = useAccount();

  /// Summary store
  const { leftSideBarStatus: open } = useSelector(
    (state: RootState) => state.summary
  );

  /// Company region store
  const {
    regions: { rows },
    region,
  } = useSelector((state: RootState) => state.companyRegion);

  /// Dispatch
  const dispatch = useDispatch();

  /// Region repository
  const companyRegionRepo = new CompanyRegionRepository();

  /// Search and filter and sort state
  const [search, setSearch] = useState<string>("");
  const [filterType, setFilterType] = useState<ERegionFilterType | null>(
    ERegionFilterType.Name
  );
  const [sortType, setSortType] = useState<ERegionSortType | null>(
    ERegionSortType.Alphabetically
  );

  /// Region list
  const regions = useMemo(() => {
    const filtered = rows.filter((e) => {
      const name = compareString(e.name!, search);
      const address = compareString(e.street_address!, search);
      const zipcode = compareString(e.zip_code!, search);
      switch (filterType) {
        case ERegionFilterType.Name:
          return name;
        case ERegionFilterType.Address:
          return address;
        case ERegionFilterType.Zipcode:
          return zipcode;
        default:
          return name;
      }
    });
    return filtered.sort((a, b) => {
      switch (sortType) {
        case ERegionSortType.Alphabetically:
          return a.name!.localeCompare(b.name!);
        case ERegionSortType.CreatedDate:
          return Date.parse(a.created_at!) - Date.parse(b.created_at!);
        default:
          return 1;
      }
    });
  }, [search, rows]);

  /// Dialog hooks
  const { openRegionDialog } = useSummaryDialog();

  const width = open ? 280 : 25;
  const scale = open ? 1.0 : 0.0;

  /// Create new reigon dialog open
  const onClickNewRegionHandle = () => {
    openRegionDialog();
  };

  /// Get regions of company
  const getRegions = async () => {
    await companyRegionRepo.getRegions();
  };

  /// Initialize component
  useEffect(() => {
    getRegions();
  }, []);

  useEffect(() => {
    if (region || rows.length === 0) return;
    dispatch(setSelectedRegion(rows[0]));
  }, [rows]);

  return (
    <Box className="summary-side-bar" sx={{ width: width }}>
      <Grid
        container
        px={3}
        className="side-child"
        sx={{ scale: `calc(${scale})` }}
      >
        <Grid item>
          <Link
            to={ERouter.Summary}
            children={Images.logoTextWithBlack({ height: 70 })}
          />
        </Grid>
        <Grid item xs={12} children={<Divider />} />
        <VisibilityComp visibility={isOwner || isInternal}>
          <Grid item xs={12} mt={2}>
            <PrimaryButton
              height={30}
              fullWidth
              children="New Region"
              color="white"
              fontWeight="normal"
              fontSize={13}
              backgroundColor={Colors.primaryLight}
              onClick={onClickNewRegionHandle}
            />
          </Grid>
        </VisibilityComp>
        <Grid item xs={12} mt={1}>
          <Grid container alignItems="center">
            <Grid item sx={{ flexGrow: 1 }}>
              <Typography fontWeight="bold" children="Regions" fontSize={14} />
            </Grid>
            <Grid item>
              <RegionFilterPopover
                filterType={filterType}
                onChanged={(type) => setFilterType(type)}
              />
            </Grid>
            <Grid item>
              <RegionSortPopover
                sortType={sortType}
                onChanged={(type) => {
                  setSortType(type);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} mt={1}>
          <TextOutlineField
            fullWidth
            height={30}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            suffix={<SearchIcon />}
          />
        </Grid>
      </Grid>
      <RegionsList scale={`calc(${scale})`} regions={regions} />
      <ArrowButton />
    </Box>
  );
}

export default SummarySideBar;
