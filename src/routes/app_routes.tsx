import RegisterActivationPage from "@Features/activations/register-activaton";
import ForgotPasswordPage from "@Features/auth/forgot-password";
import LoginPage from "@Features/auth/login";
import RegisterPage from "@Features/auth/register";
import CommonPage from "@Features/common/base";
import ContactPage from "@Features/common/contact";
import CommonLayout from "@Features/common/layout";
import PricingPage from "@Features/common/pricing";
import SummaryPage from "@Features/summary/base";
import FormsPage from "@Features/summary/forms";
import JobsPage from "@Features/summary/jobs";
import SummaryLayout from "@Features/summary/layout";
import UnitsPage from "@Features/summary/units";
import { UnitsMapPage, UnitsTablePage } from "@Features/summary/units/pages";
import CustomerUsersPage from "@Features/summary/users/customer-users";
import InternalUsersPage from "@Features/summary/users/internal-users";
import TechnicianUsersPage from "@Features/summary/users/technician-users";
import {
  Navigate,
  Outlet,
  RouteObject,
  createBrowserRouter,
} from "react-router-dom";
import ERouter from "./router_enum";
import UserActivation from "@Features/activations/user-activation";

/// Router Options
const options = {
  basename: "/",
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      {
        index: true,
        element: <CommonPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "pricing",
        element: <PricingPage />,
      },
      {
        path: "product",
        element: <p>Product Page</p>,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/activation",
    element: <RegisterActivationPage />,
  },
  {
    path: "/user",
    element: <UserActivation />,
  },
  {
    path: "/",
    element: <SummaryLayout />,
    children: [
      {
        path: "summary",
        element: <SummaryPage />,
      },
      {
        path: "units",
        element: <UnitsPage />,
        children: [
          {
            index: true,
            element: <UnitsTablePage />,
          },
          {
            path: "map",
            element: <UnitsMapPage />,
          },
        ],
      },
      {
        path: "forms",
        element: <FormsPage />,
      },
      {
        path: "jobs",
        element: <JobsPage />,
      },
      {
        path: "users",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Navigate to={ERouter.InternalUsers} />,
          },
          {
            path: "internal-users",
            element: <InternalUsersPage />,
          },
          {
            path: "customer-users",
            element: <CustomerUsersPage />,
          },
          {
            path: "technician-users",
            element: <TechnicianUsersPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <p>Page Not Found</p>,
  },
];

/// Application Rotuer
const router = createBrowserRouter(routes, options);

export default router;
