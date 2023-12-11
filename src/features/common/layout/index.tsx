import { Navigate, Outlet } from "react-router-dom";
import CommonAppBar from "./components/CommonAppBar";
import CommonFooter from "./components/CommonFooter";
import { useRef } from "react";
import ERouter from "@Routes/router_enum";
import SummaryDrawer from "./components/SummaryDrawer";
import { useAccount } from "@Features/summary/company/helper/company_helper";

function CommonLayout() {
  /// Ref of scroll
  const ref = useRef<HTMLDivElement | null>(null);

  /// Account store
  const { user } = useAccount();

  /// Redirect to summary
  if (user) return <Navigate to={ERouter.Summary} />;

  return (
    <div className="common-page">
      <CommonAppBar />
      <div ref={ref} style={{ flex: 1 }} children={<Outlet />} />
      <CommonFooter scrollRef={ref} />
      <SummaryDrawer />
    </div>
  );
}

export default CommonLayout;
