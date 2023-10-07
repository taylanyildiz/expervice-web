import CompanyRegionRepository from "@Repo/company_region_repository";
import { RootState } from "@Store/index";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function RegionInfoBox() {
  /// Company region store
  const { region, weather } = useSelector(
    (state: RootState) => state.compay_region
  );

  /// Creator display name - email
  const creatorDisplayName = `${region?.creator?.first_name} ${region?.creator?.last_name}`;
  const creatorEmail = region?.creator?.email;

  /// Company region repo
  const companyRegionRepo = new CompanyRegionRepository();

  /// Get region weather
  const getRegionWeather = async () => {
    await companyRegionRepo.getRegionWeather();
  };

  /// Initialize component
  useEffect(() => {
    getRegionWeather();
  }, [region]);

  return (
    <Box p={4} sx={{ backgroundColor: "white", borderRadius: 1 }}>
      <Grid container alignItems="start">
        <Grid item flexGrow={1}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h1" fontSize={20} children={region?.name} />
            </Grid>
            <Grid item xs={12}>
              <Typography children={creatorDisplayName} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" children={creatorEmail} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography
                variant="h1"
                fontSize={20}
                children={weather?.forecast?.[0].text}
              />
            </Grid>
            <Grid item>
              <img height={40} width={40} src={weather?.forecast?.[0].icon} />
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                fontSize={20}
                children={`${weather?.forecast?.[0].temp_c} °C`}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RegionInfoBox;
