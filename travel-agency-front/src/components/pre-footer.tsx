import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const PreFooter = () => {
  return (
    <div className="w-full min-h-[10vh] bg-[#0f2c49] text-white place-content-center">
      <div className="align-center flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className="text-2xl font-bold md: py-4">
            Follow us on social medias!
          </p>
        </div>
        <div className="flex gap-8 items-center md: pb-4">
          <FaFacebook
            size="35"
            className="hover:text-[#e23d30] cursor-pointer transition-colors"
          />
          <FaLinkedin
            size="35"
            className="hover:text-[#e23d30] cursor-pointer transition-colors"
          />
          <FaXTwitter
            size="35"
            className="hover:text-[#e23d30] cursor-pointer transition-colors"
          />
          <FaInstagram
            size="35"
            className="hover:text-[#e23d30] cursor-pointer transition-colors"
          />
          <FaYoutube
            size="35"
            className="hover:text-[#e23d30] cursor-pointer transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
export default PreFooter;
