import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import InfoPage from "./components/InfoPage";
import BookingPage from "./pages/BookingPage";
import AdminDashboard from "./pages/AdminDashboard";

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
    path: "/infoPage",
    element: <InfoPage />
  },
  {
    path: "/booking/:circuit", 
    element: <BookingPage />
  },
  {
    path: "/admin",
    element: <AdminDashboard/>
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
