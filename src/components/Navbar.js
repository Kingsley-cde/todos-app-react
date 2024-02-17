import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav
        style={{ color: "white", padding: "20px", backgroundColor: "orange" }}
      >
        <ul style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => {
                return {
                  color: isActive ? "black" : "white",
                };
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              style={({ isActive }) => {
                return {
                  color: isActive ? "black" : "white",
                };
              }}
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
