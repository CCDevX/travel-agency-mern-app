import { galleryImages } from "@/utils/gallery-data";

const Gallery = () => {
  return (
    <section className="w-full px-4 py-8">
      <div className="grid auto-rows-[200px] grid-cols-2 md:grid-cols-5 gap-4">
        {galleryImages.map((image, index) => (
          <div
            className={`overflow-hidden ${
              index === 0 ? "col-span-2 row-span-2 auto-rows-[300px]" : ""
            } rounded-xl shadow-md`}
            key={`image ${index}`}
          >
            <img
              src={image}
              alt={`Gallery image ${index}`}
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105 hover:brightness-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
