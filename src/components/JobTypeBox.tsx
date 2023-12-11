import { EJobType } from "@Features/summary/jobs/entities/job_enums";
import TranslateHelper from "@Local/index";
import { Box, Typography } from "@mui/material";

interface JobTypeBoxProps {
  type?: number;
}

function JobTypeBox(props: JobTypeBoxProps) {
  const { type } = props;
  const noJob = Boolean(!type);
  const isFault = type === EJobType.Fault;

  const title = noJob
    ? TranslateHelper.noJob()
    : isFault
    ? TranslateHelper.fault()
    : TranslateHelper.maintenance();
  const backgroundColor = noJob ? "green" : isFault ? "red" : "blue";

  const sx = { backgroundColor, borderRadius: 1, p: 1, py: 0.1 };

  return (
    <Box sx={sx}>
      <Typography color="white" fontSize={12} children={title} />
    </Box>
  );
}

export default JobTypeBox;
