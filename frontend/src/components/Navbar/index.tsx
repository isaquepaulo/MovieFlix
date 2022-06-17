import { AuthContext } from "AuthContext";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { hasAnyRoles } from "utils/auth";

import { removeAuthData } from "utils/storage";
import ButtonExit from "../ButtonExit/index";
import "./styles.css";

const Navbar = () => {
  const teste = useNavigate();
  const { authContextData, setAuthContextData } = useContext(AuthContext);
  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    teste("/");
  };

  return (
    <nav className="navbar bg-primary">
      <div className="container">
        <h1 className="navbar-brand pt-3">
          <p className="nav-title">MovieFlix</p>
        </h1>
        {hasAnyRoles(["ROLE_MEMBER", "ROLE_VISITOR"]) && (
          <NavLink to="/" onClick={handleLogoutClick}>
            <ButtonExit />
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
