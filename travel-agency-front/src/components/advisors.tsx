import { apiUrl, axiosHelper } from "@/axios/axios-helper";
import { Button } from "@/components/ui/button";
import type { Advisor } from "@/types/entities/advisor";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "./title";

const Advisors = () => {
  const [entities, setEntities] = useState<Advisor[]>([]);

  const fetchEntities = async (): Promise<void> => {
    try {
      const response = await axiosHelper.get<Advisor[]>("advisers");
      setEntities(response.data.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);
  return (
    <section className="py-12 px-4 md:px-8 bg-[color:var(--color-background)]">
      <div className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-white p-8 text-center">
        <Title text="Meet Our Dedicated Advisors" level={2} />

        <p className="text-2xl font-bold mt-4 mb-2">For each place of France</p>
        <p className="text-gray-600 mb-8 text-sm md:text-base">
          200 passionate experts ready to help you fully experience this
          beautiful country
        </p>

        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {entities.map((advisor, index) => (
            <Link to={`/advisors`} key={index} className="text-center">
              <div className="transition-all hover:scale-105">
                <div className="h-[220px] w-[220px] mx-auto overflow-hidden rounded-full shadow-lg">
                  <img
                    crossOrigin="anonymous"
                    src={`${apiUrl}/images/advisers/${advisor._id}/${advisor.image}`}
                    alt={advisor.name}
                    className="h-full w-full object-cover rounded-full grayscale hover:grayscale-0 transition duration-300"
                  />
                </div>
                <p className="capitalize mt-2 text-[color:var(--color-primary)] font-medium">
                  {advisor.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Link to="/advisors">
          <Button className="rounded-full bg-white text-[color:var(--color-primary)] border border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white transition-all hover:scale-105">
            Look for a specialist
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Advisors;
