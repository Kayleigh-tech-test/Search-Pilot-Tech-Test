import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="app-header">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Products
        </NavLink>
      </header>
      <div className="body">
        <Outlet />
      </div>
    </>
  )
};

export default Layout;