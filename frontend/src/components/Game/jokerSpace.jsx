// Définition du composant JokerSpace
const JokerSpace = ({ isVisible }) => {
    // La hauteur réservée correspond à la hauteur totale des éléments supprimés.
    // Ajustez cette hauteur en fonction de votre mise en page réelle.
    const reservedHeight = isVisible ? 'h-0' : 'h-[200px]'; // 200px pour deux questions supprimées.
  
    return (
      <div className={`${reservedHeight} transition-all duration-300`} aria-hidden="true"></div>
    );
  };
  
  export default JokerSpace;
  