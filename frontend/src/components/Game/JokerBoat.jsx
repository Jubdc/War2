import React, { useState, useEffect } from "react";
import axios from "axios";
import tarantiknow from "../../assets/Tarantiknow.png";

function ChatBot({ currentQuestionId, handleBotUse }) {
  const [showDialogue, setShowDialogue] = useState(false);
  const [typing, setTyping] = useState(false);
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [answer, setAnswer] = useState("");
  const [jokerUsed, setJokerUsed] = useState(false);

  // Cette fonction simule l'effet de frappe au clavier
  const simulateTyping = (message, index = 0) => {
    if (index === 0) setTyping(true);

    if (index < message.length) {
      setTimeout(() => {
        setDisplayedAnswer((prev) => prev + message.charAt(index));
        simulateTyping(message, index + 1);
      }, 30); // Vitesse de frappe (en ms)
    } else {
      setTyping(false); // Arrête l'effet de frappe une fois le message entièrement affiché
    }
  };

  // Fonction pour demander une réponse au chatbot
  const askChatbot = async () => {
    console.log("askChatbot function called");
    console.log("jokerUsed:", jokerUsed);
    if (!jokerUsed) {
      handleBotUse();
      setShowDialogue(true);
      setJokerUsed(true); // Marquez le joker comme utilisé

      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/answers/custom-message/${currentQuestionId}`
        );
        console.log("Réponse du chatbot reçue:", response.data.customMessage);
        setAnswer(response.data.customMessage);
        simulateTyping(response.data.customMessage);
      } catch (error) {
        console.error("Erreur lors de l'interrogation du chatbot:", error);
        setAnswer("Désolé, une erreur est survenue.");
        simulateTyping("Désolé, une erreur est survenue.");
      }
    }
  };

  useEffect(() => {
    setDisplayedAnswer(""); // Efface la réponse précédente quand la bulle est cachée
    setShowDialogue(false); // Cache la bulle de dialogue
  }, [currentQuestionId]); // Réinitialisez lorsque la question actuelle change

  useEffect(() => {
    if (!showDialogue) {
      setDisplayedAnswer(""); // Efface la réponse précédente quand la bulle est cachée
    }
  }, [showDialogue]);

  return (
    <>
      <button
        onClick={askChatbot}
        className={`relative transition duration-300 ease-in-out hover:opacity-50${
          jokerUsed ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={jokerUsed}
      >
        <img
          src={tarantiknow}
          alt="Logo de tarantiknow"
          className=""
          style={{ height: "12rem", width: "12rem" }}
        />
      </button>

      {showDialogue && (
        <div
          className={`absolute border  chat-bubble duration-500 ease-in-out ${
            showDialogue ? "translate-x-64 -translate-y-10" : "scale-100"
          } ml-0 max-w-md w-96 p-4 rounded-lg z-50 shadow bg-black `}
        >
          <p className="animate-typing text-wrap font-avant-garde text-ms text-gray-200">
            {typing ? displayedAnswer : answer}
          </p>
        </div>
      )}
    </>
  );
}

export default ChatBot;
