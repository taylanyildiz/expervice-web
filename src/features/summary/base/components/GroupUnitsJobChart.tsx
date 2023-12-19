import LoadingComp from "@Components/LoadingComp";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useUser } from "@Features/summary/company/helper/company_helper";
import CompanyRegionRepository from "@Repo/company_region_repository";
import { useCompanyRegion } from "../helper/summary_helper";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useDispatch } from "react-redux";
import TranslateHelper from "@Local/index";
import { setGroupUnitsInfoDrawerStatus } from "@Store/company_region_store";
import GroupUnitsJobsInfoFilterDrawer from "./GroupUnitsJobsInfoFilterDrawer";

function GroupUnitsJobChart() {
  /// Company region store
  const {
    group,
    groupUnitsInfo,
    groupUnitsInfoLoading,
    groupUnitsInfoFilter: filter,
  } = useCompanyRegion();

  /// Company region repository
  const companyRegionRepo = new CompanyRegionRepository();

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  /// Dispatch
  const dispatch = useDispatch();

  /// Initialize component
  useEffect(() => {
    if (!group) return;
    companyRegionRepo.getGroupUnitsJobInfo(group!.id!);
  }, [group, filter]);

  return (
    <>
      <Box flex={1} sx={{ backgroundColor: "white" }}>
        <Stack direction="column">
          <Stack
            direction="row"
            m={1}
            justifyContent="space-between"
            alignItems="center"
            display="flex"
          >
            <Typography
              variant="h1"
              fontSize={15}
              children={"Units Job Info"} // TODO: Translations
            />
            <IconButton
              onClick={() => {
                dispatch(setGroupUnitsInfoDrawerStatus(true));
              }}
            >
              <FilterAltIcon />
            </IconButton>
          </Stack>
          <LoadingComp height={300} loading={groupUnitsInfoLoading}>
            <ReactApexChart
              type="bar"
              height={300}
              series={[
                {
                  name: "",
                  data: groupUnitsInfo?.map((e) => e.count!) ?? [],
                },
              ]}
              options={{
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                  },
                },
                chart: {
                  defaultLocale: lng,
                  locales: [
                    {
                      name: "tr",
                      options: {
                        months: [
                          "Ocak",
                          "Şubat",
                          "Mart",
                          "Nisan",
                          "Mayıs",
                          "Haziran",
                          "Temmuz",
                          "Ağustos",
                          "Ekim",
                          "Eylül",
                          "Kasım",
                          "Aralık",
                        ],
                        shortMonths: [
                          "Ock",
                          "Şub",
                          "Mar",
                          "Nis",
                          "May",
                          "Haz",
                          "Tem",
                          "Ağus",
                          "Ek",
                          "Ey",
                          "Kas",
                          "Ar",
                        ],
                        days: [
                          "Pazar",
                          "Pazartesi",
                          "Salı",
                          "Çarşamba",
                          "Perşembe",
                          "Cuma",
                          "Cumatesi",
                        ],
                        shortDays: [
                          "Paz",
                          "Pzt",
                          "Sal",
                          "Çar",
                          "Per",
                          "Cum",
                          "Cmts",
                        ],
                        toolbar: {
                          download: "SVG İndir",
                          exportToCSV: "CSV İndir",
                          exportToPNG: "PNG İndir",
                          exportToSVG: "SVG İndir",
                          selection: "Seçim",
                          selectionZoom: "Zoom",
                          zoomIn: "Yakşam",
                          zoomOut: "Uzaklaş",
                          pan: "Kaydırma",
                          reset: "Sıfırla",
                        },
                      },
                    },
                    {
                      name: "en",
                      options: {
                        months: [
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ],
                        shortMonths: [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ],
                        days: [
                          "Sunday",
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                        ],
                        shortDays: [
                          "Sun",
                          "Mon",
                          "Tue",
                          "Wed",
                          "Thu",
                          "Fri",
                          "Sat",
                        ],
                        toolbar: {
                          download: "Download SVG",
                          selection: "Selection",
                          selectionZoom: "Selection Zoom",
                          zoomIn: "Zoom In",
                          zoomOut: "Zoom Out",
                          pan: "Panning",
                          reset: "Reset Zoom",
                        },
                      },
                    },
                  ],
                  id: "area-category",
                  type: "bar",
                  height: 350,
                  zoom: {
                    autoScaleYaxis: true,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  type: "category",
                  categories: groupUnitsInfo?.map((e) => e.unit?.name),
                  labels: { show: false },
                  position: "top",
                },
                tooltip: {
                  y: {
                    formatter: (val) => {
                      return `${TranslateHelper.jobs()} ${val}`;
                    },
                  },
                },
              }}
            />
          </LoadingComp>
        </Stack>
      </Box>
      <GroupUnitsJobsInfoFilterDrawer />
    </>
  );
}

export default GroupUnitsJobChart;
