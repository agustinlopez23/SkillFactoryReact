import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const isActive = ({ isActive }) =>
    `nav-link nav-item ${isActive ? `active` : ``}`;
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-4">
      <Link className="navbar-brand" to="/">
        HeroesApp
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          {/* <NavLink className={isActive} to="/marvel">
            Marvel
          </NavLink>

          <NavLink className={isActive} to="/dc">
            DC
          </NavLink> */}
          <NavLink className={isActive} to="/search">
            Search by Name
          </NavLink>
          <NavLink className={isActive} to="/searchbypublisher">
            Search by Publisher
          </NavLink>
        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          <span className="nav-item nav-link text-primary">
            {user?.displayName}
          </span>
          <button className="btn nav-item nav-link" onClick={() => onLogout()}>
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};
