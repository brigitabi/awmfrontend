import React, { useState, useEffect } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const GlobalStatistics = () => {
  const [statistics, setStatistics] = useState({ agree: 0, disagree: 0 });

  useEffect(() => {
    const fetchGlobalStatistics = async () => {
      try {
        // Fetch reactions data for all players
        const response = await fetch(`${backendUrl}/api/reactions`);
        if (response.ok) {
          const reactions = await response.json();

          console.log(reactions, 'global reactions')

          // Calculate global statistics
          const totalReactions = reactions.length;
          const agreeCount = reactions.filter(reaction => reaction.reaction === 'thumbsUp').length;
          const disagreeCount = reactions.filter(reaction => reaction.reaction === 'thumbsDown').length;
          const agreePercentage = (agreeCount / totalReactions) * 100;
          const disagreePercentage = (disagreeCount / totalReactions) * 100;

          setStatistics({ agree: agreePercentage, disagree: disagreePercentage });
        } else {
          console.error('Failed to fetch global reactions:', response.status);
        }
      } catch (error) {
        console.error('Error fetching global reactions:', error);
      }
    };

    fetchGlobalStatistics();
  }, []);

  return (
    <>
      <div className='flex flex-col md:flex-row justify-center md:space-x-4 items-center '>
        <div>
          <p> Agree 👍 {statistics.agree.toFixed(2)}%</p>
          <div style={{ width: '200px', height: '20px', backgroundColor: 'lightgreen', borderRadius: '5px' }}>
            <div style={{ width: `${statistics.agree}%`, height: '100%', backgroundColor: 'green', borderRadius: '5px' }}></div>
          </div>
        </div>
        <div>
          <p> Disagree 👎 {statistics.disagree.toFixed(2)}%</p>
          <div style={{ width: '200px', height: '20px', backgroundColor: 'rgb(248 113 113)', borderRadius: '5px' }}>
            <div style={{ width: `${statistics.disagree}%`, height: '100%', backgroundColor: 'rgb(185 28 28)', borderRadius: '5px' }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalStatistics;
