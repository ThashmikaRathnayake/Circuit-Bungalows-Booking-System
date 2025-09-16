import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import InfoPage from "./components/InfoPage";
import BookingPage from "./pages/BookingPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import BookingForm from "./pages/BookingForm";
import BookingDetails from "./components/BookingDetails";

const router = createBrowserRouter([
  {
    path: "/",
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
    element: <ProtectedRoute allowedRoles={['user']} />,
    children: [
      {
    path: "/infoPage",
    element: <InfoPage />
  },
  {
    path: "/booking/:circuit", 
    element: <BookingPage />
  } ]
  },
  
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
