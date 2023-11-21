import { useEffect } from "react";
import CompanyRegionRepository from "@Repo/company_region_repository";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@Store/index";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { CompanyRegion } from "@Models/index";
import { setSelectedRegion } from "@Store/company_region_store";
import SelectedRegionBox from "./SelectedRegionBox";
import VisibilityComp from "@Components/VisibilityComp";
import LoadingComp from "@Components/LoadingComp";
import { setUnitFilter } from "@Store/unit_store";
import { useUnit } from "@Features/summary/units/helper/unit_helper";

/// Regions list
function RegionsList(props: { scale: string }) {
  /// Region repository
  const companyRegionRepo = new CompanyRegionRepository();

  /// Company region store
  const {
    regionsLoading,
    regions: { rows },
    region,
  } = useSelector((state: RootState) => state.companyRegion);

  /// Unit store
  const { filter: unitFilter } = useUnit();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

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

  /// Select region
  const onSelectRegion = (value: CompanyRegion) => {
    if (value.id === region?.id) return;
    dispatch(setSelectedRegion(value));
    dispatch(
      setUnitFilter({
        ...unitFilter,
        region_ids: [value.id],
      })
    );
  };

  return (
    <div style={{ scale: props.scale }} className="region-list">
      <LoadingComp loading={regionsLoading}>
        <VisibilityComp
          visibility={Boolean(region)}
          children={<SelectedRegionBox />}
        />
        <Box sx={{ overflowY: "scroll", height: "100%" }}>
          <List>
            {rows?.map((item: CompanyRegion, index) => (
              <ListItemButton
                selected={item.id === region?.id}
                onClick={() => onSelectRegion(item)}
                key={index}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </LoadingComp>
    </div>
  );
}

export default RegionsList;
