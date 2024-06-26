import LoadingComp from "@Components/LoadingComp";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Colors from "@Themes/colors";
import TranslateHelper from "@Local/index";
import { useUser } from "@Features/summary/company/helper/company_helper";
import CompanyRegionRepository from "@Repo/company_region_repository";
import { useCompanyRegion } from "../helper/summary_helper";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useDispatch } from "react-redux";
import { setGroupInfoFilterDrawerStatus } from "@Store/company_region_store";
import GroupJobsInfoFilterDrawer from "./GroupJobsInfoFilterDrawer";

type DataSet = {
  fault: number;
  maintenance: number;
  date: number;
};

function GroupJobsChart() {
  /// Company region store
  const {
    group,
    groupJobsInfo,
    groupJobsInfoLoading,
    groupInfoFilter: filter,
  } = useCompanyRegion();

  /// Company region repository
  const companyRegionRepo = new CompanyRegionRepository();

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  /// Dispatch
  const dispatch = useDispatch();

  /// Data set of chart
  const [dataset, setDataset] = useState<DataSet[]>([]);

  /// Initialize chart values
  const initChartValues = () => {
    const values: DataSet[] = [];
    if (!groupJobsInfo) return setDataset([]);
    for (let job of groupJobsInfo) {
      const isFault = job.type_id === 1;
      const named = isFault ? "fault" : "maintenance";
      const index = values.findIndex((e: any) => e.date === job.date);
      if (index === -1) {
        values.push({
          fault: isFault ? job.count! : 0,
          maintenance: !isFault ? job.count! : 0,
          date: new Date(job.date!).getTime(),
        });
      } else {
        values[index] = { ...values[index], [named]: job.count };
      }
    }
    setDataset(values);
  };

  /// Initialize component
  useEffect(() => {
    if (!group) return;
    companyRegionRepo.getGroupJobsInfo(group!.id!);
  }, [group, filter]);

  /// Initialize component
  useEffect(() => {
    initChartValues();
  }, [groupJobsInfo]);

  return (
    <>
      <Box sx={{ backgroundColor: "white" }}>
        <Stack>
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
              children={TranslateHelper.groupJobs()}
            />
            <IconButton
              onClick={() => {
                dispatch(setGroupInfoFilterDrawerStatus(true));
              }}
            >
              <FilterAltIcon />
            </IconButton>
          </Stack>
          <LoadingComp height={300} loading={groupJobsInfoLoading}>
            <ReactApexChart
              type="bar"
              height={300}
              series={[
                {
                  name: TranslateHelper.fault(),
                  data: dataset.map((e) => [e.date, e.fault]),
                  color: Colors.error,
                },
                {
                  name: TranslateHelper.maintenance(),
                  data: dataset.map((e) => [e.date, e.maintenance]),
                  color: Colors.info,
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
                          "Ara",
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
                  id: "area-datetime",
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
                  type: "datetime",
                  max: filter?.end_date && new Date(filter.end_date).getTime(),
                  min:
                    filter?.start_date && new Date(filter.start_date).getTime(),
                  tickAmount: 1,
                },
                tooltip: {
                  x: {
                    format: "dd MMM yyyy",
                  },
                },
                fill: {
                  colors: [Colors.error, Colors.info],
                },
              }}
            />
          </LoadingComp>
        </Stack>
      </Box>
      <GroupJobsInfoFilterDrawer />
    </>
  );
}

export default GroupJobsChart;
