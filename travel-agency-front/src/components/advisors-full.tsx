import type { Advisor } from "@/types/entities/advisor";
import { Link, useLoaderData } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { apiUrl } from "@/axios/axios-helper";
import { Badge } from "./ui/badge";

const AdvisorsFull = () => {
  const advisors = useLoaderData() as Advisor[];

  if (advisors.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center text-center py-16 min-h-[60vh] px-4">
        {/* <img
          src="../assets/images/empty.svg"
          alt="No advisors"
          className="w-32 h-32 mb-6 opacity-60"
        /> */}
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          No advisors available for this destination
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          We're sorry, but we couldn’t find any members associated with your
          current selection.
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white text-sm font-medium px-5 py-2 rounded-md transition"
        >
          Return to Home
        </Link>
      </section>
    );
  }

  return (
    <section className="align-center py-8 min-h-[100%]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {advisors.map((advisor, index) => (
          <Card
            key={`${index}`}
            className="flex flex-col items-center justify-center p-2 pb-6"
          >
            <CardHeader className="mt-5 flex align-center justify-center h-[200px] w-[200px] cursor-pointer transition-all mix-blend-luminosity hover:scale-105 hover:mix-blend-normal">
              <Link className="h-full w-fumm" to={`${advisor._id}`}>
                <img
                  crossOrigin="anonymous"
                  className="h-full w-full object-cover rounded-full"
                  src={`${apiUrl}/images/advisers/${advisor._id}/${advisor.image}`}
                  alt={advisor.name}
                />
              </Link>
            </CardHeader>
            <CardContent className="text-center">
              <p className="capitalize font-bold">{advisor.name}</p>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              {advisor.tags.map((tag, index) => (
                <Badge className="capitalize" key={index}>
                  {tag}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AdvisorsFull;
