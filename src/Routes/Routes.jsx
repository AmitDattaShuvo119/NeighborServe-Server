import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Dashboard from "../Component/Dashboard/Dashboard";
import UserDashboard from "../Component/UserDashboard/UserDashboard";
import AdminDashboard from "../Component/AdminDashboard/AdminDashboard";
import ProviderDashboard from "../Component/ProviderDashboard/ProviderDashboard";
import Browse_service from "../Browse_service";
import Service_Result from "../Service_Result";
import Provider_Profile from "../Provider_Profile";
import Appointment from "../Component/Appointment";
import AppointmentDetails from "../Component/AppointmentDetails";
import Testing from "../Testing";
import Testing2 from "../Testing2";
import Testing3 from "../Testing3";
import TypeProvider from "../Component/TypeProvider/TypeProvider";
import ProviderDetails from "../Component/ProviderDetails/ProviderDetails";
import ProviderAccountDetails from "../Component/ProviderAccountDetails/ProviderAccountDetails";
import Login from "../Component/Login/Login";
import Registration from "../Component/Registration/Registration";
import ProviderLogin from "../Component/Login/ProviderLogin";
import AdminManageuser from "../Component/AdminDashboard/AdminManageuser";
import Adminmanageprovider from "../Component/AdminDashboard/Adminmanageprovider";
import AdminVerifyProvider from "../Component/AdminDashboard/AdminVerifyProvider";
import ReqAppointment from "../Component/ReqAppointment";
import UserProfile from "../UserProfile";
import Testing4 from "../Testing4";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "testing",
    element: <Testing />,
  },
  {
    path: "testing2",
    element: <Testing2 />,
  },
  {
    path: "testing3",
    element: <Testing3 />,
  },
  {
    path: "testing4",
    element: <Testing4 />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user_profile/:userId",
    element: <UserProfile/>,
  },

  {
    path: "browse_service",
    element: <Browse_service></Browse_service>,
  },
  
  {
    path: "search_result/:searchString",
    element: <Service_Result></Service_Result>,
  },
  {
    path: "provider_profile/:searchString",
    element: <Provider_Profile />,
  },

  {
    path: "view_appointment/:searchString",
    element: <Appointment />,
  },
  {
    path: "appointment_details/:searchString/:appointmentId", // Include searchString and appointmentId
    element: <AppointmentDetails />,
  },
  {
    path: "view_request/:searchString",
    element: <ReqAppointment />,
  },
  {
    path: "/reg",
    element: <Registration />,
  },
  {
    path: "/service",
    element: <ProviderLogin></ProviderLogin>,
  },
  {
    path: "/users/provider/:type",
    element: <TypeProvider></TypeProvider>,
    loader: ({ params }) =>
      fetch(`http://localhost:5000/users/provider/${params.type}`),
  },
  {
    path: "/users/provider/details/:id",
    element: <ProviderAccountDetails></ProviderAccountDetails>,
    loader: ({ params }) =>
      fetch(`http://localhost:5000/users/provider/details/${params.id}`),
  },

  {
      path : 'dashboard',
      element : <Dashboard></Dashboard>,
      children : [

         {
          path : 'userdashboard',
          element: <UserDashboard></UserDashboard>
         },
         {
           path : 'admindashboard',
           element : <AdminDashboard></AdminDashboard>
         },
        {
          path: 'providerdashboard',
          element : <ProviderDashboard></ProviderDashboard>
        },
        {
           path : 'adminmanageuser',
           element : <AdminManageuser></AdminManageuser>
        },
        {
           path : 'adminmanageprovider',
           element : <Adminmanageprovider></Adminmanageprovider>
        },
        
        {
           path : 'adminverifyprovider',
           element : <AdminVerifyProvider></AdminVerifyProvider>
        }
      ]
  }
]);
