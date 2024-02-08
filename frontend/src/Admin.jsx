import { NavLink, Outlet, useOutletContext } from "react-router-dom";

export default function Admin() {
  const { auth } = useOutletContext();
  return (
    <div>
      {auth.isAdmin ? (
        <div>
          <NavLink to="/MyHollywood">Modifier une arme</NavLink>
          <NavLink to="/bureau/usereditadmin">
            Modifier le profil d'un membre
          </NavLink>
          <button type="button" onClick="{''}">
            B1fzefzffzefzfezfzez
          </button>
          <button type="button" onClick="{''}">
            BT2zfzefzffzefzffz
          </button>
          <Outlet />
        </div>
      ) : (
        <p>EST CE QUE CA VOUS DIRAIT D'ALLEZ VOUS FAIRE METTRE</p>
      )}
    </div>
  );
}
