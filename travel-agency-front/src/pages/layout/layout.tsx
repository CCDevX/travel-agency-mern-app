import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header";
import NavBar from "./components/nav-bar";
import PreFooter from "./components/pre-footer";
import UserBar from "./components/user-bar";
import Footer from "./components/footer";
import { useEffect } from "react";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <UserBar></UserBar>
      <Header></Header>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <PreFooter></PreFooter>
      <Footer></Footer>
    </>
  );
};

export default Layout;
