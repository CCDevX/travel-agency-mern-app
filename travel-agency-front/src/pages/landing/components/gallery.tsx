import Title from "@/components/title";
import { galleryImages } from "@/utils/gallery-data";
import { useTranslation } from "react-i18next";

const Gallery = () => {
  const { t } = useTranslation();
  return (
    <section className="py-12 px-4 md:px-8 bg-[color:var(--color-background)]">
      <div className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-white p-8">
        <Title text={t("gallery.title")} level={2} />

        <div className="grid auto-rows-[200px] grid-cols-2 md:grid-cols-5 gap-4 mt-8">
          {galleryImages.map((image, index) => (
            <div
              key={`image-${index}`}
              className={`overflow-hidden rounded-xl shadow-md ${
                index === 0 ? "col-span-2 row-span-2 auto-rows-[300px]" : ""
              }`}
            >
              <img
                src={image}
                alt={`Gallery image ${index}`}
                className="w-full h-full object-cover transition-all duration-300 hover:scale-105 hover:brightness-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Gallery;
