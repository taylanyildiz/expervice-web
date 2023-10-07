import CompanyRegionRepository from "@Repo/company_region_repository";
import { RootState } from "@Store/index";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface InfoProps {
  title: string;
  count: number | null | undefined;
}

function InfoBox(props: InfoProps) {
  const { title, count } = props;
  return (
    <Grid container rowSpacing={2} direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h1" fontSize={15} color="grey" children={title} />
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
          <Typography variant="h1" fontSize={18} children={group?.name} />
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
            <InfoBox title="Jobs" count={groupInfo?.job_count} />
            <InfoBox title="Technicians" count={groupInfo?.technician_count} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GroupInfoBox;
