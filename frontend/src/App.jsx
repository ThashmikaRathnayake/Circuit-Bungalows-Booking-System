import React from "react"
import Homepage from "./pages/Homepage";
import BookingPage from "./pages/BookingPage";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/booking/:circuit",
    element: <BookingPage />,
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
