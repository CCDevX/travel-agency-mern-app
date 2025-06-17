import Title from "@/components/title";
import { hotlineData } from "@/utils/hotline-data";
import { FaPhoneAlt } from "react-icons/fa";

const HotlinePage = () => {
  return (
    <section className="my-12 min-h-[50vh] bg-[color:var(--color-background)] px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-x-12">
          {/* Image */}
          <div className="h-[300px] w-[300px] shrink-0 rounded-full overflow-hidden shadow-lg">
            <img
              src={hotlineData.src}
              alt="Hotline representative"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Title text="Hotline" />
            <p className="max-w-prose text-[color:var(--color-muted-text)] text-base leading-relaxed mt-2">
              {hotlineData.text}
            </p>

            <a
              href="tel:+33765248500"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[color:var(--color-primary)] text-white rounded-full shadow hover:bg-[color:var(--color-primary-hover)] transition"
            >
              <FaPhoneAlt className="w-4 h-4 text-white" />
              <span className="text-sm font-medium">Call Now</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotlinePage;
