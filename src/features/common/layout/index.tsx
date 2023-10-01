import { Outlet } from "react-router-dom";
import CommonAppBar from "./components/CommonAppBar";
import CommonFooter from "./components/CommonFooter";
import { useRef } from "react";

function CommonLayout() {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className="common-page">
      <CommonAppBar />
      <div ref={ref} style={{ flex: 1 }} children={<Outlet />} />
      <CommonFooter scrollRef={ref} />
    </div>
  );
}

export default CommonLayout;
