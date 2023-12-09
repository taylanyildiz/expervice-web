import LoadingComp from "@Components/LoadingComp";
import { RootState } from "@Store/index";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import Colors from "@Themes/colors";
import SelectDate from "@Components/SelectDate";
import { setGroupInfoFilter } from "@Store/company_region_store";

type DataSet = {
  fault: number;
  maintenance: number;
  date: number;
};

function GroupJobsChart() {
  /// Company region store
  const {
    groupInfo,
    groupInfoLoading,
    groupInfoFilter: filter,
  } = useSelector((state: RootState) => state.companyRegion);

  /// Dispatch
  const dispatch = useDispatch();

  /// Data set of chart
  const [dataset, setDataset] = useState<DataSet[]>([]);

  /// Initialize chart values
  const initChartValues = () => {
    const values: DataSet[] = [];
    if (!groupInfo?.jobs || groupInfo.jobs.length == 0) return setDataset([]);
    for (let job of groupInfo.jobs) {
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
    initChartValues();
  }, [groupInfo]);

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Stack direction="column">
        <Stack
          direction="row"
          m={1}
          justifyContent="space-between"
          alignItems="center"
          display="flex"
        >
          <Typography variant="h1" fontSize={15} children="Group Jobs" />
          <Box width={200}>
            <SelectDate
              label="Date"
              value={filter?.dateType}
              onChanged={(dateType, start, end) => {
                dispatch(
                  setGroupInfoFilter({
                    dateType,
                    start_date: start,
                    end_date: end,
                  })
                );
              }}
            />
          </Box>
        </Stack>
        <LoadingComp height={300} loading={groupInfoLoading}>
          <ReactApexChart
            type="bar"
            height={300}
            series={[
              {
                name: "Fault",
                data: dataset.map((e) => [e.date, e.fault]),
                color: Colors.error,
              },
              {
                name: "Maintenance",
                data: dataset.map((e) => [e.date, e.maintenance]),
                color: Colors.info,
              },
            ]}
            options={{
              chart: {
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
  );
}

export default GroupJobsChart;
