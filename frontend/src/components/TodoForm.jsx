import axios from "axios";

export default function TodoForm() {
  const handleFormSubmit = async (e) => {
    const title = e.target[1].value;
    const description = e.target[2].value;
    const image = e.target[3].value;

    // Vérification si les champs sont remplis
    if (!title || !description || !image) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // Envoi des données au serveur et attente de la réponse
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/film`, {
        title,
        description,
        image,
      });
      // Gérer ici la réponse réussie, par exemple en réinitialisant le formulaire
    } catch (error) {
      // Gérer les erreurs ici, par exemple en affichant un message d'erreur
      console.error("Erreur lors de l'envoi des données : ", error);
    }
  };

  return (
    <div className=" flex justify-center items-center mt-6 ">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Titre"
          className="input input-bordered w-15 h-8  max-w-xs"
        />
        <input
          type="text"
          placeholder="Description"
          className="input input-bordered w-15 h-8  max-w-xs"
        />
        <input
          type="text"
          placeholder="Poster"
          className="input input-bordered w-15 h-8  max-w-xs"
        />
        <button className="btn btn-sm">Ajouter</button>
      </form>
    </div>
  );
}
