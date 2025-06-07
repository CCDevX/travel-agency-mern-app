import { regionsCarouselData } from "@/types/utils/regions-carousel-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

const RegionsCarousel = () => {
  return (
    <section>
      <div className="">
        <Carousel
          className="relative"
          plugins={[Autoplay({ delay: 5000 }), Fade()]}
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent>
            {regionsCarouselData.map((region, index) => (
              <CarouselItem key={index}>
                <Link to={`/research?region=${region.region}`}>
                  <Card className="relative">
                    <CardContent className="flex items-center justify-center p-0 overflow-hidden max-h-[70vh]">
                      <img
                        src={region.photo}
                        alt={`Photo ${region.name}`}
                        className="h-full w-full object-cover"
                      />
                      <p className="text-shadow-custom absolute top-[5%] left-[50%] -translate-x-[50%] capitalize text-[5rem] text-white italic text-shadow-2xs">
                        {region.name}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-[50%] left-[10px] -translate-y-[50%] hover:scale-105 transition p-6"></CarouselPrevious>
          <CarouselNext className="absolute top-[50%] right-[10px] -translate-y-[50%] hover:scale-105 transition p-6"></CarouselNext>
        </Carousel>
      </div>
    </section>
  );
};

export default RegionsCarousel;
