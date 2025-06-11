import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { Button } from "./ui/button";

const ErrorElement = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    message = `${error.status} - ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-gray-700 text-lg mb-2">Something went wrong.</p>
      <p className="text-gray-500 mb-6 italic">{message}</p>
      <Button onClick={() => navigate("/")}>Go to Home</Button>
    </div>
  );
};

export default ErrorElement;
