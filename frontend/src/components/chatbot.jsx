import React, { useState, useEffect, useRef } from "react";

// --- Gemini API Integration ---
const callGeminiAPI = async (prompt) => {
  const apiKey = "AIzaSyBkxgZ6e-tup5PBs2O7GEEOLfpR6f_nq_A"; // ⚠️ Replace with your Gemini API key
  const apiUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return (
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response text."
    );
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, something went wrong.";
  }
};

// --- Chat Support Component ---
const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hello! I'm your AI assistant. How can I help you with your ride today?",
          sender: "bot",
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "" || isLoading) return;

    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const systemPrompt = `You are a helpful and friendly chat support assistant for a carpooling website in India called 'SAARTHI'. Your goal is to answer user questions concisely and accurately. Keep your answers to 2-3 sentences. Available services are: City Rides, Outstation Travel. The company offers 25% off on the first ride. The current time is ${new Date().toLocaleTimeString(
      "en-IN",
      { timeZone: "Asia/Kolkata" }
    )}.`;
    const fullPrompt = `${systemPrompt}\n\nUser query: "${inputValue}"`;

    const botResponseText = await callGeminiAPI(fullPrompt);

    setMessages((prev) => [...prev, { text: botResponseText, sender: "bot" }]);
    setIsLoading(false);
  };

  return (
    <div>
      <style>{`
        :root {
          --primary-color: #5d5dff;
          --secondary-color: #f0f4f8;
          --text-color: #333;
          --border-radius: 12px;
        }
        .chat-bubble { 
          position: fixed; bottom: 30px; right: 30px; 
          width: 60px; height: 60px; 
          background-color: var(--primary-color); 
          border-radius: 50%; 
          display: flex; align-items: center; justify-content: center; 
          cursor: pointer; 
          box-shadow: 0 4px 15px rgba(0,0,0,0.2); 
          z-index: 1000; transition: transform 0.2s ease-in-out;
        }
        .chat-bubble:hover { transform: scale(1.1); }
        .chat-popup { 
          position: fixed; bottom: 100px; right: 30px; 
          width: 350px; max-width: 90vw; height: 500px; 
          background-color: #fff; border-radius: var(--border-radius); 
          box-shadow: 0 8px 30px rgba(0,0,0,0.15); 
          display: flex; flex-direction: column; 
          overflow: hidden; z-index: 999; 
          opacity: 0; transform: translateY(20px); visibility: hidden; 
          transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s; 
        }
        .chat-popup.open { opacity: 1; transform: translateY(0); visibility: visible; }
        .chat-header { 
          background-color: var(--primary-color); 
          color: white; padding: 15px 20px; 
          display: flex; justify-content: space-between; align-items: center; 
        }
        .chat-header h3 { margin: 0; font-size: 1.1em; }
        .chat-header .close-btn { 
          background: none; border: none; color: white; font-size: 24px; 
          cursor: pointer; line-height: 1; 
        }
        .chat-messages { 
          flex-grow: 1; padding: 20px; 
          overflow-y: auto; display: flex; flex-direction: column; gap: 12px; 
          background-color: var(--secondary-color); 
        }
        .message { 
          padding: 10px 15px; border-radius: 18px; 
          max-width: 80%; word-wrap: break-word; line-height: 1.4; 
        }
        .message.user { 
          background-color: var(--primary-color); color: white; 
          align-self: flex-end; border-bottom-right-radius: 4px; 
        }
        .message.bot { 
          background-color: #e9e9eb; color: var(--text-color); 
          align-self: flex-start; border-bottom-left-radius: 4px; 
        }
        .message.typing { 
          padding: 15px; display: flex; gap: 5px; align-items: center; 
        }
        .message.typing span { 
          width: 8px; height: 8px; background-color: #aaa; border-radius: 50%; 
          animation: typing-blink 1.4s infinite both; 
        }
        .message.typing span:nth-child(2) { animation-delay: 0.2s; }
        .message.typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing-blink { 
          0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } 
        }
        .chat-input-form { 
          display: flex; border-top: 1px solid #eee; padding: 10px; 
        }
        .chat-input-form input { 
          flex-grow: 1; border: none; padding: 10px; font-size: 1em; 
          outline: none; background: transparent; 
        }
        .chat-input-form button { 
          background-color: var(--primary-color); color: white; 
          border: none; padding: 10px 20px; border-radius: 8px; 
          cursor: pointer; font-weight: 600; 
          transition: background-color 0.2s; 
        }
        .chat-input-form button:hover { background-color: #4b4bdf; }
        .chat-input-form button:disabled { background-color: #ccc; cursor: not-allowed; }
      `}</style>

      <div className="chat-bubble" onClick={toggleChat}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="white"
          viewBox="0 0 256 256"
        >
          <path d="M216,48H40A16,16,0,0,0,24,64V176a16,16,0,0,0,16,16h40v32a8,8,0,0,0,13.66,5.66L144,192h72a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM96,128a12,12,0,1,1,12-12A12,12,0,0,1,96,128Zm40,0a12,12,0,1,1,12-12A12,12,0,0,1,136,128Zm40,0a12,12,0,1,1,12-12A12,12,0,0,1,176,128Z"></path>
        </svg>
      </div>

      <div className={`chat-popup ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <h3>AI Chat Support</h3>
          <button className="close-btn" onClick={toggleChat}>
            &times;
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="message bot typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Ask about our services..."
            value={inputValue}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatSupport;
