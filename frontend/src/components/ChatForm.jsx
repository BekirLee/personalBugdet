import React, { useState } from "react";
import axios from "axios";

const ChatForm = ({ userId }) => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await axios.post("/api/reports", { userId, message });
      setMessage("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Mesaj gönderilmedi:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-8">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Bizə mesaj göndərin..."
        rows={3}
        className="w-full border rounded p-2 mb-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Göndər
      </button>
      {success && <p className="text-green-600 mt-2">Mesaj göndərildi!</p>}
    </form>
  );
};

export default ChatForm;
