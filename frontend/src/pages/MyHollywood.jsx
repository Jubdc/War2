import { Link, useNavigate, useOutletContext } from "react-router-dom";

import { useEffect } from "react";

export default function MyHollywood() {
  const { auth } = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/PageNotFound");
    }
  }, []);

  return (
    <div>
      {auth && (
        <div className="border h-max justify-center items-center ">
          <div className="flex  justify-center items-center">
            <Link to="/film" className="btn btn-ghost text-xl">
              Movies
            </Link>
            <Link to="/directors" className="btn btn-ghost text-xl">
              Directors
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
