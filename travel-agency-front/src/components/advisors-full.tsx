import type { Advisor } from "@/types/entities/advisor";
import { Link, useLoaderData } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { apiUrl } from "@/axios/axios-helper";
import { Badge } from "./ui/badge";

const AdvisorsFull = () => {
  const advisors = useLoaderData() as Advisor[];

  if (advisors.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center text-center py-16 min-h-[60vh] px-4 bg-[color:var(--color-background)]">
        {/* Optionnel : illustration SVG d’erreur ou d’absence */}
        {/* <img src={empty} alt="No advisors" className="w-32 h-32 mb-6 opacity-60" /> */}

        <h2 className="text-2xl font-bold text-[color:var(--color-primary)] mb-2">
          No advisors found
        </h2>
        <p className="text-sm text-[color:var(--color-muted-text)] mb-6 max-w-xl">
          We're sorry, but we couldn’t find any advisors available for your
          current selection.
        </p>

        <Link to="/">
          <button className="bg-[color:var(--color-primary)] text-white px-5 py-2 rounded-full text-sm hover:bg-[color:var(--color-primary-hover)] transition">
            Return to Home
          </button>
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
            className="flex flex-col items-center justify-center p-2 pb-6 bg-white rounded-2xl shadow hover:shadow-md transition-all"
          >
            <CardHeader className="mt-5 flex align-center justify-center h-[200px] w-[200px] cursor-pointer grayscale hover:grayscale-0 transition duration-300">
              <Link className="h-full w-full" to={`${advisor._id}`}>
                <img
                  crossOrigin="anonymous"
                  className="h-full w-full object-cover rounded-full"
                  src={`${apiUrl}/images/advisers/${advisor._id}/${advisor.image}`}
                  alt={advisor.name}
                />
              </Link>
            </CardHeader>
            <CardContent className="text-center">
              <p className="capitalize font-bold text-[color:var(--color-primary)]">
                {advisor.name}
              </p>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 justify-center">
              {advisor.tags.map((tag, index) => (
                <Badge
                  className="capitalize bg-[color:var(--color-primary)] text-white hover:bg-[color:var(--color-primary-hover)]"
                  key={index}
                >
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
