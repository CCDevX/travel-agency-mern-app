import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const PreFooter = () => {
  return (
    <div className="w-full min-h-[80px] bg-[color:var(--color-primary)] text-[color:var(--color-white)]">
      <div className="align-center flex flex-col md:flex-row justify-between items-center py-4 gap-4">
        <p className="text-2xl font-bold text-center md:text-left">
          Follow us on social medias!
        </p>
        <div className="flex gap-6 items-center">
          <FaFacebook
            size={28}
            className="hover:text-[color:var(--color-accent-hover)] transition-colors duration-200 cursor-pointer"
            title="Facebook"
            aria-label="Facebook"
          />
          <FaLinkedin
            size={28}
            className="hover:text-[color:var(--color-accent-hover)] transition-colors duration-200 cursor-pointer"
            title="LinkedIn"
            aria-label="LinkedIn"
          />
          <FaXTwitter
            size={28}
            className="hover:text-[color:var(--color-accent-hover)] transition-colors duration-200 cursor-pointer"
            title="Twitter"
            aria-label="Twitter"
          />
          <FaInstagram
            size={28}
            className="hover:text-[color:var(--color-accent-hover)] transition-colors duration-200 cursor-pointer"
            title="Instagram"
            aria-label="Instagram"
          />
          <FaYoutube
            size={28}
            className="hover:text-[color:var(--color-accent-hover)] transition-colors duration-200 cursor-pointer"
            title="YouTube"
            aria-label="YouTube"
          />
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
