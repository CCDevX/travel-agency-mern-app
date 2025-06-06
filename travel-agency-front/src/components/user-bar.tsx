import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const UserBar = () => {
  return (
    <>
      <header className="border-b-2 bg-slate-100 flex items-center justify-end py-1 gap-6">
        <nav className="flex gap-4">
          <Button asChild variant="link" size="lg" className="p-0 hover-btn">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild variant="link" size="lg">
            <Link to="/register">Register</Link>
          </Button>
        </nav>
      </header>
    </>
  );
};

export default UserBar;
