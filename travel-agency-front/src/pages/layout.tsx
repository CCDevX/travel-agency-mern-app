import { Outlet } from "react-router-dom";
import { UserBar, Header, NavBar, PreFooter, Footer } from "../components";

const Layout = () => {
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
