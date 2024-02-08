import axios from "axios";
import { useForm } from "react-hook-form";
// import { useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

/* eslint-disable */
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { err },
  } = useForm();

  // const [err, setErr] = useState("");
  const { auth, setAuth } = useOutletContext();
  console.log("Auth réussie !");
  // Hook pour la navigation
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        data
      );
      console.log("Réponse du backend :", response.data);
      setAuth(response.data);

      // Après avoir mis à jour l'état, vérifiez si l'ID et le token sont présents
      if (response.data.user && response.data.token) {
        console.log("L'ID de l'utilisateur est :", response.data.user.id);
        console.log("Le token JWT est :", response.data.token);
        setAuth({ userId: response.data.user.id, token: response.data.token });
        console.log("État auth après la connexion :", auth);
        navigate("/");
      } else {
        console.error("Les données d'authentification sont incomplètes.");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-72 gap-4 justify center mx-auto"
    >
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        className="border border-black"
        {...register("email", {
          required: "Ce champ est requis.",
          pattern: {
            value: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,

            message: "Doit continuer au minimum...",
          },
        })}
      />

      <label htmlFor="password">Password</label>
      <input
        name="password"
        className="border border-black"
        {...register("password", {
          required: "Ce champ est requis.",
          pattern: {
            value:
              /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,

            message: "Doit continuer au minimum...",
          },
        })}
      />

      <button type="submit" className="bg-black p-2 text-white">
        Envoyer
      </button>
    </form>
  );
}
