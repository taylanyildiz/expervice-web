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
import CustomerFormDialog from "../dialogs/CustomerFormDialog";

/**
 * Customer user store hook
 */
export function useCustomer() {
  return useSelector((state: RootState) => state.customer);
}

/**
 * Customer create hook
 */
export function useCustomerCreate(formik: FormikProps<Customer>) {
  const [customer, setCustomer] = useState<CustomerProcess | null>(null);
  useEffect(() => {
    const values = { ...formik.values };
    const customer: CustomerProcess = {
      group_id: values.group?.id,
      display_name: values.display_name,
      is_active: values.is_active!,
      cell_phone: values.cell_phone,
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      phone: values.phone,
      country_id: values.country?.id,
      state_id: values.state?.id,
      city_id: values.city?.id,
      street_address: values.street_address,
      zip_code: values.zip_code,
      send_invite: values.status === ECustomerStatus.Invited,
    };
    setCustomer(customer);
  }, [formik.values]);

  return customer;
}

/**
 * Customer update hook
 */
export function useCustomerUpdate(
  user: Customer | null,
  formik: FormikProps<Customer>
) {
  const [info, setInfo] = useState<CustomerUpdate | null>(null);
  const [group, setGroup] = useState<number | null | undefined>(null);
  const [activate, setActivate] = useState<boolean | null>(null);
  const [status, setStatus] = useState<ECustomerStatus | null>(null);
  const [anyUpdate, setAnyUpdate] = useState<boolean>(false);

  useEffect(() => {
    const value = { ...formik.values };
    setInfo(null);
    setGroup(null);
    setStatus(null);
    setActivate(null);
    setAnyUpdate(false);

    const newInfo: CustomerUpdate = {
      id: user?.id,
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
    const oldInfo: CustomerUpdate = {
      id: user?.id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      display_name: user?.display_name,
      cell_phone: user?.cell_phone,
      phone: user?.phone,
      email: user?.email,
      city_id: user?.city?.id,
      state_id: user?.state?.id,
      country_id: user?.country?.id,
      zip_code: user?.zip_code,
      street_address: user?.street_address,
    };

    const availableInfo = !equalInterface(newInfo, oldInfo);
    if (availableInfo) {
      setInfo(newInfo);
    }

    const availableGroup = value.group?.id !== user?.group?.id;
    if (availableGroup) {
      setGroup(value.group?.id);
    }

    const availableActivate = value.is_active !== user?.is_active;
    if (availableActivate) {
      setActivate(value.is_active!);
    }
    const availableStatus = value.status !== user?.status;
    if (availableStatus) {
      const available = [ECustomerStatus.Invited, ECustomerStatus.ReSend];
      if (available.includes(value.status!)) {
        setStatus(value.status!);
      }
    }
    const available =
      availableStatus || availableActivate || availableGroup || availableInfo;
    const anyUpdate = Boolean(user && available);
    setAnyUpdate(anyUpdate);
  }, [user, formik.values]);

  return { info, group, status, activate, anyUpdate };
}

/**
 * Open customer dialog
 */
export function useCustomerDialog() {
  const { openDialog } = useDialog();

  return {
    openCustomerDialog: async (
      customer?: Customer
    ): Promise<Customer | null> => {
      store.dispatch(setCustomer(customer));
      return new Promise((resolve) => {
        openDialog(
          <CustomerDialog onDone={(customer) => resolve(customer)} />,
          "md"
        );
      });
    },
    openCustomerFormDialog: async (
      onDone: (form: any) => Promise<boolean>
    ): Promise<boolean> => {
      return await new Promise((resolve) => {
        openDialog(
          <CustomerFormDialog
            onDone={async (form) => {
              const result = await onDone(form);
              resolve(result);
              return result;
            }}
          />,
          "xs"
        );
      });
    },
  };
}
