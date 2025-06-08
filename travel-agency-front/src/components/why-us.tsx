import { blocksText, footerText, headerText } from "@/utils/why-us-data";

const WhyUs = () => {
  return (
    <section className="font-bold pb-8">
      <div className="align-center px-6">
        <div className="text-center">
          <h3 className="text-5xl text-center my-5 font-special font-bold text-[#555555]">
            {headerText}
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-12 mt-10">
          {blocksText.map((block, index) => (
            <div className="grid grid-cols-4 gap-1" key={`block ${index}`}>
              <div className="w-full">
                <img
                  src={block.icon}
                  alt="icon"
                  className="w-full max-w-[50px] object-contain"
                />
              </div>
              <div className="col-span-3">
                <p className="text-[#333]">{block.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center flex justify-center items-center mt-4">
          <div className="max-w-[30px]">
            <img src={footerText.icon} alt="footer-icon" />
          </div>
          <div>
            <p className="text-[#333]">{footerText.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
