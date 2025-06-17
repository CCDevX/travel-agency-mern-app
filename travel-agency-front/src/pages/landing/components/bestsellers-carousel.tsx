import { apiUrl, axiosHelper } from "@/axios/axios-helper";
import Title from "@/components/title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import type { Trip } from "@/types/entities/trip";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BestsellersCarousel = () => {
  const [entities, setEntities] = useState<Trip[]>([]);
  const fetchEntities = async (): Promise<void> => {
    try {
      const response = await axiosHelper.get<Trip[]>("trips/bestsellers");
      setEntities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  return (
    <section className="py-12 px-4 md:px-8 bg-[color:var(--color-background)]">
      <div className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-white/90">
        <Title text="Bestsellers" level={2} />

        <Carousel
          className="relative"
          plugins={[Autoplay({ delay: 6000 }), Fade()]}
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent>
            {entities.map((trip, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-auto">
                  {/* Boutons identiques à RegionsCarousel */}
                  <CarouselPrevious
                    aria-label="Previous trip"
                    className="absolute top-1/2 left-4 -translate-y-1/2 z-10 p-3 md:p-4 rounded-full border border-[color:var(--color-primary)] bg-white text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white transition shadow"
                  />
                  <CarouselNext
                    aria-label="Next trip"
                    className="absolute top-1/2 right-4 -translate-y-1/2 z-10 p-3 md:p-4 rounded-full border border-[color:var(--color-primary)] bg-white text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white transition shadow"
                  />

                  <Link
                    to={`/research/${trip._id}`}
                    aria-label={`See ${trip.title}`}
                  >
                    <div className="flex items-center justify-center overflow-hidden max-h-[70vh] rounded-2xl">
                      <img
                        src={`${apiUrl}/images/trips/${trip._id}/${trip.images[0]}`}
                        alt={trip.title}
                        className="w-full h-[70vh] object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h3 className="font-special text-[2.5rem] md:text-[4rem] lg:text-[5rem] text-[color:var(--color-primary)] tracking-tight px-6 py-2 bg-white/70 backdrop-blur-sm rounded-md shadow-lg max-w-[90%]">
                          {trip.title}
                        </h3>
                        <p className="text-white text-lg md:text-xl mt-2 drop-shadow-sm">
                          {trip.town}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default BestsellersCarousel;
