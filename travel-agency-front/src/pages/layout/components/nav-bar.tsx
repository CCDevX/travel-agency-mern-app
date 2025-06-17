import LinksDesktop from "./links-desktop";
import LinksMobile from "./links-mobile";

const NavBar = () => {
  return (
    <nav className="border-t border-b border-[color:var(--color-border)] bg-white shadow-sm">
      <div className="align-center py-5">
        <LinksMobile></LinksMobile>
        <LinksDesktop></LinksDesktop>
      </div>
    </nav>
  );
};

export default NavBar;
