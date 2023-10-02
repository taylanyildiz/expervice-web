import RegisterActivationPage from "@Features/activations/register-activation";
import ForgotPasswordPage from "@Features/auth/forgot-password";
import LoginPage from "@Features/auth/login";
import RegisterPage from "@Features/auth/register";
import CommonPage from "@Features/common/base";
import ContactPage from "@Features/common/contact";
import CommonLayout from "@Features/common/layout";
import PricingPage from "@Features/common/pricing";
import SummaryPage from "@Features/summary/base";
import FormsPage from "@Features/summary/forms";
import JobsPage from "@Features/summary/jobs/indes";
import SummaryLayout from "@Features/summary/layout";
import UnitsPage from "@Features/summary/units";
import { RouteObject, createBrowserRouter } from "react-router-dom";

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
    path: "/summary",
    element: <SummaryLayout />,
    children: [
      {
        index: true,
        element: <SummaryPage />,
      },
      {
        path: "units",
        element: <UnitsPage />,
      },
      {
        path: "forms",
        element: <FormsPage />,
      },
      {
        path: "jobs",
        element: <JobsPage />,
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
