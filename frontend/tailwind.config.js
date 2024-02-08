module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "custom-xl": "7rem", // Vos tailles de police personnalisées
      },
      borderRadius: {
        "2lg": "3rem", // Votre bordure arrondie personnalisée
        "5xl": "2.5rem", // Une autre bordure arrondie personnalisée
      },
      dropShadow: {
        glow: [
          // Votre ombre personnalisée
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)",
        ],
      },
      fontFamily: {
        "avant-garde": ["itc-avant-garde-gothic-pro", "sans-serif"], // Votre famille de polices personnalisée
      },
      padding: {
        "1/2": "50%",
        full: "100%", // Votre padding personnalisé
      },
      animation: {
        typewriter: "typewriter 4s steps(44) 1s forwards", // Animation de machine à écrire
        caret: "blink-caret 1s step-end infinite", // Animation de clignotement du curseur
      },
      keyframes: {
        typewriter: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "blink-caret": {
          "50%": { borderColor: "transparent" },
        },
      },
    },
  },
  plugins: [require("daisyui")], // Vos plugins
};
