import React, { Suspense } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LocalCache from "../utils/localStorage";

const Register = React.lazy(() => import("../views/confirm/register"));
const Login = React.lazy(() => import("../views/confirm/login"));
const Main = React.lazy(() => import("../views/main"));
const Home = React.lazy(() => import("../views/home"));
const Profile = React.lazy(() => import("../views/profile"));
const MainContent = React.lazy(() => import("../views/mainContent"));
const PublicWork = React.lazy(() => import("../views/publicWork"));

const PublicVideo = React.lazy(() => import("../views/publicVideo"));

const Explore = React.lazy(() => import("../views/explore"));
const Photographer = React.lazy(() => import("../views/photographer"));
const Rank = React.lazy(() => import("../views/rank"));
const Test = React.lazy(() => import("../views/test"));

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/mainContent",
    element: (
      <Suspense fallback={<div>稍等</div>}>
        <MainContent />
      </Suspense>
    ),
    children: [
      {
        path: "/mainContent",
        element: <Navigate to="/mainContent/home" />,
      },
      {
        path: "/mainContent/Photographer",
        element: (
          <Suspense fallback={<div>稍等</div>}>
            <Photographer />
          </Suspense>
        ),
      },
      {
        path: "/mainContent/home",
        element: (
          <Suspense fallback={<div>稍等</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/mainContent/profile/:id",
        exact: true,
        element: (
          <Suspense fallback={<div>稍等</div>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/mainContent/publicWork",
        element: (
          <Suspense fallback={<div>稍等</div>}>
            <PublicWork />
          </Suspense>
        ),
      },
      {
        path: "/mainContent/publicVideo",
        element: (
          <Suspense fallback={<div>稍等</div>}>
            <PublicVideo />
          </Suspense>
        ),
      },
      {
        path: "/mainContent/explore",
        element: (
          <Suspense fallback={<div>稍等</div>}>
            <Explore />
          </Suspense>
        ),
      },
      {
        path: "/mainContent/rank",
        element: (
          <Suspense fallback={<div>稍等</div>}>
            <Rank />
          </Suspense>
        ),
      },
      {
        path: "/mainContent/test",
        element: (
          <Suspense fallback={<div>稍等</div>}>
            <Test />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<div>稍等</div>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>稍等</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/main",
    element: (
      <Suspense fallback={<div>稍等</div>}>
        <Main />
      </Suspense>
    ),
  },
];

export default routes;
