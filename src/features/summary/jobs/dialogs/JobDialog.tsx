import { DialogCustomTitle } from "@Components/dialogs";
import JobDialogAction from "./JobDialogAction";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { useEffect, useState } from "react";
import { useJob, useJobCreate, useJobUpdate } from "../helper/job_helper";
import { useDispatch } from "react-redux";
import { setJob, setJobDialogStatus, setJobId } from "@Store/job_store";
import { useFormik } from "formik";
import JobRepository from "@Repo/job_repository";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { Box, DialogContent, Typography } from "@mui/material";
import Job from "@Models/job/job";
import JobTechnicians from "./JobTechnicians";
import Unit from "@Models/units/unit";
import JobStepper from "../components/JobStepper";
import JobDialogInfo from "./JobDialogInfo";
import TabBar from "@Components/TabBar";
import { EJobPriorites } from "../entities/job_enums";
import { jobValidaotr } from "../validator/job_validator";
import VisibilityComp from "@Components/VisibilityComp";
import Colors from "@Themes/colors";
import { useCustomEffect } from "@Utils/functions";

function JobDialog(props?: { unit?: Unit | null }) {
  const { unit } = props ?? {};
  /// Job store
  const { job, jobId } = useJob();
  const isEdit = Boolean(job);

  /// Title of dialog
  const title = isEdit ? "Job Edit" : "Job Create";

  /// Dispacth
  const dispatch = useDispatch();

  /// Dialog hook
  const { openLoading, closeDialog, openConfirm } = useDialog();

  /// Job Repository
  const jobRepo = new JobRepository();

  /// Action type state
  const [actionType, setActionType] = useState<EActionType | null>(null);

  /// Action changed handle
  const onChangedActionHandle = async (type: EActionType) => {
    if (type === EActionType.Delete) {
      const result = await openConfirm(
        "Delete Job",
        "Are you sure to delete job ?"
      );
      if (result) {
        const result = await openLoading(async () => {
          return jobRepo.deleteJob(jobId!);
        });
        if (result) closeDialog();
      }
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
      if (k === "job_statuses") {
        formik.setFieldValue("description", v[0]?.["description"]);
      }
    }
  }, [job]);

  const getJob = async () => {
    const result = await openLoading(async () => {
      return await jobRepo.job(jobId!);
    });
    if (!result) closeDialog();
  };

  /// Initialize unit
  useEffect(() => {
    if (unit) {
      formik.setFieldValue("unit", unit);
    }
  }, [unit]);

  /// Get Job By Id
  useEffect(() => {
    if (!jobId) return;
    getJob();
  }, [jobId]);

  const destroy = () => {
    dispatch(setJobDialogStatus(false));
    dispatch(setJobId(null));
    dispatch(setJob(null));
    jobRepo.getJobs();
  };

  useCustomEffect(
    destroy,
    () => {
      dispatch(setJobDialogStatus(true));
    },
    []
  );

  const process = async (): Promise<Job | null> => {
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
      return result;
    });
    return result ?? job;
  };

  /// Submit handle
  const onSubmitHandle = async () => {
    const processJob = await process();
    dispatch(setJob(processJob));
    if (!jobId) dispatch(setJobId(processJob?.id));
    switch (actionType) {
      case EActionType.SaveClose:
        closeDialog();
        break;
      case EActionType.SaveNew:
        formik.resetForm();
        dispatch(setJob(null));
        break;
    }
  };

  /// Formik
  const initialValues: Job = {
    unit: undefined,
    sub_type_id: 1,
    priority_id: EJobPriorites.Highest,
    job_technicians: [],
    description: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: onSubmitHandle,
    validationSchema: jobValidaotr,
  });

  /// Create job hook
  const createJob = useJobCreate(formik);

  /// Job technician hook
  const {
    addedTechnicians,
    deletedTechnicians,
    updatedTechnicians,
    anyUpdate,
  } = useJobUpdate(job, formik);

  return (
    <>
      <DialogCustomTitle title={title} />
      <VisibilityComp visibility={anyUpdate && isEdit}>
        <Box pl={1} m={0} sx={{ backgroundColor: Colors.warning }}>
          <Typography
            fontSize={13}
            color="white"
            children="Please click save to save changes"
          />
        </Box>
      </VisibilityComp>
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
                panel: <JobStepper job={job} />,
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
