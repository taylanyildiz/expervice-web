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
  redirect,
} from "react-router-dom";
import ERouter from "./router_enum";
import UserActivation from "@Features/activations/user-activation";
import { useAccount } from "@Features/summary/company/helper/company_helper";
import UserRepository from "@Repo/user_repository";
import FormCustomerSign from "@Features/summary/form-customer-sign";

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
    path: "/user/activation",
    element: <UserActivation />,
  },
  {
    path: "/form/customer-signature",
    element: <FormCustomerSign />,
  },
  {
    path: "/",
    element: <SummaryLayout />,
    children: [
      {
        path: "summary",
        element: <SummaryPage />,
        loader: async () => {
          return await new UserRepository().getUserLanguage();
        },
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
        loader: () => {
          const { isInternal, isOwner } = useAccount();
          if (isInternal || isOwner) return null;
          return redirect(ERouter.Summary);
        },
      },
      {
        path: "jobs",
        element: <JobsPage />,
      },
      {
        path: "users",
        element: <Outlet />,
        loader: () => {
          const { isInternal, isOwner } = useAccount();
          if (isInternal || isOwner) return null;
          return redirect(ERouter.Summary);
        },
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
