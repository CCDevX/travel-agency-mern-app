import { col1, col2, col3, col4, colTitles, icons } from "../utils/footer-data";
import logo from "../assets/images/logo-removebg-white.png";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0f2c49] text-gray-300 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 pt-10 grid grid-cols-1 lg:grid-cols-5 gap-6 place-items-start">
        {/* Logo + Texte */}
        <div className="w-full flex flex-col items-center lg:items-start gap-4 text-center lg:text-left">
          <div className="w-[120px] h-auto">
            <img
              src={logo}
              alt="Travel Agency logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex justify-center lg:justify-start w-full">
            <p className="text-sm text-gray-300 leading-relaxed max-w-[320px]">
              Travel Agency helps you discover unique travel experiences in
              France.
              <br />
              Book easily. Travel confidently.
            </p>
          </div>
        </div>

        {/* Bloc Paiements */}
        <div className="col-span-1 lg:col-span-2 w-full flex flex-col md:flex-row lg:flex-col gap-6">
          <div className="flex flex-col items-start">
            <span className="font-semibold mb-1">Safe payment</span>
            <img src={icons.stripe} alt="stripe-logo" className="h-10" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold mb-1">Accepted Payment Types</span>
            <div className="flex gap-3 flex-wrap">
              <img src={icons.visa} alt="visa-logo" className="h-8" />
              <img src={icons.master} alt="master-logo" className="h-8" />
              <img src={icons.bitcoin} alt="bitcoin-logo" className="h-8" />
              <img src={icons.amex} alt="amex-logo" className="h-8" />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-semibold mb-1">Our partners payment</span>
            <img src={icons.iata} alt="iata-logo" className="h-10" />
          </div>
        </div>

        {/* Liens en colonnes */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 w-full gap-4">
          {[col1, col2, col3, col4].map((col, i) => (
            <div key={i}>
              <h4 className="font-bold underline mb-2">{colTitles[i]}</h4>
              {col.map((text, index) => (
                <p
                  key={index}
                  className="text-sm text-gray-200 hover:text-[#e23d30] hover:underline cursor-pointer transition-colors"
                >
                  {text}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bas de footer */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t border-white/10 pt-4">
        <p>CCDevX – {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
