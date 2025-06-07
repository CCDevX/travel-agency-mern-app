import type { Link } from "@/types/ui/link";
import { links } from "@/utils/navbar-data";
import { NavLink, useLocation } from "react-router-dom";

const LinksDesktop = () => {
  const location = useLocation();
  return (
    <div className="w-full hidden lg:flex justify-between items-center">
      {links.map((link) => {
        const { ref, label } = link as Link;
        const isActive = location.pathname + location.search === ref;
        return (
          <NavLink
            to={ref}
            key={label}
            className={() => {
              return `capitalize tracking-wide text-black hover:text-[#e23d30] ${
                isActive ? "underline" : ""
              }`;
            }}
          >
            {label}
          </NavLink>
        );
      })}
    </div>
  );
};

export default LinksDesktop;
