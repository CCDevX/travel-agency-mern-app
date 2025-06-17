import {
  col1,
  col2,
  col3,
  col4,
  colTitles,
  icons,
  text,
} from "../../../utils/footer-data";
import logo from "../../../assets/images/logo-removebg-white.png";

const Footer = () => {
  return (
    <footer className="min-h-[30vh] pb-12 bg-[#0f2c49] text-gray-300 border-t border-white/10">
      <div className="align-center pt-6 grid grid-cols-1 lg:grid-cols-5 gap-6 place-items-center">
        <div className="w-[150px] h-[150px]">
          <img
            src={logo}
            alt="Travel Agency logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-full lg:col-span-4">{text}</div>
        <div className="w-full h-full flex flex-col md:flex-row lg:flex-col justify-between items-start gap-7">
          <div className="flex flex-col items-start">
            <p>Safe Payment</p>
            <img src={icons.stripe} alt="stripe-logo" className="h-[40px]" />
          </div>
          <div className="flex flex-col items-start">
            <p>Accepted payment</p>
            <div className="flex justify-start gap-x-4 flex-wrap">
              <img src={icons.visa} alt="visa-logo" className="h-[40px]" />
              <img src={icons.master} alt="master-logo" className="h-[40px]" />
              <img
                src={icons.bitcoin}
                alt="bitcoin-logo"
                className="h-[40px]"
              />
              <img src={icons.amex} alt="amex-logo" className="h-[40px]" />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <p className="">Our partners payment</p>
            <img src={icons.iata} alt="iata-logo" className="h-[40px]" />
          </div>
        </div>
        <div className="w-full h-full flex flex-col md:flex-row lg:col-span-4 justify-between gap-2">
          <div className="leading-10">
            <div className="font-bold underline">{colTitles[1]}</div>
            {col2.map((content, index) => (
              <div
                key={index}
                className="text-sm hover:text-[#e23d30] cursor-pointer transition-colors"
              >
                {content}
              </div>
            ))}
          </div>
          <div className="leading-10">
            <div className="font-bold underline">{colTitles[0]}</div>
            {col1.map((content, index) => (
              <div
                key={index}
                className="text-sm hover:text-[#e23d30] cursor-pointer transition-colors"
              >
                {content}
              </div>
            ))}
          </div>
          <div className="leading-10">
            <div className="font-bold underline">{colTitles[2]}</div>
            {col3.map((content, index) => (
              <div
                key={index}
                className="text-sm hover:text-[#e23d30] cursor-pointer transition-colors"
              >
                {content}
              </div>
            ))}
          </div>
          <div className="leading-10">
            <div className="font-bold underline">{colTitles[3]}</div>
            {col4.map((content, index) => (
              <div
                key={index}
                className="text-sm hover:text-[#e23d30] cursor-pointer transition-colors"
              >
                {content}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 align-center text-center capitalize text-xl border-t border-white/10">
        <p className="mt-6">CCDevX – {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
