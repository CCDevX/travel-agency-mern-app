import { textContents, textTitles } from "@/utils/why-us-text-data";

const WhyUsText = () => {
  return (
    <section className="py-8 bg-gray-100">
      <div className="align-center grid lg:grid-cols-3 lg:gap-10">
        {textTitles.map((title, index) => (
          <div key={`${title}${index}`}>
            <h3 className="text-[#333] font-bold text-xl mb-4">{title}</h3>
            {textContents[index].map((sentence, index) => (
              <p
                className="text-[#555] my-3"
                key={`${title} sentence ${index}`}
              >
                {sentence}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUsText;
