import { apiUrl, axiosHelper } from "@/axios/axios-helper";
import { Card, CardContent } from "@/components/ui/card";
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
    <section className="py-6 my-12 w-full">
      <div className="align-center relative">
        <h1 className="text-center text-4xl font-thin my-2">Bestsellers</h1>
        <Carousel
          className="relative"
          plugins={[Autoplay({ delay: 6000 }), Fade()]}
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent className="h-[400px] w-full">
            {entities.map((trip, index) => (
              <CarouselItem key={index} className="h-full w-full">
                <Link to={`/research/${trip._id}`}>
                  <Card className="h-full rounded-2xl overflow-hidden shadow-lg p-0 w-full">
                    <CardContent className="relative p-0 h-full">
                      <img
                        src={`${apiUrl}/images/trips/${trip._id}/${trip.images[0]}`}
                        alt={trip.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <p className="text-5xl font-bold text-amber-400 drop-shadow-lg font-special">
                          {trip.title}
                        </p>
                        <p className="text-3xl mt-2 text-white drop-shadow-md tracking-wider">
                          {trip.town}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 -left-8 -translate-y-1/2 z-10 p-4 md:p-6 rounded-full bg-[#c99628] hover:bg-[#b38220] text-white shadow-lg border-4 border-white" />
          <CarouselNext className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 p-4 md:p-6 rounded-full bg-[#c99628] hover:bg-[#b38220] text-white shadow-lg border-4 border-white" />
        </Carousel>
      </div>
    </section>
  );
};

export default BestsellersCarousel;
