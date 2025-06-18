import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import "./locales/i18n";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
