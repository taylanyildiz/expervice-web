import { useSelector } from "react-redux";
import "../../../assets/css/summary.css";
import { Navigate, Outlet } from "react-router-dom";
import SummaryAppBar from "./components/SummaryAppBar";
import ERouter from "@Routes/router_enum";
import { RootState } from "@Store/index";
import { useEffect } from "react";
import { onMessageListener, requestPermission } from "@Utils/firebase";
import UserRepository from "@Repo/user_repository";

function SummaryLayout() {
  /// Account store
  const { user } = useSelector((state: RootState) => state.account);

  /// User repository
  const userRepo = new UserRepository();

  /// Initialize firebase notification
  const initializeNotification = async () => {
    const token = await requestPermission();
    if (!token) return;
    console.log(token);
    userRepo.deviceToken(token);
    onMessageListener().then((payload) => {
      console.log(payload);
    });
  };

  useEffect(() => {
    if (!user) return;
    initializeNotification();
  }, []);

  /// Check user
  if (!user) return <Navigate to={ERouter.Login} />;

  return (
    <div className="summary">
      <SummaryAppBar />
      <Outlet />
    </div>
  );
}

export default SummaryLayout;
