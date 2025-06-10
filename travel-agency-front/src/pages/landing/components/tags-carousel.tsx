import { Link } from "react-router-dom";

import { tagsCarouselData } from "@/utils/tags-carousel-data";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const TagsCarousel = () => {
  return (
    <section className="py-6 my-12">
      <div className="align-center">
        <h1 className="text-5xl text-center my-5 font-special font-bold text-[#555555]">
          Browse by theme
        </h1>
        <Carousel
          className="relative"
          plugins={[Autoplay({ delay: 3000 })]}
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent>
            {tagsCarouselData.map((tag, index) => (
              <CarouselItem
                key={index}
                className="flex justify-center sm:basis-1/2 lg:basis-1/3"
              >
                <Link to={`/research?tags=${tag.code}`}>
                  <Card className="m-4 p-0 h-[500px] w-full max-w-xs flex flex-col rounded-xl shadow-md">
                    <CardHeader className="p-0 h-[200px]">
                      <img
                        src={tag.photo}
                        alt={tag.title}
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    </CardHeader>

                    <CardContent className="p-4 flex-grow">
                      <p className="text-lg font-semibold mb-2 text-[#333] capitalize">
                        {tag.title}
                      </p>
                      <p className="text-sm text-[#555]  leading-relaxed max-h-[200px] overflow-y-auto pr-1 scroll-thin">
                        {tag.text}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="absolute top-[50%] -left-[20px]  -translate-y-[50%] bg-[#c99628] hover:bg-[#b38220] text-white hover:scale-105 p-6 mx-8" />
          <CarouselNext className="absolute top-[50%] -right-[20px] -translate-y-[50%] bg-[#c99628] hover:bg-[#b38220] text-white hover:scale-105 p-6 mx-8" /> */}
        </Carousel>
      </div>
    </section>
  );
};

export default TagsCarousel;
