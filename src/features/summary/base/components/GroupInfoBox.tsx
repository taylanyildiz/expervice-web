import CompanyRegionRepository from "@Repo/company_region_repository";
import { RootState } from "@Store/index";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

interface InfoProps {
  title: string;
  count: number | null | undefined;
  icon?: ReactNode;
}

function InfoBox(props: InfoProps) {
  const { title, count, icon } = props;
  return (
    <Grid container rowSpacing={2} direction="column" alignItems="center">
      <Grid item>
        <Grid container alignItems="center" columnSpacing={1}>
          {icon && <Grid item children={icon} />}
          <Grid item>
            <Typography
              variant="h1"
              fontSize={15}
              color="grey"
              children={title}
              overflow="clip"
              textOverflow="ellipsis"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="body1" fontSize={15} children={count} />
      </Grid>
    </Grid>
  );
}

function GroupInfoBox() {
  /// Company region store
  const { group, groupInfo } = useSelector(
    (state: RootState) => state.compay_region
  );

  /// Company region repository
  const companyRegionRepo = new CompanyRegionRepository();

  /// Get company info
  const getInfo = async () => {
    await companyRegionRepo.getGroupInfo();
  };

  /// Initialize component
  useEffect(() => {
    getInfo();
  }, [group]);

  return (
    <Box p={4} sx={{ backgroundColor: "white", borderRadius: 1 }}>
      <Grid container rowSpacing={1}>
        <Grid item xs={12}>
          <Typography
            variant="h1"
            fontSize={18}
            children={group?.name}
            overflow="clip"
            textOverflow="ellipsis"
          />
        </Grid>
        <Grid item xs={12} children={<Divider />} />
        <Grid item xs={12} mt={2}>
          <Stack
            useFlexGap
            direction="row"
            justifyContent="space-around"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <InfoBox title="Units" count={groupInfo?.unit_count} />
            <InfoBox
              title="Jobs"
              count={groupInfo?.job_count}
              icon={<WorkIcon sx={{ height: 20, width: 20, color: "grey" }} />}
            />
            <InfoBox
              title="Technicians"
              count={groupInfo?.technician_count}
              icon={
                <AssignmentIndIcon
                  sx={{ height: 20, width: 20, color: "grey" }}
                />
              }
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GroupInfoBox;
