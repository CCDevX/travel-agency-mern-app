import { Link } from "react-router-dom";
import logo from "../assets/images/logo-removebg.png";
import { MapPin, Phone, User, Users } from "lucide-react";

const Header = () => {
  return (
    <>
      <header className="w-full text-blue-900">
        <div className="align-center h-full flex flex-col md:flex-row justify-between items-center">
          <div className="h-full place-content-center py-5 md:py-0">
            <Link to="/" className="flex items-center hover-btn">
              <div className="h-30 w-30">
                <img
                  src={logo}
                  alt="travel agency logo object-cover"
                  className="w-full h-full"
                />
              </div>
              <p className="font-special text-4xl mr-auto ml-2">
                Travel Agency
              </p>
            </Link>
          </div>
          <div className="self-end h-full flex justify-between items-center gap-3 mx-auto md:mr-0">
            <Link
              to="/agencies"
              className="flex flex-col items-center hover-btn"
            >
              <MapPin size="45" className="bordered rounded-2xl p-2"></MapPin>
              <p className="text-[0.7rem] w-max-[2]">Our Agencies</p>
            </Link>
            <Link
              to="/advisors"
              className="flex flex-col items-center hover-btn"
            >
              <Users size="45" className="bordered rounded-2xl p-2"></Users>
              <p className="text-[0.7rem] w-max-[2]">Our Advisors</p>
            </Link>
            <Link
              to="/hotline"
              className="flex flex-col items-center hover-btn"
            >
              <Phone size="45" className="bordered rounded-2xl p-2"></Phone>
              <p className="text-[0.7rem] w-max-[2]">+33 7 65 24 85 00</p>
            </Link>
            <Link
              to="/profile"
              className="flex flex-col items-center hover-btn"
            >
              <User size="45" className="bordered rounded-2xl p-2"></User>
              <p className="text-[0.7rem] w-max-[2]">Your Account</p>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
