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

const RootRedirect = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  if (!token) return <Navigate to="/login" replace />;
  if (role === "admin") return <Navigate to="/admin" replace />;
  return <Navigate to="/home" replace />; 
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
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
  element: <ProtectedRoute allowedRoles={['user', 'admin']} />,
  children: [
    { path: "/infoPage", element: <InfoPage /> },
    { path: "/booking/:circuit", element: <BookingPage /> }
  ]
}
,
  
  {
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        path: "/admin",
        element: <AdminDashboard/>
      },
      {
        path: "/admin/booking/:id",   
        element: <BookingDetails />
      }
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
