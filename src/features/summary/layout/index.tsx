import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import SummaryAppBar from "./components/SummaryAppBar";
import ERouter from "@Routes/router_enum";
import { AppDispatch, RootState } from "@Store/index";
import { useEffect, useState } from "react";
import { onMessageListener, requestPermission } from "@Utils/firebase";
import UserRepository from "@Repo/user_repository";
import "../../../assets/css/summary.css";
import { MessagePayload } from "firebase/messaging";
import SnackCustomBar from "@Utils/snack_custom_bar";
import { setDeviceToken } from "@Store/account_store";

function SummaryLayout() {
  /// Account store
  const { user, deviceToken } = useSelector(
    (state: RootState) => state.account
  );

  /// Check user
  if (!user) return <Navigate to={ERouter.Login} />;

  /// Last
  const [lastMessage, setLastMessage] = useState<MessagePayload | null>(null);

  /// User repository
  const userRepo = new UserRepository();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Initialize firebase notification
  const initializeNotification = async () => {
    const token = await requestPermission(true);
    if (!token || token == deviceToken) return;
    userRepo.deviceToken(token);
    dispatch(setDeviceToken(token));
  };

  useEffect(() => {
    if (!user) return;
    initializeNotification();
  }, []);

  /// Listen message
  useEffect(() => {
    onMessageListener().then((payload) => {
      setLastMessage(payload);
      console.log(`Payload: ${payload}`);
      SnackCustomBar.notification(payload);
    });
  }, [lastMessage]);

  return (
    <div className="summary">
      <SummaryAppBar />
      <Outlet />
    </div>
  );
}

export default SummaryLayout;
