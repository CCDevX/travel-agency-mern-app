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
import Title from "@/components/title";
import { useTranslation } from "react-i18next";

const RegionsCarousel = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 px-4 md:px-8 flex justify-center items-center bg-[color:var(--color-background)]">
      <div className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-white/90">
        <Title text={t("carousel.title")} level={2} />

        <Carousel
          className="relative"
          plugins={[Autoplay({ delay: 5000 }), Fade()]}
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent>
            {regionsCarouselData.map((region, index) => {
              const translatedName = t(
                `filters.regions.${region.region}`,
                region.name
              );

              return (
                <CarouselItem key={index}>
                  <div className="relative w-full h-auto">
                    <CarouselPrevious
                      aria-label={t("carousel.previous")}
                      className="absolute top-1/2 left-4 -translate-y-1/2 z-10 p-3 md:p-4 rounded-full border border-[color:var(--color-primary)] bg-white text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white transition shadow"
                    />
                    <CarouselNext
                      aria-label={t("carousel.next")}
                      className="absolute top-1/2 right-4 -translate-y-1/2 z-10 p-3 md:p-4 rounded-full border border-[color:var(--color-primary)] bg-white text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white transition shadow"
                    />

                    <Link
                      to={`/research?region=${region.region}`}
                      aria-label={t("carousel.viewTripsIn", {
                        name: translatedName,
                      })}
                    >
                      <div className="flex items-center justify-center overflow-hidden max-h-[70vh] rounded-2xl">
                        <img
                          src={region.photo}
                          alt={t("carousel.photoAlt", { name: translatedName })}
                          className="w-full h-[70vh] object-cover"
                        />
                        <p className="capitalize absolute top-[5%] left-1/2 -translate-x-1/2 font-special text-[2.5rem] md:text-[4rem] lg:text-[5rem] text-[color:var(--color-primary)] tracking-tight px-6 py-2 bg-white/70 backdrop-blur-sm rounded-md shadow-lg max-w-[80%] text-center break-words">
                          {translatedName}
                        </p>
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default RegionsCarousel;
