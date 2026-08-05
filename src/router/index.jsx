import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const Services = lazy(() => import("../pages/Services"));
const RequestQuote = lazy(() => import("../pages/RequestQuote"));

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "services",
          element: <Services />,
        },
        {
          path: "services/request-quote",
          element: <RequestQuote />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
