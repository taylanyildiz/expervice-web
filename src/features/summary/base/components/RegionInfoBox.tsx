import LoadingComp from "@Components/LoadingComp";
import VisibilityComp from "@Components/VisibilityComp";
import CompanyRegionRepository from "@Repo/company_region_repository";
import { RootState } from "@Store/index";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function RegionInfoBox() {
  /// Company region store
  const { region, weather, regionsLoading, weatherLoading } = useSelector(
    (state: RootState) => state.companyRegion
  );

  /// Creator display name - email
  const creatorDisplayName = `${region?.creator?.first_name} ${region?.creator?.last_name}`;
  const creatorEmail = region?.creator?.email;

  /// Company region repo
  const companyRegionRepo = new CompanyRegionRepository();

  /// Get region weather
  const getRegionWeather = async () => {
    if (!region) return;
    await companyRegionRepo.getRegionWeather(region!.id!);
  };

  /// Initialize component
  useEffect(() => {
    getRegionWeather();
  }, [region]);

  return (
    <Box p={4} sx={{ backgroundColor: "white", borderRadius: 1 }}>
      <LoadingComp loading={regionsLoading}>
        <Grid container alignItems="start">
          <Grid item flexGrow={1}>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  fontSize={20}
                  children={region?.name}
                />
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
            <LoadingComp loading={weatherLoading}>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography
                    variant="h1"
                    fontSize={20}
                    children={weather?.forecast?.[0]?.text ?? "-"}
                  />
                </Grid>
                <Grid item>
                  <VisibilityComp
                    visibility={Boolean(weather?.forecast?.[0]?.icon)}
                  >
                    <img
                      height={40}
                      width={40}
                      src={weather?.forecast?.[0]?.icon}
                    />
                  </VisibilityComp>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    fontSize={20}
                    children={`${weather?.forecast?.[0]?.temp_c ?? ""} °C`}
                  />
                </Grid>
                <Grid item ml={1}>
                  <Typography
                    variant="body2"
                    fontSize={18}
                    children={region?.state?.name}
                  />
                </Grid>
              </Grid>
            </LoadingComp>
          </Grid>
        </Grid>
      </LoadingComp>
    </Box>
  );
}

export default RegionInfoBox;
