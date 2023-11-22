import JobStatus from "@Models/job/job_status";
import ConstantRepository from "@Repo/constant_repository";
import Colors from "@Themes/colors";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

interface SelectJobStatusProps {
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  value?: JobStatus;
  jobType?: number;
  jobStatus?: number;
  forForm?: boolean;
  onChanged: (values: JobStatus | null | undefined) => void;
}

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor: Colors.pageBackground,
}));

const GroupItems = styled("ul")({
  fontSize: 11,
  padding: 0,
});

function SelectJobStatus(props: SelectJobStatusProps) {
  const {
    label,
    fullWidth,
    helperText,
    error,
    value,
    onChanged,
    jobStatus,
    jobType,
    forForm,
  } = props;

  /// Job statuses & loading state
  const [statuses, setStatuses] = useState<JobStatus[]>([]);
  const loading = Boolean(statuses.length === 0);

  /// Option state
  const [option, setOption] = useState<JobStatus | null>(null);

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Initialize component
  useEffect(() => {
    const getStatuses = async () => {
      const statuses = await constantRepo.getJobStatuses({
        job_type: jobType,
        status_id: jobStatus,
        forForm: forForm,
      });
      setStatuses(statuses ?? []);
    };

    getStatuses();
  }, [jobStatus, jobType, forForm]);

  /// Depends on [value]
  useEffect(() => {
    setOption(value ?? null);
  }, [value]);

  return (
    <Autocomplete
      loading={loading}
      fullWidth={fullWidth}
      options={statuses}
      value={option}
      getOptionLabel={(option) => option.name ?? ""}
      groupBy={(option) => option?.job_type?.name ?? ""}
      onChange={(_, v) => onChanged(v)}
      isOptionEqualToValue={(value, option) => value?.id === option?.id}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      renderInput={(props) => {
        return (
          <FormControl fullWidth={fullWidth}>
            <Typography
              display="flex"
              justifyContent="start"
              fontSize={12}
              fontWeight="bold"
              children={label}
            />
            <TextField
              {...props}
              helperText={null}
              error={error}
              size="small"
            />
            <FormHelperText
              error={error}
              sx={{ p: 0, m: 0 }}
              id="my-helper-text"
            >
              {helperText ?? " "}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}

export default SelectJobStatus;
