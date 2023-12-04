import LoadingComp from "@Components/LoadingComp";
import { SubscriptionRepository, UserRepository } from "@Repo/index";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "../helper/company_helper";
import CompanySubscriptionOrder from "@Models/company/company_subscription_order";
import { DataGrid } from "@mui/x-data-grid";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import EmptyGrid from "@Components/EmptyGrid";
import SubscriptionInfoBox from "../components/SubscriptionInfoBox";
import VisibilityComp from "@Components/VisibilityComp";
import SubscriptionCancelBox from "../components/SubscriptionCancelBox";

function CompanyBilling() {
  /// User repository
  const userRepo = new UserRepository();

  /// Subscription repository
  const subRepo = new SubscriptionRepository();

  /// User store
  const { subscription } = useUser();
  const isCanceled: boolean = Boolean(subscription?.cancellation_date);

  /// Loading state
  const [loading, setLoading] = useState<boolean>(true);

  /// Order
  const [subOrder, setSubOrder] = useState<CompanySubscriptionOrder | null>(
    null
  );

  /// Paymets list of successed
  const payments = useMemo(() => {
    if (!subOrder) return [];
    return subOrder.orders!.filter((e) => e.paymentAttempts?.length !== 0);
  }, [subOrder]);

  /// Next payment
  const nextPayment = useMemo(() => {
    if (!subOrder) return null;
    const finder = subOrder.orders?.find(
      (e) => e.paymentAttempts?.length === 0
    );
    return finder;
  }, [subOrder]);

  /// Initialize component
  useEffect(() => {
    userRepo.subscribtion().then();
  }, []);

  useEffect(() => {
    if (!subscription) return;
    subRepo.getSubsOrder().then((value) => {
      setSubOrder(value);
      setLoading(false);
    });
  }, [subscription]);

  return (
    <LoadingComp loading={loading} height={400}>
      <Stack direction="column" spacing={3}>
        <VisibilityComp visibility={isCanceled}>
          <SubscriptionCancelBox />
        </VisibilityComp>
        <SubscriptionInfoBox payment={nextPayment} />
        <Stack>
          <Typography variant="h1" fontSize={15} children="Order History" />
          <Box height={300}>
            <DataGrid
              sx={{ mt: 1 }}
              disableColumnMenu
              disableRowSelectionOnClick
              getRowId={(order) => order.referenceCode ?? ""}
              pageSizeOptions={[10, 50, 100]}
              slots={{ noRowsOverlay: EmptyGrid }}
              columns={[
                {
                  width: 140,
                  field: "status",
                  align: "center",
                  headerAlign: "center",
                  headerName: "Payment Status",
                  valueGetter: (prop) => {
                    return prop.row.paymentAttempts?.[0].paymentStatus;
                  },
                },
                {
                  width: 140,
                  field: "price",
                  align: "center",
                  headerAlign: "center",
                  headerName: "Payment Price",
                  valueGetter: (prop) => {
                    return `₺ ${prop.row.price}`;
                  },
                },
                {
                  flex: 1,
                  field: "date",
                  align: "center",
                  headerAlign: "center",
                  headerName: "Payment Date",
                  valueGetter: (prop) => {
                    const payment = prop.row.paymentAttempts?.[0];
                    return new Date(payment?.createdDate!);
                  },
                },
                {
                  field: "actions",
                  headerName: "",
                  sortable: false,
                  renderCell: (_) => {
                    return (
                      <IconButton sx={{ color: "blue" }}>
                        <LocalPrintshopIcon />
                      </IconButton>
                    );
                  },
                },
              ]}
              rows={payments}
              rowCount={payments.length}
              paginationMode="client"
              sortingMode="client"
            />
          </Box>
        </Stack>
      </Stack>
    </LoadingComp>
  );
}

export default CompanyBilling;
