import { DialogCustomTitle } from "@Components/dialogs";
import JobDialogAction from "./JobDialogAction";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { useEffect, useState } from "react";
import { useJob, useJobCreate, useJobTechnician } from "../helper/job_helper";
import { useDispatch } from "react-redux";
import { setJob, setJobId } from "@Store/job_store";
import { useFormik } from "formik";
import JobRepository from "@Repo/job_repository";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { Box, DialogContent } from "@mui/material";
import Job from "@Models/job/job";
import JobTechnicians from "./JobTechnicians";
import Unit from "@Models/units/unit";
import JobStepper from "../components/JobStepper";
import JobDialogInfo from "./JobDialogInfo";
import TabBar from "@Components/TabBar";
import { EJobPriorites } from "../entities/job_enums";
import { jobValidaotr } from "../validator/job_validator";

function JobDialog(props?: { unit?: Unit | null }) {
  const { unit } = props ?? {};
  /// Job store
  const { job, jobId } = useJob();
  const isEdit = Boolean(job);

  /// Dispacth
  const dispatch = useDispatch();

  /// Dialog hook
  const { openLoading } = useDialog();

  /// Job Repository
  const jobRepo = new JobRepository();

  /// Action type state
  const [actionType, setActionType] = useState<EActionType | null>(null);

  /// Action changed handle
  const onChangedActionHandle = (type: EActionType) => {
    if (type === EActionType.Delete) {
      return;
    }
    setActionType(type);
    formik.handleSubmit();
  };

  /// Initialize component
  useEffect(() => {
    if (!job) return;
    for (let [k, v] of Object.entries(job)) {
      formik.setFieldValue(k, v);
    }
  }, [job]);

  ///
  useEffect(() => {
    if (unit) {
      formik.setFieldValue("unit", unit);
    }
  }, [unit]);

  ///
  useEffect(() => {
    if (!jobId) return;
    openLoading(async () => {
      await jobRepo.job(jobId);
    });
  }, [jobId]);

  /// Destroy component
  useEffect(() => {
    return () => {
      dispatch(setJobId(null));
      dispatch(setJob(null));
    };
  }, []);

  const process = async () => {
    const result = await openLoading(async () => {
      let result: Job | null = null;
      if (!isEdit) result = await jobRepo.createJob(createJob!);
      else {
        if (addedTechnicians.length !== 0) {
          result = await jobRepo.updateJob({
            id: job!.id!,
            technicians: addedTechnicians!,
          });
        }
        if (deletedTechnicians.length !== 0) {
          for (let technician of deletedTechnicians) {
            result = await jobRepo.deleteTechnician(job!.id!, technician);
          }
        }
        if (updatedTechnicians.length !== 0) {
          for (let technician of updatedTechnicians) {
            result = await jobRepo.updateTechnician(
              job!.id!,
              technician.technician_id!,
              technician.role_id!
            );
          }
        }
      }
    });
  };

  /// Submit handle
  const onSubmitHandle = async () => {
    const job = await process();
    switch (actionType) {
      case EActionType.Save:
        break;
      case EActionType.SaveClose:
        break;
      case EActionType.SaveNew:
        break;
    }
  };

  /// Formik
  const initialValues: Job = {
    sub_type_id: 1,
    priority_id: EJobPriorites.Highest,
    job_technicians: [],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: onSubmitHandle,
    validationSchema: jobValidaotr,
  });

  /// Create job hook
  const createJob = useJobCreate(formik);

  /// Job technician hook
  const { addedTechnicians, deletedTechnicians, updatedTechnicians } =
    useJobTechnician(job, formik);

  return (
    <>
      <DialogCustomTitle title="Job Create" />
      <DialogContent>
        <Box mt={1}>
          <TabBar
            tabs={[
              {
                title: "Job Information",
                panel: (
                  <>
                    <JobDialogInfo formik={formik} />
                    <JobTechnicians formik={formik} />
                  </>
                ),
              },
              {
                visibility: isEdit,
                title: "Job Steps",
                panel: <JobStepper job={job} onContinue={() => {}} />,
              },
            ]}
          />
        </Box>
      </DialogContent>
      <JobDialogAction onChanged={onChangedActionHandle} />
    </>
  );
}

export default JobDialog;
