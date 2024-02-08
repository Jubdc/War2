/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Afficher les données du formulaire dans la console avant de les envoyer
    console.log("Données du formulaire:", data);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/user`, data)
      .then((response) => {
        // Gérer la réponse ici, peut-être en naviguant vers une autre page ou en affichant un message de succès
        console.log("Réponse de l'API:", response);
      })
      .catch((error) => {
        // Gérer l'erreur ici, peut-être en affichant un message d'erreur
        console.error("Erreur lors de l'envoi des données:", error);
      });
    // NavigationPreloadManager("/");
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-72 gap-4 justify center mx-auto"
    >
      <label htmlFor="firstname">Name</label>
      <input
        type="text"
        name="name"
        className="border border-black"
        {...register("name", {
          required: "Ce champ est requis.",
          minLength: {
            value: 3,
            message: "Ce champ doit contenir au moins 3 caractères",
          },
        })}
      />
      {errors.name && (
        <span className="text-red-500">{errors.name.message}</span>
      )}

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

      {errors.email && (
        <span className="text-red-500">{errors.email.message}</span>
      )}

      <label htmlFor="password">Password</label>
      <input
        type={showPassword ? "text" : "password"}
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
      {errors.password && (
        <span className="text-red-500">{errors.password.message}</span>
      )}
      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "masked" : "show"}
      </button>

      <label htmlFor="confirmpassword">ConfirmPassword</label>
      <input
        type={showPassword ? "text" : "password"}
        name="confirmpassword"
        className="border border-black"
        {...register("confirmpassword", {
          required: "Ce champ est requis.",
          pattern: {
            value:
              /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
            required: "Ce champ est requis.",
          },
          validate: (value) =>
            value === watch("password") ||
            "Les mots de passe ne correspondent pas",
        })}
      />

      {errors.confirmpassword && (
        <span className="text-red-500">{errors.confirmpassword.message}</span>
      )}
      <h3>By creating an account, you agree to our Privacy Policy</h3>
      <button type="submit" className="bg-black p-2 text-white">
        Envoyer
      </button>
    </form>
  );
}
