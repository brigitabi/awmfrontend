import React, { useEffect, useState } from "react";
import { BsSkipEndCircle } from "react-icons/bs";
import { AiFillLike, AiOutlineDislike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [randomStatement, setRandomStatement] = useState(null);
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");
  const [statementCount, setStatementCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/statements");
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
      setStatementCount(prevCount => prevCount + 1);
    }
  };

  const handleIconClick = (reactionType) => () => {
    getRandomStatement();
    console.log(`Reaction: ${reactionType}`);

    if (userId) {
      console.log(`Reaction: ${reactionType}, User ID: ${userId}`);
    } else {
      console.log("User not authenticated. Please log in.");
      // navigate("/login");
      if (statementCount >= 5) { 
        navigate("/login");
      }
    }
  };

  return (
    <div className="px-8 py-24 ring-blue-500 mx-auto">
      <div className="flex flex-col space-x-2 py-24">
        {randomStatement && (
          <p className="text-white text-center">{randomStatement.statement}</p>
        )}

        <div className="flex flex-col items-center py-4">
          <div className="flex flex-row space-x-12 py-4 justify-center">
            <AiFillLike
              size={40}
              className="cursor-pointer text-green-600"
              onClick={handleIconClick("thumbsUp")}
            />
            <AiOutlineDislike
              size={40}
              className="cursor-pointer text-red-300"
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
