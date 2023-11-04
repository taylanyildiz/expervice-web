import { Navigate, Outlet } from "react-router-dom";
import CommonAppBar from "./components/CommonAppBar";
import CommonFooter from "./components/CommonFooter";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@Store/index";
import ERouter from "@Routes/router_enum";

function CommonLayout() {
  /// Ref of scroll
  const ref = useRef<HTMLDivElement | null>(null);

  /// Account store
  const { user } = useSelector((state: RootState) => state.account);

  /// Redirect to summary
  if (user) return <Navigate to={ERouter.Summary} />;

  return (
    <div className="common-page">
      <CommonAppBar />
      <div ref={ref} style={{ flex: 1 }} children={<Outlet />} />
      <CommonFooter scrollRef={ref} />
    </div>
  );
}

export default CommonLayout;
