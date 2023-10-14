import Customer from "@Models/customer/customer";
import { setCustomer } from "@Store/customer_user_store";
import { RootState, store } from "@Store/index";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { useSelector } from "react-redux";
import CustomerDialog from "../dialogs/CustomerDialog";
import { useEffect, useState } from "react";
import { FormikProps } from "formik";
import CustomerUpdate from "../entities/customer_update";
import { equalInterface } from "@Utils/functions";
import { ECustomerStatus } from "../entities/customer_enums";

/**
 * Customer user store hook
 */
export function useCustomer() {
  return useSelector((state: RootState) => state.customer);
}

/**
 * Customer process create
 */
export function useCustomerCreate(formik: FormikProps<Customer>) {
  const [customerProcess, setCustomer] = useState<CustomerProcess | null>(null);
  useEffect(() => {
    const customer = { ...formik.values };
    const process: CustomerProcess = {
      group_id: customer.group?.id,
      display_name: customer.display_name,
      is_active: customer.is_active!,
      cell_phone: customer.cell_phone,
      email: customer.email,
      first_name: customer.first_name,
      last_name: customer.last_name,
      phone: customer.phone,
      country_id: customer.country?.id,
      state_id: customer.state?.id,
      city_id: customer.city?.id,
      street_address: customer.street_address,
      zip_code: customer.zip_code,
      send_invite: customer.status === ECustomerStatus.Invited,
    };
    setCustomer(process);
  }, [formik.values]);

  return customerProcess;
}

/**
 * Update customer hook
 * @param customer
 * @param formik
 * @returns
 */
export function useCustomerUpdate(
  customer: Customer | null,
  formik: FormikProps<Customer>
) {
  const [customerUpdate, setCustomer] = useState<CustomerUpdate | null>(null);
  const [updateGroup, setGroup] = useState<number | null | undefined>(null);
  const [updateStatus, setStatus] = useState<boolean | null>(null);
  const [updateInvite, setInvite] = useState<number | null>(null);
  const [anyUpdate, setAnyUpdate] = useState<boolean>(false);

  useEffect(() => {
    const value = { ...formik.values };
    setCustomer(null);
    setGroup(null);
    setStatus(null);
    setInvite(null);
    setAnyUpdate(false);
    const newCustomer: CustomerUpdate = {
      id: customer?.id,
      display_name: value.display_name,
      first_name: value.first_name,
      last_name: value.last_name,
      cell_phone: value.cell_phone,
      phone: value.phone,
      email: value.email,
      city_id: value.city?.id,
      state_id: value.state?.id,
      country_id: value.country?.id,
      zip_code: value.zip_code,
      street_address: value.street_address,
    };
    const oldCustoer: CustomerUpdate = {
      id: customer?.id,
      first_name: customer?.first_name,
      last_name: customer?.last_name,
      display_name: customer?.display_name,
      cell_phone: customer?.cell_phone,
      phone: customer?.phone,
      email: customer?.email,
      city_id: customer?.city?.id,
      state_id: customer?.state?.id,
      country_id: customer?.country?.id,
      zip_code: customer?.zip_code,
      street_address: customer?.street_address,
    };
    const availableInfo = !equalInterface(oldCustoer, newCustomer);
    if (availableInfo) {
      setCustomer(newCustomer);
    }
    const availableGroup = value.group?.id !== customer?.group?.id;
    if (availableGroup) {
      setGroup(value.group?.id);
    }
    const availableActivate = value.is_active !== customer?.is_active;
    if (availableActivate) {
      setStatus(value.is_active!);
    }
    const availableStatus = value.status !== customer?.status;
    if (availableStatus) {
      const available = [ECustomerStatus.Invited, ECustomerStatus.ReSend];
      if (available.includes(value.status!)) {
        setInvite(value.status!);
      }
    }
    const available =
      availableStatus || availableActivate || availableGroup || availableInfo;
    const anyUpdate = Boolean(customer && available);
    setAnyUpdate(anyUpdate);
  }, [customer, formik.values]);
  return { customerUpdate, updateGroup, updateStatus, anyUpdate, updateInvite };
}

/**
 * Open customer dialog
 */
export function useCustomerDialog() {
  const { openDialog } = useDialog();

  return (customer?: Customer) => {
    store.dispatch(setCustomer(customer));
    openDialog(<CustomerDialog />, "md");
  };
}
