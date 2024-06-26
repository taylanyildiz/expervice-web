import { DialogCustomTitle } from "@Components/dialogs";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { useEffect, useState } from "react";
import {
  useCustomer,
  useCustomerCreate,
  useCustomerUpdate,
} from "../helpers/customer_user_helper";
import CustomerDialogAction from "./CustomerDialogAction";
import Customer, { defaultCustomer } from "@Models/customer/customer";
import { setCustomer } from "@Store/customer_user_store";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { Box, DialogContent } from "@mui/material";
import { useFormik } from "formik";
import CustomerContactInformation from "./CustomerContactInformation";
import TabBar from "@Components/TabBar";
import CustomerSecurity from "./CustomerSecurity";
import { customerValidator } from "../validator/customer_validator";
import CustomerUserRepository from "@Repo/customer_user_repository";
import CustomerForms from "./CustomerForms";
import CustomerUnits from "./CustomerUnits";
import TranslateHelper from "@Local/index";
import AnyUpdateBox from "@Components/AnyUpdateBox";

function CustomerDialog(props: { onDone?: (customer: Customer) => void }) {
  const { onDone } = props;

  /// Customer hook
  const { customer } = useCustomer();
  const isEdit = Boolean(customer);

  /// Dialog title
  const title = isEdit
    ? TranslateHelper.customerUserEdit()
    : TranslateHelper.customerUserCreate();

  /// Customer repository
  const customerRepo = new CustomerUserRepository();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Action type state
  const [actionType, setActionType] = useState<number | null>(null);

  /// Dialog hook
  const { closeDialog, openLoading, openConfirm } = useDialog();

  /// Initialize component
  useEffect(() => {
    if (!customer) return;
    for (let [k, v] of Object.entries(customer)) {
      formik.setFieldValue(k, v);
    }
  }, [customer]);

  /// Destroy component
  useEffect(() => {
    return () => {
      dispatch(setCustomer(null));
      customerRepo.getCustomers();
    };
  }, []);

  /// Process
  const process = async (): Promise<Customer | null> => {
    const result = await openLoading(async () => {
      let result: Customer | null = null;
      if (!isEdit) result = await customerRepo.createCustomer(customerProcess!);
      else {
        if (info) {
          result = await customerRepo.updateCustomer(info);
          dispatch(setCustomer(result));
        }
        if (group) {
          result = await customerRepo.updateCustomerGroup(group);
        }
        if (activate !== null) {
          result = await customerRepo.updateCustomeStatus(activate);
        }
        if (status) {
          result = await customerRepo.sendInvite();
        }
      }
      return result;
    });
    return result ?? customer;
  };

  /// Submit handle
  const onSubmitHandle = async () => {
    const result = await process();
    if (!result) return;
    switch (actionType) {
      case EActionType.Save:
        dispatch(setCustomer(result));
        break;
      case EActionType.SaveClose:
        closeDialog();
        onDone?.(result);
        break;
      case EActionType.SaveNew:
        formik.resetForm();
        dispatch(setCustomer(null));
        break;
    }
  };

  /// formik
  const initialValues: Customer = defaultCustomer;
  const formik = useFormik({
    initialValues,
    validationSchema: customerValidator,
    onSubmit: onSubmitHandle,
  });

  /// Customer create hook
  const customerProcess = useCustomerCreate(formik);

  /// Customer update hook
  const { info, group, activate, status, anyUpdate } = useCustomerUpdate(
    customer,
    formik
  );

  /// Changed action handle
  const onChangedAction = async (type: EActionType) => {
    if (type === EActionType.Delete) {
      const confirm = await openConfirm(
        TranslateHelper.deleteCustomerUser(),
        TranslateHelper.sureDeleteCustomerUser()
      );
      if (confirm) {
        const result = await openLoading(async () => {
          return customerRepo.deleteCustomer();
        });
        if (result) closeDialog();
      }
      return;
    }
    setActionType(type);
    formik.handleSubmit();
  };

  return (
    <>
      <DialogCustomTitle title={title} />
      <AnyUpdateBox anyUpdate={anyUpdate} />
      <DialogContent>
        <Box mt={2}>
          <TabBar
            tabs={[
              {
                title: TranslateHelper.contactInformation(),
                panel: <CustomerContactInformation formik={formik} />,
              },
              {
                title: TranslateHelper.securityLogin(),
                panel: <CustomerSecurity formik={formik} />,
              },
              {
                visibility: isEdit,
                title: TranslateHelper.forms(),
                panel: <CustomerForms />,
              },
              {
                visibility: isEdit,
                title: TranslateHelper.units(),
                panel: <CustomerUnits />,
              },
            ]}
          />
        </Box>
      </DialogContent>
      <CustomerDialogAction onChanged={onChangedAction} />
    </>
  );
}

export default CustomerDialog;
