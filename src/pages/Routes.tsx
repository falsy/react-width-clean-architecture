import { createBrowserRouter, RouterProvider } from "react-router-dom"
import NotFound from "./NotFound"
import Consumptions from "./Consumptions"
import Cards from "./Cards"
import Accounts from "./Accounts"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Consumptions />
  },
  {
    path: "/cards",
    element: <Cards />
  },
  {
    path: "/accounts",
    element: <Accounts />
  },
  {
    path: "*",
    element: <NotFound />
  }
])

export const Routes = () => {
  return <RouterProvider router={router} />
}
