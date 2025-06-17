import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logoutUser } from "@/features/users/users-slice";
import { Button } from "@/components/ui/button";

const UserBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.usersSlice.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="userbar-wrapper">
      <div className="userbar-inner">
        {userData?.username ? (
          <div className="flex items-center gap-4">
            <p className="user-greeting">
              Hey welcome back,{" "}
              <span className="user-name">{userData.username}</span>
            </p>
            <Button
              onClick={handleLogout}
              className="text-sm text-[var(--color-primary)] border border-[var(--color-border)] bg-white rounded-md px-4 py-1 hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="link-secondary text-sm">
              Sign In
            </Link>
            <Link to="/register" className="link-accent text-sm">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default UserBar;
