import { useSelector } from "react-redux";
import "../../../assets/css/summary.css";
import SummarySideBar from "./components/SummarySideBar";
import { Navigate, Outlet } from "react-router-dom";
import SummaryAppBar from "./components/SummaryAppBar";
import ERouter from "@Routes/router_enum";
import { RootState } from "@Store/index";

function SummaryLayout() {
  /// Account store
  const { user } = useSelector((state: RootState) => state.account);

  /// Check user
  if (!user) return <Navigate to={ERouter.Login} />;

  return (
    <div className="summary">
      <SummaryAppBar />
      <div className="summary-layout">
        <SummarySideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default SummaryLayout;
