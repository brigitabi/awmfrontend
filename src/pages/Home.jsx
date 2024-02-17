import React, { useEffect, useState } from "react";
import { BsSkipEndCircle } from "react-icons/bs";
import { AiFillLike, AiOutlineDislike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useUUID } from "../components/CustomHookUuid";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const [randomStatement, setRandomStatement] = useState(null);
  const [data, setData] = useState([]);
  const [statementCount, setStatementCount] = useState(0);
  const navigate = useNavigate();
  const [scalingIcon, setScalingIcon] = useState(null);
  const [bouncingIcon, setBouncingIcon] = useState(null);
  const uuid = useUUID();
  const [userId, setUserId] = useState(null);

  useEffect(() => { 
    if (uuid) { 
      const userIdFromLocalStorage = localStorage.getItem("uuid");
      setUserId(userIdFromLocalStorage);
    }
  }, [uuid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/statements`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const getRandomStatement = () => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setRandomStatement(data[randomIndex]);
      setStatementCount((prevCount) => prevCount + 1);
    }
  };

  const handleIconClick = (reactionType) => async () => {
    getRandomStatement();
    console.log(`Reaction: ${reactionType}`);
    setScalingIcon(reactionType) || setBouncingIcon(reactionType);

    setTimeout(() => {
      setScalingIcon(null);
      setBouncingIcon(null);
    }, 1500);

    if (uuid && userId) {
      if (userId) {
        console.log(`Reaction: ${reactionType}, User ID: ${userId}`);
      } else {
        console.log("User not authenticated. Please log in.");
        // navigate("/login");
        if (statementCount >= 5) {
          navigate("/login");
        }
      }
      try {
        const response = await fetch(`${backendUrl}/api/reactions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: uuid,
            reaction: reactionType,
          }),
        });

        if (response.ok) {
          console.log("Reaction sent successfully.");
        } else {
          console.error("Failed to send reaction.");
        }
      } catch (error) {
        console.error("Error sending reaction:", error);
      }
    } else {
      console.log("User UUID not found.");
    }
  };

  return (
    <div className="px-8 py-24 ring-blue-500 mx-auto">
      <div></div>
      <h1 className="text-center text-2xl text-green-600">
        Ten a Day, Have Your Say
      </h1>

      <div className="flex flex-col space-x-2 py-24">
        {randomStatement && (
          <p className="text-white text-center">{randomStatement.statement}</p>
        )}

        <div className="flex flex-col items-center py-4">
          <div className="flex flex-row space-x-12 py-4 justify-center">
            <AiFillLike
              size={40}
              className={`cursor-pointer text-green-600 ${
                bouncingIcon === "thumbsUp" ? "bouncing-icon" : ""
              }`}
              onClick={handleIconClick("thumbsUp")}
            />
            <AiOutlineDislike
              size={40}
              className={`cursor-pointer text-red-300 ${
                scalingIcon === "thumbsDown" ? "scaling-icon" : ""
              }`}
              onClick={handleIconClick("thumbsDown")}
            />
          </div>
          <div className="mt-4">
            <BsSkipEndCircle
              size={35}
              className="opacity-60 cursor-pointer"
              onClick={handleIconClick("pass")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
