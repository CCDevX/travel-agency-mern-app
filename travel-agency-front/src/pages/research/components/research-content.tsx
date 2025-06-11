import type { ResearchLoaderType } from "@/types/dtos/research-loader-type";
import { useLoaderData } from "react-router-dom";
import TripCard from "./trip-card";

const ResearchContent = () => {
  const { data } = useLoaderData() as ResearchLoaderType;
  const noResult = !data || data.length === 0;

  return (
    <section className="py-8 min-h-[50vh]">
      {noResult ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <p className="text-2xl font-semibold text-gray-700">
            No trip found for your search.
          </p>
          <p className="text-gray-500 mt-2">
            Try adjusting your filters or search terms.
          </p>
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
