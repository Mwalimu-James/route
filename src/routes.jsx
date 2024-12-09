
import Home from "./pages/Home";
import Actors from "./pages/Actors";
import Directors from "./pages/Directors";
import Movie from "./pages/Movie";
import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />, // Fallback for errors within Home route
  },
  {
    path: "/actors",
    element: <Actors />,
    errorElement: <ErrorPage />, // Optional: Add error handling for Actors route
  },
  {
    path: "/directors",
    element: <Directors />,
    //errorElement: <ErrorPage />, // Optional: Add error handling for Directors route
  },
  {
    path: "/movie/:id",
    element: <Movie />,
    errorElement: <ErrorPage />, // Optional: Add error handling for Movie route
  },
  {
    path: "*", // Catch-all route for unmatched paths
    element: <ErrorPage />,
  },
];

export default routes;

