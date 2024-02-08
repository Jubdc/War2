import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../../assets/Logo.png";

export default function NavBarGame({ auth }) {
  return (
    <div className="navbar bg-black font-avant-garde font-light text-white text-base p-5">
      <div className="flex-1 text-base">
        <Link to="/" className="">
          <img
            src={Logo}
            alt="Logo de CinewarBitches"
            style={{ height: "3rem", width: "auto" }}
          />
        </Link>
      </div>

      <div className="pr-5">
        <Link
          to="/Ranking"
          className="text-sm font-avant-garde font-light pt-8 pr-5 "
        >
          Ranking
        </Link>
        <Link
          to="/awardsRoom"
          className="text-sm  pt-8 font-avant-garde font-light pr-20"
        >
          Awards
        </Link>

        {auth &&
          auth.token && ( // Vérifie si l'utilisateur est connecté (auth.token existe)
            <Link
              to="/MyHollywood"
              className="  text-sm  pt-8 font-avant-garde font-light "
            >
              MyHollywood
            </Link>
          )}
        <Link
          to="/register"
          className=" text-sm  pt-8 font-avant-garde font-light  pr-5"
        >
          Login
        </Link>
        <Link
          to="/login"
          className=" text-sm  pt-8 font-avant-garde font-light "
        >
          Join
        </Link>
      </div>
    </div>
  );
}

NavBarGame.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string, // Assuming token is a string, adjust the type accordingly
    // You can add other PropTypes validation for the auth object properties here if needed
  }),
};
