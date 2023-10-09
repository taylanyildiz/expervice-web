import { useEffect } from "react";
import CompanyRegionRepository from "@Repo/company_region_repository";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@Store/index";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { CompanyRegion } from "@Models/index";
import { setSelectedRegion } from "@Store/company_region_store";
import SelectedRegionBox from "./SelectedRegionBox";
import VisibilityComp from "@Components/VisibilityComp";

/// Regions list
function RegionsList(props: { scale: string }) {
  /// Region repository
  const companyRegionRepo = new CompanyRegionRepository();

  /// Company region store
  const {
    regions: { rows },
    region,
  } = useSelector((state: RootState) => state.compay_region);

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

  /// Select region
  const onSelectRegion = (region: CompanyRegion) => {
    dispatch(setSelectedRegion(region));
  };

  return (
    <div style={{ scale: props.scale }} className="region-list">
      <VisibilityComp
        visibility={Boolean(region)}
        children={<SelectedRegionBox />}
      />
      <Box sx={{ overflowY: "scroll", height: "110%" }}>
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
    </div>
  );
}

export default RegionsList;