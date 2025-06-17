import type { ResearchLoaderType } from "@/types/dtos/research-loader-type";
import { Link, useLoaderData } from "react-router-dom";
import TripCard from "./trip-card";

const ResearchContent = () => {
  const { data } = useLoaderData() as ResearchLoaderType;
  const noResult = !data || data.length === 0;

  return (
    <section className="py-12 min-h-[50vh] bg-gray-50">
      {noResult ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            No trips found
          </h2>
          <p className="text-gray-600 max-w-md">
            Unfortunately, we couldn’t find any trips matching your search.
            <br />
            Please try changing your filters or keywords.
          </p>
          <Link
            to="/research"
            className="mt-6 inline-block text-sm font-medium text-white bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] px-5 py-2 rounded-full transition"
          >
            Back to all trips
          </Link>
        </div>
      ) : (
        <div className="align-center grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-[400px]">
          {data.map((trip, index) => (
            <TripCard key={index} trip={trip} />
          ))}
        </div>
      )}
    </section>
  );
};
export default ResearchContent;
