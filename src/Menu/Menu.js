import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div>
      <nav role="navigation" aria-label="Main Menu">
        <ul>
          <li>
            <Link itemProp="url" to="/">
              {" "}
              Home{" "}
            </Link>
          </li>
          <li>
            <Link itemProp="url" to="/about">
              {" "}
              About{" "}
            </Link>
          </li>
          <li>
            <Link itemProp="url" to="/login">
              {" "}
              Login{" "}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
