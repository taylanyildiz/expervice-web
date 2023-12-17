import RichText from "@Components/RichText";
import VisibilityComp from "@Components/VisibilityComp";
import UnitStatusBox from "@Features/summary/units/dialogs/UnitStatusBox";
import TranslateHelper from "@Local/index";
import Unit from "@Models/units/unit";
import { caption } from "@Utils/functions";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";

interface JobUnitInfoBoxProps {
  unit?: Unit;
}

function JobUnitInfoBox(props: JobUnitInfoBoxProps) {
  const { unit } = props;
  const visibility = useMemo(() => Boolean(unit), [unit]);

  return (
    <VisibilityComp visibility={visibility}>
      <Box mb={1} p={1} boxShadow={1}>
        <Stack>
          <Stack mb={1} direction="row" spacing={1}>
            <Typography variant="h1" fontSize={15} children={unit?.name} />
            <UnitStatusBox status={unit?.status ?? false} />
          </Stack>
          <Typography
            fontSize={11}
            color="grey"
            children={unit?.street_address}
          />
          <RichText
            color="black"
            title={`${TranslateHelper.customer()} :`}
            content={
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{ width: 24, height: 24, fontSize: 10, color: "white" }}
                  children={caption(unit?.customer?.display_name)}
                />
                <Typography
                  fontSize={13}
                  children={unit?.customer?.display_name}
                />
              </Stack>
            }
          />
          <RichText
            color="black"
            title={`${TranslateHelper.groupName()} :`}
            content={unit?.group?.name}
          />
        </Stack>
      </Box>
    </VisibilityComp>
  );
}

export default JobUnitInfoBox;
