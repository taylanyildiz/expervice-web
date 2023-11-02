import { RootState, store } from "@Store/index";
import { setJobId } from "@Store/job_store";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { useSelector } from "react-redux";
import JobDialog from "../dialogs/JobDialog";
import SelectUnitDialog from "../dialogs/SelectUnitDialog";
import Unit from "@Models/units/unit";
import Job from "@Models/job/job";
import { EJobStatuses } from "../entities/job_enums";
import { useEffect, useState } from "react";
import { FormikProps } from "formik";
import JobProcess from "../entities/job_process";
import { FormProps } from "react-router-dom";

/**
 * Job Store
 */
export function useJob() {
  return useSelector((state: RootState) => state.job);
}

/**
 * Job dialog hook
 */
export function useJobDialog() {
  const { openDialog, closeDialog } = useDialog();

  return {
    openDialog: (props?: { id?: number; unit?: Unit | null }) => {
      if (props?.id) store.dispatch(setJobId(props?.id));
      openDialog(<JobDialog unit={props?.unit} />, "md");
    },
    openUnitDialog: () => {
      openDialog(<SelectUnitDialog />, "xs");
    },
    closeDialog,
  };
}

/// Create Job hook
export function useJobCreate(formik: FormikProps<Job>) {
  const [job, setJob] = useState<JobProcess | null>(null);

  useEffect(() => {
    const value = formik.values;
    const job: JobProcess = {
      description: value?.description,
      priority_id: value?.priority_id,
      sub_type_id: value?.sub_type_id,
      technicians: value.job_technicians?.map((e) => e.technician_user?.id),
      unit_id: value.unit?.id,
    };
    setJob(job);
  }, [formik.values]);
  return job;
}

/**
 * Job helper
 * @param job
 * @returns
 */
export function useJobHelper(job: Job | null | undefined) {
  const [editableJob, setEditableJob] = useState<boolean>(false);

  const doneCanceled = [
    EJobStatuses.FaultDone,
    EJobStatuses.FaultCanceled,
    EJobStatuses.MaintenanceDone,
    EJobStatuses.MaintenanceCanceled,
  ];

  useEffect(() => {
    if (!job) setEditableJob(true);
    const jobStatus = job?.status_id;
    setEditableJob(!doneCanceled.includes(jobStatus!));
  }, [job?.status_id]);

  return { editableJob };
}

export function useJobTechnician(
  job: Job | null | undefined,
  formik: FormikProps<Job>
) {
  const [addedTechnicians, setAddedTechnicians] = useState<
    { technician_id?: number; role_id?: number }[]
  >([]);
  const [deletedTechnicians, setDeletedTechnicians] = useState<number[]>([]);
  const [updatedTechnicians, setUpdatedTechnicians] = useState<
    {
      technician_id?: number;
      role_id?: number;
    }[]
  >([]);

  useEffect(() => {
    if (!job?.id) return;

    const onAddedTechnicians = () => {
      const addedJobTechnicians = formik.values.job_technicians.filter(
        (e) => !e.id
      );
      setAddedTechnicians(
        addedJobTechnicians.map((e) => ({
          technician_id: e.technician_user?.id,
          role_id: e.role_id!,
        }))
      );
    };

    const onDeletedTechnicians = () => {
      const jobTechnicians = job.job_technicians;
      const allJobTechnicians = formik.values.job_technicians;
      const technicians = jobTechnicians.filter(
        (e1) => !allJobTechnicians.some((e2) => e2.id && e1.id === e2.id)
      );
      setDeletedTechnicians(technicians.map((e) => e.technician_user_id!));
    };

    const onUpdatedTechnicians = () => {
      const jobTechnicians = job.job_technicians;
      const allJobTechnicians = formik.values.job_technicians;
      const technicians = allJobTechnicians.filter(
        (e1) =>
          e1.id &&
          jobTechnicians.some(
            (e2) => e1.id === e2.id && e2.role_id !== e1.role_id
          )
      );
      setUpdatedTechnicians(
        technicians.map((e) => ({
          technician_id: e.technician_user_id,
          role_id: e.role_id,
        }))
      );
    };

    onAddedTechnicians();
    onDeletedTechnicians();
    onUpdatedTechnicians();
  }, [formik.values, job]);

  return {
    addedTechnicians,
    updatedTechnicians,
    deletedTechnicians,
  };
}
