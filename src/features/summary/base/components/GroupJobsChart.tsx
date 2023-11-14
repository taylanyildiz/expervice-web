import { RootState } from "@Store/index";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function GroupJobsChart() {
  /// Company region store
  const { groupInfo } = useSelector((state: RootState) => state.companyRegion);

  /// Data set of chart
  const [dataset, setDataset] = useState([{}]);

  /// Initialize chart values
  const initChartValues = () => {
    const values: any = [];
    if (!groupInfo?.jobs || groupInfo.jobs.length == 0) return setDataset([{}]);
    for (let job of groupInfo.jobs) {
      const isFault = job.type_id === 1;
      const named = isFault ? "fault" : "maintenance";
      const index = values.findIndex((e: any) => e.date === job.date);
      if (index === -1) {
        values.push({
          fault: isFault ? job.count : 0,
          maintenance: !isFault ? job.count : 0,
          date: job.date,
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

  /// Formatter
  const valueFormatter = (value: number) => `${value ?? 0}`;

  return (
    <Box
      p={0}
      sx={{ alignItems: "center", display: "flex", backgroundColor: "white" }}
    >
      <BarChart
        height={300}
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "date" }]}
        series={[
          {
            dataKey: "fault",
            label: "Fault",
            valueFormatter,
          },
          { dataKey: "maintenance", label: "Maintenance", valueFormatter },
        ]}
      />
    </Box>
  );
}

export default GroupJobsChart;
