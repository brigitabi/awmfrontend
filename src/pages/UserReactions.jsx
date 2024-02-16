// Frontend: UserReactionButton.jsx
import React, { useState } from "react";
import axios from "axios";

const UserReactions = ({ statementId, userId }) => {
  const [reaction, setReaction] = useState(null);

  const handleReaction = async (reactionType) => {
    try {
      await axios.post("/api/reactions", {
        userId: user_id,
        statementId: statement_id,
        reaction: reactionType,
      });
      setReaction(reactionType);
    } catch (error) {
      console.error("Error reacting to statement:", error);
    }
  };

  return (
    <div>
      <button onClick={() => handleReaction("thumbsUp")}>Thumbs Up</button>
      <button onClick={() => handleReaction("thumbsDown")}>Thumbs Down</button>
      {/* Display the user's reaction */}
      {reaction && <p>You reacted with: {reaction}</p>}
    </div>
  );
};

export default UserReactions;
