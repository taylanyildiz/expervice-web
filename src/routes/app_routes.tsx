import ForgotPasswordPage from "@Features/auth/forgot-password";
import LoginPage from "@Features/auth/login";
import RegisterPage from "@Features/auth/register";
import CommonBasePage from "@Features/common/base";
import ContactPage from "@Features/common/contact";
import CommonPage from "@Features/common/layout";
import PricingPage from "@Features/common/pricing";
import { RouteObject, createBrowserRouter } from "react-router-dom";

/// Router Options
const options = {
  basename: "/",
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <CommonPage />,
    children: [
      {
        index: true,
        element: <CommonBasePage />,
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
    path: "*",
    element: <p>Page Not Found</p>,
  },
];

/// Application Rotuer
const router = createBrowserRouter(routes, options);

export default router;
