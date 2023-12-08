import {
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ERegionSortType } from "../entities/enums";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  getRegionSortIcon,
  getRegionSortTitle,
} from "../helper/summary_helper";
import DoneIcon from "@mui/icons-material/Done";

interface RegionSortPopoverProps {
  sortType: ERegionSortType | null;
  onChanged: (value: ERegionSortType | null) => void;
}

function RegionSortPopover(props: RegionSortPopoverProps) {
  const { sortType, onChanged } = props;

  /// Popover anchour
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  /// Initialize component
  useEffect(() => {
    const value = Object.values(ERegionSortType).filter(
      (e) => typeof e === "number"
    ) as number[];
    setTypes(value);
  }, []);

  /// Listen [sorType]
  useEffect(() => {
    setType(sortType);
  }, [sortType]);

  /// Sort type state
  const [types, setTypes] = useState<ERegionSortType[]>([]);
  const [type, setType] = useState<ERegionSortType | null>(sortType);

  /// Open popover
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /// Close popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <SwapVertIcon fontSize="small" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorReference="anchorPosition"
        onClose={handleClose}
        anchorPosition={{ top: 210, left: 260 }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <Stack width={300} divider={<Divider />}>
          <Typography p={1} children="Sort Regions" />
          <Stack spacing={1} p={1} divider={<Divider />}>
            {types.map((e) => (
              <ListItem
                disableGutters
                disablePadding
                secondaryAction={e === type && <DoneIcon />}
              >
                <ListItemButton
                  onClick={() => {
                    onChanged(e);
                  }}
                >
                  <ListItemIcon>{getRegionSortIcon(e)}</ListItemIcon>
                  <ListItemText primary={getRegionSortTitle(e)} />
                </ListItemButton>
              </ListItem>
            ))}
          </Stack>
        </Stack>
      </Popover>
    </div>
  );
}

export default RegionSortPopover;
