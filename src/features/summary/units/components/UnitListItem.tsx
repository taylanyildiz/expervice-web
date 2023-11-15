import Unit from "@Models/units/unit";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import UnitStatusBox from "../dialogs/UnitStatusBox";
import JobTypeBox from "@Components/JobTypeBox";

type Function = () => void;

interface UnitListItemProps {
  unit: Unit;
  selected?: boolean;
  onClick: Function;
  onMap: Function;
}

function UnitListItem(props: UnitListItemProps) {
  const { unit, onClick, onMap } = props;
  return (
    <div className="unit-list-item">
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
      <IconButton onClick={onMap}>
        <LocationOnIcon />
      </IconButton>
    </div>
  );
}

export default UnitListItem;
