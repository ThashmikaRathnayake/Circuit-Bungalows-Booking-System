import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import InfoPage from "./components/InfoPage";
import BookingPage from "./pages/BookingPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
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
      } ]
  }
  
  
]);

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
