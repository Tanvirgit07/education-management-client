import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Roots from "./Roots/Roots";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AuthProvider from "./AuthProvider/AuthProvider";
import AddClass from "./DashboardPage/AddClass";
import TeachToEduCare from "./Pages/TeachToEduCare";
import AllClasses from "./Pages/AllClasses";
import DashboardRout from "./Layouts/DashboardRout";
import MyEnroll from "./DashboardPage/MyEnroll";
import TeacherRequest from "./DashboardPage/TeacherRequest";
import UserPage from "./DashboardPage/UserPage";
import AllClass from "./DashboardPage/AllClass";
import MyClass from "./DashboardPage/MyClass";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Profile from "./DashboardPage/Profile";
import CardDetails from "./Pages/CardDetails";
import SeeDetails from "./DashboardPage/SeeDetails";
import EnrollDetailsPage from "./Pages/EnrollDetailsPage";
import PrivetRout from "./PrivetRout/PrivetRout";
import Update from "./DashboardPage/Update";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/teach-eduCare",
        element: <PrivetRout><TeachToEduCare></TeachToEduCare></PrivetRout>
      },
      {
        path: "/all-class",
        element: <AllClasses></AllClasses>,
      },
      {
        path : '/card-details/:id',
        element : <PrivetRout><CardDetails></CardDetails></PrivetRout>
      },
      {
        path : '/see-details/:id',
        element : <SeeDetails></SeeDetails>
      },
      {
        path : '/enroll-details/:id',
        element : <EnrollDetailsPage></EnrollDetailsPage>
      },
      
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardRout></DashboardRout>,
    children: [
      {
        path: "my-enroll",
        element: <PrivetRout><MyEnroll></MyEnroll></PrivetRout>
      },
      {
        path: "teacher-request",
        element: <PrivetRout><TeacherRequest></TeacherRequest></PrivetRout>
      },
      {
        path: "user",
        element: <PrivetRout><UserPage></UserPage></PrivetRout>
      },
      {
        path: "all-class",
        element: <PrivetRout><AllClass></AllClass></PrivetRout>
      },
      {
        path: "add-class",
        element: <PrivetRout><AddClass></AddClass></PrivetRout>
      },
      {
        path: "my-class",
        element: <PrivetRout><MyClass></MyClass></PrivetRout>
      },
      {
        path : 'profile',
        element : <PrivetRout><Profile></Profile></PrivetRout>
      },
      {
        path : 'update/:id',
        element : <Update></Update>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
