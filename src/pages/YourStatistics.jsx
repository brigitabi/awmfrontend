import React, { useState, useEffect } from 'react';
import { useUUID } from "../components/CustomHookUuid";


const backendUrl = process.env.REACT_APP_BACKEND_URL;


const YourStatistics = () => {
  const [statistics, setStatistics] = useState({ agree: 0, disagree: 0 });
  const [agreedStatements, setAgreedStatements] = useState([]);
  const [disagreedStatements, setDisagreedStatements] = useState([]);
  const uuid = useUUID();

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // Fetch reactions data for the specific player
        const response = await fetch(`${backendUrl}/api/reactions/${uuid}`);
        if (response.ok) {
          const reactions = await response.json();

          console.log(reactions, "Reactionss - statistics");

          const filteredReactions = reactions.filter(reaction => reaction.reaction !== 'pass');
          
          // Calculate statistics
          const totalReactions = filteredReactions.length;
          const agreeCount = filteredReactions.filter(reaction => reaction.reaction === 'thumbsUp').length;
          const disagreeCount = filteredReactions.filter(reaction => reaction.reaction === 'thumbsDown').length;
          const agreePercentage = (agreeCount / totalReactions) * 100;
          const disagreePercentage = (disagreeCount / totalReactions) * 100;
          
          setStatistics({ agree: agreePercentage, disagree: disagreePercentage });

          const agreed = reactions.filter(reaction => reaction.reaction === 'thumbsUp').map(reaction => reaction.statement_id);
          const disagreed = reactions.filter(reaction => reaction.reaction === 'thumbsDown').map(reaction => reaction.statement_id);

          setAgreedStatements(agreed);
          setDisagreedStatements(disagreed);
          
        } else {
          console.error('Failed to fetch reactions:', response.status);
        }
      } catch (error) {
        console.error('Error fetching reactions:', error);
      }
    };

    fetchStatistics();
  }, [uuid]); // Empty dependency array ensures this effect runs only once after mount


  const handleReactionClick = (reactionType) => {
    if (reactionType === 'thumbsUp') {
      console.log('Agreed statements:', agreedStatements);
      // Implement logic to display agreed statements
    } else if (reactionType === 'thumbsDown') {
      console.log('Disagreed statements:', disagreedStatements);
      // Implement logic to display disagreed statements
    }
  };

  return (
    <>
    <div className='flex flex-col md:flex-row justify-center md:space-x-4 items-center '>
      {/* <h1 className='text-white text-center py-8'>Agree with Me Overview</h1> */}
        <div className='mb-4 md:mb-0 cursor-pointer' onClick={() => handleReactionClick('thumbsUp')}>
          <p> Agree 👍 {statistics.agree.toFixed(2)}%</p>
          <div style={{ width: '200px', height: '20px', backgroundColor: 'lightgreen', borderRadius: '5px' }}>
            <div style={{ width: `${statistics.agree}%`, height: '100%', backgroundColor: 'green', borderRadius: '5px' }}></div>
          </div>
        </div>
        <div className='cursor-pointer' onClick={() => handleReactionClick('thumbsDown')}>
          <p>Disagree 👎 {statistics.disagree.toFixed(2)}%</p>
          <div style={{ width: '200px', height: '20px', backgroundColor: 'rgb(248 113 113)', borderRadius: '5px' }}>
            <div style={{ width: `${statistics.disagree}%`, height: '100%', backgroundColor: 'rgb(185 28 28)', borderRadius: '5px' }}></div>
          </div>
        </div>
      </div>
      </>
    
  );
};

export default YourStatistics;
