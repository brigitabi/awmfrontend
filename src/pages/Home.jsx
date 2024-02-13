import React, { useEffect, useState } from "react";
import { BsSkipEndCircle } from "react-icons/bs";

import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (clickCount >= 5) {
      navigate("/login");
    }
  }, [clickCount]);

  const goToCreateYourStatement = () => {
    navigate("/create-your-statement");
  };

  const statements = [
    "Nothing beats finding money you forgot about in your pocket",
    "Pets often act like they understand you, but conveniently forget their 'understanding' when it's bath time.",
    "The chances of hitting the 'snooze' button on your alarm are directly proportional to how early you have to wake up.",
    "Adulting is like looking both ways before crossing the street and then getting hit by an airplane.",
    "Socks will always disappear in the laundry, as if there's a black hole inside the washing machine.",
    "If the instructions say 'easy to open', you'll need scissors, a knife, a hammer, and a swear jar.",
    "The Wi-Fi signal becomes a hundred times more desirable when it's just out of reach.",
    "Your phone’s battery is at its most efficient when you're procrastinating.",
    "The likelihood of someone calling your name increases dramatically the moment you put in your earphones.",
    "When you drop your phone, your reflexes suddenly match those of a superhero.",
    "Everyone has that one plastic bag full of other plastic bags in their house.",
    "You never realize how loud your everyday activities are until you try to do them quietly in the middle of the night.",
    "There's an inverse relationship between how much you need your phone and how much battery it has left.",
    "When you’re late, every traffic light becomes a red light.",
  ];

  const [currentStatement, setCurrentStatement] = useState(
    statements[Math.floor(Math.random() * statements.length)],
  );

  const updateStatement = () => {
    let newStatement;
    do {
      newStatement = statements[Math.floor(Math.random() * statements.length)];
    } while (newStatement === currentStatement);
    setCurrentStatement(newStatement);

    // Increment the click count and check if it has reached 5
    setClickCount((prevCount) => {
      if (prevCount >= 4) {
        // 4 because we're about to add 1
        setShowLogin(true);
        return 5; // Return 5 to prevent further incrementing
      }
      return prevCount + 1;
    });
  };

  return (
    <div className="px-8 py-24 ring-blue-500 mx-auto">
      <div className="flex flex-col space-x-2 py-24">
        <div className="flex flex-col justify-center items-end mx-auto space-x-4">
          <div
            className="relative flex items-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
    
          </div>

          <p className="text-center text-white bg-violet-950 rounded-full py-4 mx-auto p-4 cursor-pointer">
            {currentStatement}
          </p>
        </div>

        <div className="flex flex-col items-center py-4">
          <div className="flex flex-row space-x-12 py-4 justify-center">
            <AiFillLike
              size={40}
              className="cursor-pointer text-green-600"
              onClick={updateStatement}
            />
            <AiOutlineDislike
              size={40}
              className="cursor-pointer text-red-300"
              onClick={updateStatement}
            />
          </div>
          <div className="mt-4">
            <BsSkipEndCircle
              size={35}
              onClick={updateStatement}
              className="opacity-60"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
