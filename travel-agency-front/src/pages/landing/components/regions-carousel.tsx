import { regionsCarouselData } from "@/utils/regions-carousel-data";

import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const RegionsCarousel = () => {
  return (
    <section className="py-8 mx-5 flex justify-center items-center">
      <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-lg">
        <Carousel
          className="relative"
          plugins={[Autoplay({ delay: 5000 }), Fade()]}
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent>
            {regionsCarouselData.map((region, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-auto">
                  <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 z-10 p-4 md:p-6 rounded-full bg-[#c99628] hover:bg-[#b38220] text-white" />
                  <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 z-10 p-4 md:p-6 rounded-full bg-[#c99628] hover:bg-[#b38220] text-white" />
                  <Link to={`/research?region=${region.region}`}>
                    <div className="flex items-center justify-center overflow-hidden max-h-[70vh] rounded-2xl">
                      <img
                        src={region.photo}
                        alt={`Photo ${region.name}`}
                        className="w-full h-[70vh] object-cover"
                      />
                      <p className="text-shadow-custom absolute top-[5%] left-[50%] -translate-x-1/2 capitalize text-[4rem] lg:text-[5rem] text-[#c99628]">
                        {region.name}
                      </p>
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

export default RegionsCarousel;
