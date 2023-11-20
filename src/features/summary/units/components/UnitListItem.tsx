import Unit from "@Models/units/unit";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import UnitStatusBox from "../dialogs/UnitStatusBox";
import JobTypeBox from "@Components/JobTypeBox";
import VisibilityComp from "@Components/VisibilityComp";
import Colors from "@Themes/colors";

type Function = () => void;

interface UnitListItemProps {
  unit: Unit;
  selected?: boolean;
  onClick: Function;
  onMap: Function;
}

function UnitListItem(props: UnitListItemProps) {
  const { unit, onClick, onMap, selected } = props;
  return (
    <div
      className="unit-list-item"
      style={{ backgroundColor: selected ? Colors.selected : "" }}
    >
      <div onClick={onClick} style={{ flex: 1 }}>
        <Stack flex={1} direction="column">
          <Grid container columnSpacing={1}>
            <Grid item>
              <Typography variant="h1" fontSize={14} children={unit.name} />
            </Grid>
            <Grid item>
              <UnitStatusBox status={unit.status} />
            </Grid>
            <Grid item>
              <JobTypeBox type={unit.job?.type_id} />
            </Grid>
          </Grid>
          <Typography
            variant="h1"
            fontSize={11}
            children={unit.unit_sub_type?.name}
          />
          <Typography fontSize={11} children={unit.street_address} />
        </Stack>
      </div>
      <VisibilityComp visibility={Boolean(unit.latitude && unit.longitude)}>
        <IconButton onClick={onMap}>
          <LocationOnIcon />
        </IconButton>
      </VisibilityComp>
    </div>
  );
}

export default UnitListItem;
