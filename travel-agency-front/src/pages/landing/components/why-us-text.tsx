import Title from "@/components/title";
import { textContents, textTitles } from "@/utils/why-us-text-data";

const WhyUsText = () => {
  return (
    <section className="py-12 px-4 md:px-8 bg-[color:var(--color-background)]">
      <div className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-white p-8">
        <Title text="Why choose Travel Agency ?" level={2} />

        <div className="grid lg:grid-cols-3 gap-10 mt-10">
          {textTitles.map((title, index) => (
            <div key={`${title}-${index}`}>
              <h3 className="text-[color:var(--color-primary)] font-semibold text-xl mb-4 leading-snug">
                {title}
              </h3>
              {textContents[index].map((sentence, idx) => (
                <p
                  key={`sentence-${idx}`}
                  className="text-[#555] mb-3 leading-relaxed text-sm"
                >
                  {sentence}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsText;
