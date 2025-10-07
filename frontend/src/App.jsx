import React from "react"
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import InfoPage from "./components/InfoPage";
import BookingPage from "./pages/BookingPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import BookingForm from "./pages/BookingForm";
import BookingDetails from "./components/BookingDetails";
import AdminAddLocation from "./pages/AdminAddLocation";
import AdminEditLocation from "./pages/AdminEditLocation";
import AdminBungalowTable from "./pages/BungalowTable";
import LandingPage from "./pages/LandingPage";

const RootRedirect = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  if (!token) return <Navigate to="/landing" replace />;
  if (role === "supervisor" || role === "sdag") return <Navigate to="/admin" replace />;
  return <Navigate to="/home" replace />; 
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/bookingForm",
    element: <BookingForm />,
  },

  //Protected Routes
  {
  element: <ProtectedRoute allowedRoles={['user', 'supervisor', 'sdag']} />,
  children: [
    { path: "/infoPage", element: <InfoPage /> },
    { path: "/booking/:circuit", element: <BookingPage /> }
  ]
  },
  
  {
    element: <ProtectedRoute allowedRoles={['supervisor', 'sdag']} />,
    children: [
      {
        path: "/admin",
        element: <AdminDashboard/>
      },
      {
        path: "/admin/booking/:id",   
        element: <BookingDetails />
      },
      {
        path: "/admin/addLocation",
        element: <AdminAddLocation />,
      },

      {
        path: "/admin/editLocation",
        element: <AdminEditLocation />,
      },

      {
        path: "/admin/bungalowTable",
        element: <AdminBungalowTable />,
      },
    ]
  }
  
  
]);

const App = () => {

  return (
    <>
    <div>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </div>
    </>
  )
}

export default App
