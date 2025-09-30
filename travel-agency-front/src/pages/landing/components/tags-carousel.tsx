import { Link } from "react-router-dom";

import { tagsCarouselData } from "@/utils/tags-carousel-data";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Title from "@/components/title";
import { useTranslation } from "react-i18next";

const TagsCarousel = () => {
  const { t } = useTranslation();
  return (
    <section className="py-12 px-4 md:px-8 bg-[color:var(--color-background)]">
      <div className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-white p-4 md:p-8">
        {/* Titre unifié */}
        <Title text={t("tagsCarousel.title")} level={2} />

        <Carousel
          className="relative"
          plugins={[Autoplay({ delay: 4000 })]}
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent>
            {tagsCarouselData.map((tag, index) => (
              <CarouselItem
                key={index}
                className="flex justify-center sm:basis-1/2 lg:basis-1/3"
              >
                <Link to={`/research?tags=${tag.code}`}>
                  <Card className="m-4 p-0 w-full max-w-xs rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                    <CardHeader className="p-0 h-[200px]">
                      <img
                          loading="lazy"
                        src={tag.photo}
                        alt={t(`tagsCarousel.tags.${tag.code}.title`)}
                        className="w-full h-full object-cover"
                      />
                    </CardHeader>

                    <CardContent className="p-4 bg-white">
                      <h3 className="text-lg font-semibold text-[color:var(--color-primary)] capitalize mb-1">
                        {t(`tagsCarousel.tags.${tag.code}.title`)}
                      </h3>
                      <p className="text-sm text-[color:var(--color-secondary)] leading-relaxed max-h-[180px] overflow-y-auto pr-1 scroll-thin">
                        {t(`tagsCarousel.tags.${tag.code}.text`)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default TagsCarousel;
