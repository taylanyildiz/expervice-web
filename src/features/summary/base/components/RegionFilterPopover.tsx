import { Divider, IconButton, Popover, Stack, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useEffect, useState } from "react";
import SelectRegionFilterType from "./SelectRegionFilterType";
import PrimaryButton from "@Components/PrimaryButton";
import { ERegionFilterType } from "../entities/enums";

interface RegionFilterPopoverProps {
  filterType: ERegionFilterType | null;
  onChanged: (value: ERegionFilterType | null) => void;
}

function RegionFilterPopover(props: RegionFilterPopoverProps) {
  const { filterType, onChanged } = props;

  /// Popover anchour
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  /// Initialize component
  useEffect(() => {
    setType(filterType);
  }, [filterType]);

  /// Filter type state
  const [type, setType] = useState<ERegionFilterType | null>(filterType);

  /// Open popover
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /// Close popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  /// Update result
  const handleUpdate = () => {
    onChanged(type);
  };

  /// Reset handle
  const handleReset = () => {
    setType(ERegionFilterType.Name);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <FilterAltIcon fontSize="small" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorReference="anchorPosition"
        onClose={handleClose}
        anchorPosition={{ top: 210, left: 220 }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <Stack width={300} divider={<Divider />}>
          <Typography p={1} children="FILTER YOUR RESULTS" />
          <Stack spacing={1} p={1}>
            <SelectRegionFilterType
              label="Filter Type"
              value={type}
              onChanged={(type) => {
                setType(type);
              }}
            />
            <Stack direction="row" spacing={1}>
              <PrimaryButton
                variant="contained"
                fontWeight="normal"
                color="white"
                children="Update Results"
                onClick={handleUpdate}
              />
              <PrimaryButton
                variant="outlined"
                fontWeight="normal"
                children="Reset Filters"
                onClick={handleReset}
              />
            </Stack>
          </Stack>
        </Stack>
      </Popover>
    </div>
  );
}

export default RegionFilterPopover;
