import { Button } from "@/components/ui/button";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  const is404 = isRouteErrorResponse(error) && error.status === 404;
  const message = is404
    ? "The page you're looking for doesn't exist."
    : "Something went wrong. Please try again later.";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        {is404 ? "404 - Not Found" : "Oops!"}
      </h1>
      <p className="text-gray-700 text-lg mb-2">{message}</p>

      {error instanceof Error && !is404 && (
        <p className="text-gray-500 mb-4 italic">{error.message}</p>
      )}

      <Button asChild size="lg">
        <Link to="/">Back Home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
