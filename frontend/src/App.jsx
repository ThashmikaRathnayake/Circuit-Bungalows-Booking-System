import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import BookingPage from "./pages/BookingPage";
import Login from "./components/Login";
import InfoPage from "./components/InfoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/booking/:circuit",
    element: <BookingPage />,
    
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/infoPage",
    element: <InfoPage />
  }
 
])

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
