import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import ManageUsers from "../pages/DashboardPage/ManageUsers/ManageUsers";
import ManageClasses from "../pages/DashboardPage/ManageClasses/ManageClasses";
import AddClass from "../pages/DashboardPage/AddClass/AddClass";
import MyClasses from "../pages/DashboardPage/MyClasses/MyClasses";
import MySelectedClasses from "../pages/DashboardPage/MySelectedClasses/MySelectedClasses";
import MyEnrolledClasses from "../pages/DashboardPage/MyEnrolledClasses/MyEnrolledClasses";
import PrivateRoute from "./PrivateRoute";
import Instructors from "../pages/Instructors/Instructors";
import ClassesPage from "../pages/ClassesPage/ClassesPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Payment from "../pages/DashboardPage/Payment/Payment";
import Feedback from "../components/Shared/Feedback/Feedback";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
      children: [
        {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/instructors",
        element: <Instructors />
      },
      {
        path: "/classes",
        element: <ClassesPage />
      },
    ]
    },
    {
      path: "/dashboard",
      element: <PrivateRoute><Dashboard /></PrivateRoute>,
      children: [
        {
          path: "manage-users",
          element: <ManageUsers />
        },
        {
          path: "manage-classes",
          element: <ManageClasses />
        },
        {
          path: "add-class",
          element: <AddClass />
        },
        {
          path: "my-classes",
          element: <MyClasses />
        },
        {
          path: "my-selected-classes",
          element: <MySelectedClasses />
        },
        {
          path: "my-enrolled-classes",
          element: <MyEnrolledClasses />
        },
        {
          path: "payment/:id",
          element: <Payment />
        },
        {
          path: "feedback/:id",
          element: <Feedback />
        },
      ]
    }
  ]);