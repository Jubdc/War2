import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "./../assets/Logo.png";

export default function NavBar({ auth }) {
  return (
    <div className="navbar bg-black font-avant-garde font-light text-white p-7">
      <div className="flex-1 h-6 pl-16 translate-x-1">
        <NavLink to="/" className="">
          <img
            src={Logo}
            alt="Logo de CinewarBitches"
            style={{ height: "5.3rem", width: "auto" }}
          />
        </NavLink>
      </div>
      <div className="p-0 m-0">
        <div className="flex items-center space-x-6">
          <div className="pr-72 pt-8 space-x-9">
            <NavLink
              to="/Ranking"
              className="relative text-lg pt-8 font-avant-garde font-light w-max-one group"
            >
              <span>Hardcore mode</span>
              <span className="absolute -bottom-1 left-0 h-px bg-cyan-400 transition-all  group-hover:w-2/3"></span>
            </NavLink>

            <NavLink
              to="/Ranking"
              className="relative text-lg pt-8 font-avant-garde font-light w-max-one group"
            >
              Ranking
              <span className="absolute -bottom-1 left-0 h-px bg-cyan-400 transition-all group-hover:w-2/3"></span>
            </NavLink>
            <NavLink
              to="/awardsRoom"
              className="relative text-lg pt-8 font-avant-garde font-light w-max-one group"
            >
              Awards
              <span className="absolute -bottom-1 left-0 h-px bg-cyan-400 transition-all group-hover:w-2/3"></span>
            </NavLink>
            <NavLink
              to="/awardsRoom"
              className="relative text-lg pt-8a  font-avant-garde font-light w-max-one group "
            >
              About
              <span className="absolute -bottom-1 left-0 h-px bg-cyan-400 transition-all group-hover:w-2/3"></span>
            </NavLink>
          </div>

          {!auth || !auth.token ? (
            <>
              <NavLink
                to="/login"
                className="relative text-lg pt-8 -translate-x-16 font-avant-garde font-light w-max-one group"
              >
                Login
                <span className="absolute -bottom-1 left-0 h-px bg-cyan-400 transition-all group-hover:w-2/3"></span>
              </NavLink>
              <div className="border border-cyan-400 -translate-x-16 translate-y-4 pl-2 pr-2 rounded-sm hover:border-blue-800 transform hover:scale-110 ">
                <NavLink
                  to="/register"
                  className="m-0 relative text-lg pt-8 -translate-x-16 font-avant-garde font-light w-max-one group"
                >
                  Join
                  <span className=""></span>
                </NavLink>
              </div>
            </>
          ) : null}

          {auth && auth.token && (
            <div className="bg-black dropdown dropdown-hover translate-y-3 -translate-x-10">
              <div tabindex="0" role="button " class="btn m-1 ">
                Profil
              </div>
              <ul
                tabindex="0"
                class="dropdown-content z-[1] menu  shadow bg-black-100 rounded-box w-40 -translate-x-10 font-avant-garde border"
              >
                <li>
                  <NavLink to="/MyHollywood" className="dropdown-item">
                    My Hollywood
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Settings" className="dropdown-item">
                    Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/QuestionForFun" className="dropdown-item">
                    Play
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string, // Assuming token is a string, adjust the type accordingly
    // You can add other PropTypes validation for the auth object properties here if needed
  }),
};
