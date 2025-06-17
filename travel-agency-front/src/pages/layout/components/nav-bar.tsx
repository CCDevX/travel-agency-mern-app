import LinksDesktop from "./links-desktop";
import LinksMobile from "./links-mobile";

const NavBar = () => {
  return (
    <nav className="border-t-2 border-b-2">
      <div className="align-center py-5">
        <LinksMobile></LinksMobile>
        <LinksDesktop></LinksDesktop>
      </div>
    </nav>
  );
};

export default NavBar;
