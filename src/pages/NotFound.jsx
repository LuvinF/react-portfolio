import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-white">
        404
      </h1>

      <p className="text-secondary mt-4">
        Page not found.
      </p>

      <Link
        to="/"
        className="mt-8 text-blue-500 hover:underline"
      >
        Return Home
      </Link>
    </main>
  );
};

export default NotFound;