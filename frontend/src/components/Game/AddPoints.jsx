// scoreService.js
import axios from "axios";

const givePointsToPlayer = async (userId, scoreToAdd, jwtToken) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/addPoints`,
      { score: scoreToAdd },
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    );

    console.log("Score mis à jour avec succès", response);
    return response.data; // ou gérer autrement selon les besoins
  } catch (error) {
    console.error("Erreur lors de la mise à jour du score", error);
    throw error; // Propager l'erreur pour un traitement ultérieur si nécessaire
  }
};

export default givePointsToPlayer;
