import React, { useEffect, useState } from "react";
import { BsSkipEndCircle } from "react-icons/bs";
import { AiFillLike, AiOutlineDislike } from "react-icons/ai";
import { useUUID } from "../components/CustomHookUuid";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const [statements, setStatements] = useState([]);
  const [statementIndex, setStatementIndex] = useState(0);
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
        const data = await response.json();
        setStatements(data);

        console.log("data from backend", data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const getNextStatement = () => {
    if (statementIndex < statements.length) {
      setStatementIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleIconClick = (reactionType) => async () => {
    setScalingIcon(reactionType);
    setBouncingIcon(reactionType);

    setTimeout(() => {
      setScalingIcon(null);
      setBouncingIcon(null);
    }, 1500);

    if (uuid && userId) {
      const currentStatement = statements[statementIndex];
     
      if (currentStatement) {
        try {
          const response = await fetch(`${backendUrl}/api/reactions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: uuid,
              statement_id: currentStatement.statement_id,
              reaction: reactionType,
            }),
          });

          if (response.ok) {
            console.log(
              `Reaction: ${reactionType}, User ID: ${uuid}, Statement Id: ${currentStatement.statement_id}`,
            );

            getNextStatement();
          } else {
            console.error("Failed to send reaction.");
          }
        } catch (error) {
          console.error("Error sending reaction:", error);
        }
      } else {
        console.log("Statement not found.");
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
        {statements.length > 0 && statementIndex < statements.length && (
          <p className="text-white text-center">
            {statements[statementIndex].statement}
          </p>
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
