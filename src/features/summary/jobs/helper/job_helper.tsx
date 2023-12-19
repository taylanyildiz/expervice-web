import { RootState, store } from "@Store/index";
import { setJobId } from "@Store/job_store";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { useSelector } from "react-redux";
import JobDialog from "../dialogs/JobDialog";
import SelectUnitDialog from "../dialogs/SelectUnitDialog";
import Unit from "@Models/units/unit";
import Job from "@Models/job/job";
import {
  EJobFilterType,
  EJobStatuses,
  EJobSubType,
} from "../entities/job_enums";
import { useEffect, useState } from "react";
import { FormikProps } from "formik";
import JobProcess from "../entities/job_process";
import JobImageDialog from "../dialogs/JobImageDialog";
import JobImage from "@Models/job/job_image";
import JobForm from "@Models/job/job_form";
import JobFormDialog from "../dialogs/JobFormDialog";
import { ECustomDate } from "@Models/enums";

/**
 * Job Store
 */
export function useJob() {
  const store = useSelector((state: RootState) => state.job);
  const filter = store.jobFilter;
  const [filterCount, setFilterCount] = useState<number>(0);
  useEffect(() => {
    let count = 0;
    if (filter.filter_type && filter.filter_type !== EJobFilterType.UnitName)
      ++count;
    if (filter.keyword && filter.keyword.length !== 0) ++count;
    if (filter.type_ids && filter.type_ids.length !== 0) ++count;
    if (filter.sub_type_ids && filter.sub_type_ids.length !== 0) ++count;
    if (filter.statuses && filter.statuses.length !== 0) ++count;
    if (filter.priorities && filter.priorities.length !== 0) ++count;
    if (filter.region_ids && filter.region_ids.length !== 0) ++count;
    if (filter.groups && filter.groups.length !== 0) ++count;
    if (filter.dateType && filter.dateType !== ECustomDate.All) ++count;
    setFilterCount(count);
  }, [filter]);
  return { ...store, filterCount };
}

/**
 * Job dialog hook
 */
export function useJobDialog() {
  const { openDialog, closeDialog } = useDialog();
  const { jobDialogStatus } = useJob();

  return {
    openJobDialog: (props?: { id?: number; unit?: Unit | null }) => {
      if (jobDialogStatus) return;
      if (props?.id) store.dispatch(setJobId(props?.id));
      openDialog(<JobDialog unit={props?.unit} />, "md");
    },
    openUnitDialog: () => {
      openDialog(<SelectUnitDialog />, "xs");
    },
    openJobImagesDialog: (images: JobImage[]) => {
      openDialog(<JobImageDialog images={images} />, "xs");
    },
    openJobFormDialog: (form: JobForm) => {
      openDialog(<JobFormDialog form={form} />, "lg");
    },
    closeDialog,
  };
}

/**
 * Create Job hook
 */
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
  const [availableStatus, setAvailableStatus] = useState<boolean>(false);
  const [isFault, setIsFault] = useState<boolean>(false);

  const doneCanceled = [
    EJobStatuses.FaultDone,
    EJobStatuses.FaultCanceled,
    EJobStatuses.MaintenanceDone,
    EJobStatuses.MaintenanceCanceled,
  ];

  useEffect(() => {
    setAvailableStatus(true);
    setIsFault(false);
    if (!job) return;
    const jobStatus = job?.status_id;
    setAvailableStatus(!doneCanceled.includes(jobStatus!));
    setIsFault(job.sub_type_id === EJobSubType.Fault);
  }, [job?.status_id]);

  return { availableStatus, isFault };
}

/**
 * Job Technicians hook
 * @returns
 */
export function useJobUpdate(
  job: Job | null | undefined,
  formik: FormikProps<Job>
) {
  const [anyUpdate, setAnyUpdate] = useState<boolean>(false);
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
    setAnyUpdate(false);

    const onAddedTechnicians = () => {
      const technicians = formik.values.job_technicians.filter((e) => !e.id);
      setAnyUpdate((prev) => prev || technicians.length !== 0);
      setAddedTechnicians(
        technicians.map((e) => ({
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
      setAnyUpdate((prev) => prev || technicians.length !== 0);
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
      setAnyUpdate((prev) => prev || technicians.length !== 0);
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
    anyUpdate,
  };
}
