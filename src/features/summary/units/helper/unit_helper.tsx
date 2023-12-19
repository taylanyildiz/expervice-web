import { useDialog } from "@Utils/hooks/dialog_hook";
import UnitDialog from "../dialogs/UnitDialog";
import { useSelector } from "react-redux";
import { RootState, store } from "@Store/index";
import { useEffect, useState } from "react";
import UnitProcess from "../entities/unit_process";
import { FormikProps } from "formik";
import Unit from "@Models/units/unit";
import { UnitUpdate } from "../entities/unit_update";
import { equalInterface } from "@Utils/functions";
import { setUnitId } from "@Store/unit_store";
import Customer from "@Models/customer/customer";
import AssignCustomerDialog from "../dialogs/AssignCustomerDialog";
import { EUnitFilterType } from "../entities/unit_enums";
import { ECustomDate } from "@Models/enums";

/**
 * Unit store
 */
export function useUnit() {
  const store = useSelector((state: RootState) => state.unit);
  const { filter } = store;
  const [filterCount, setCount] = useState<number>(0);
  useEffect(() => {
    let count = 0;
    if (filter?.filter_type !== EUnitFilterType.Name) ++count;
    if (filter?.keyword && filter?.keyword?.length !== 0) ++count;
    if (filter?.region_ids && filter?.region_ids?.length !== 0) ++count;
    if (filter?.unit_labels && filter?.unit_labels?.length !== 0) ++count;
    if (filter?.unit_sub_types && filter?.unit_sub_types?.length !== 0) ++count;
    if (filter?.unit_types && filter?.unit_types?.length !== 0) ++count;
    if (filter?.dateType !== ECustomDate.All) ++count;
    setCount(count);
  }, [filter]);

  return { ...store, filterCount };
}

/**
 * Open unit dialog
 */
export function useUnitDialog() {
  const { openDialog, closeDialog } = useDialog();
  const { unitDialogStatus } = useUnit();
  return {
    openUnitDialog: (id?: number, option?: { customer?: Customer | null }) => {
      if (unitDialogStatus) return;
      if (id) store.dispatch(setUnitId(id));
      openDialog(<UnitDialog customerUser={option?.customer} />, "md");
    },
    openAssignCustomerDialog: () => openDialog(<AssignCustomerDialog />, "xs"),
    closeDialog,
  };
}

/**
 * Create Unit hook
 */
export function useUnitCreate(
  formik: FormikProps<Unit & { status_handle?: boolean }>
) {
  const [unit, setUnit] = useState<UnitProcess | null>(null);

  useEffect(() => {
    const values = { ...formik.values };
    const unit: UnitProcess = {
      customer_id: values?.customer?.id,
      unit_label_id: values?.unit_label?.id,
      unit_sub_type_id: values?.unit_sub_type?.id,
      name: values?.name,
      identitiy_number: values?.identity_number,
      imei: values?.identity_number,
      qr_code: values?.qr_code,
      contract_start_date: values?.contract_start_date,
      contract_end_date: values?.contract_end_date,
      country_id: values?.country?.id,
      state_id: values?.state?.id,
      city_id: values?.city?.id,
      street_address: values?.street_address,
      latitude: values?.latitude,
      longitude: values?.longitude,
      status: values.status_handle,
    };
    setUnit(unit);
  }, [formik.values]);
  return unit;
}

/**
 * Unit Update hook
 */
export function useUnitUpdate(
  unit: Unit | null,
  formik: FormikProps<Unit & { status_handle?: boolean }>
) {
  const [info, setInfo] = useState<UnitUpdate | null>(null);
  const [customer, setCustomer] = useState<number | null>(null);
  const [status, setStatus] = useState<boolean | null>(null);
  const [anyUpdate, setAnyUpdate] = useState<boolean>(false);

  useEffect(() => {
    const value = { ...formik.values };
    setInfo(null);
    setCustomer(null);
    setAnyUpdate(false);
    setStatus(false);

    const newInfo: UnitUpdate = {
      id: value?.id,
      name: value?.name,
      identitiy_number: value?.identity_number,
      imei: value.imei,
      unit_label_id: value.unit_label?.id,
      unit_sub_type_id: value.unit_sub_type?.id,
      contract_end_date: value.contract_end_date,
      contract_start_date: value.contract_start_date,
      qr_code: value.qr_code,
      country_id: value.country?.id,
      city_id: value.city?.id,
      state_id: value.state?.id,
      latitude: value.latitude,
      longitude: value.longitude,
      street_address: value.street_address,
    };

    const oldInfo: UnitUpdate = {
      id: unit?.id,
      name: unit?.name,
      identitiy_number: unit?.identity_number,
      imei: unit?.imei,
      unit_label_id: unit?.unit_label?.id,
      unit_sub_type_id: unit?.unit_sub_type?.id,
      contract_end_date: unit?.contract_end_date,
      contract_start_date: unit?.contract_start_date,
      qr_code: unit?.qr_code,
      country_id: unit?.country?.id,
      city_id: unit?.city?.id,
      state_id: unit?.state?.id,
      latitude: unit?.latitude,
      longitude: unit?.longitude,
      street_address: unit?.street_address,
    };

    const availableInfo = !equalInterface(newInfo, oldInfo);
    if (availableInfo) {
      setInfo(newInfo);
    }

    const availableCustomer = value.customer?.id !== unit?.customer?.id;
    if (availableCustomer) {
      setCustomer(value.customer?.id!);
    }

    const availableStatus = value?.status_handle !== unit?.status;
    if (availableStatus) {
      setStatus(true);
    }

    const availableUpdate =
      availableInfo || availableCustomer || availableStatus;
    setAnyUpdate(Boolean(availableUpdate && unit));
  }, [formik.values, unit]);

  return { info, customer, status, anyUpdate };
}
