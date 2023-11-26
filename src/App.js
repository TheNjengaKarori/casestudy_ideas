import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentIdea, setCurrentIdea] = useState(null);
  const [ideaContainerColorIndex, setIdeaContainerColorIndex] = useState(0);

  const updateCurrentIdea = () => {
    fetch('/ideas.json')
      .then(response => response.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.ideas.length);
        setCurrentIdea(data.ideas[randomIndex]);
      })
      .catch(error => console.error('Error fetching ideas:', error));
  };

  useEffect(() => {
    updateCurrentIdea();
  }, []); // Add updateCurrentIdea to the dependency array

  const handleNewChallenge = () => {
    fetch('/ideas.json')
      .then(response => response.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.ideas.length);
        setCurrentIdea(data.ideas[randomIndex]);

        // Set the next color in the predefined order
        const rainbowColors = ['#FF4500', '#8B4513', '#483D8B', '#006400', '#A52A2A', '#8B0000', '#2F4F4F', '#8B008B', '#8B008B', '#483C32','#1E90FF'];
        const nextColorIndex = (ideaContainerColorIndex + 1) % rainbowColors.length;
        setIdeaContainerColorIndex(nextColorIndex);
      })
      .catch(error => console.error('Error fetching ideas:', error));
  };

  const getIdeaContainerColor = () => {
    const rainbowColors = ['#FF4500', '#8B4513', '#483D8B', '#006400', '#A52A2A', '#8B0000', '#2F4F4F', '#8B008B', '#8B008B', '#483C32','#1E90FF',];
    return rainbowColors[ideaContainerColorIndex];
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo-container">
          <img src="Idealab.png" alt="Logo" className="logo" />
        </div>
      </nav>
      <div className="main-content">
        <h1 className="main-heading">
          Take the scenic route to UI/UX design greatness with 100+ ideas for your case studies and personal projects.
        </h1>
        <div className="idea-container" style={{ backgroundColor: getIdeaContainerColor() }}>
          {currentIdea && (
            <div className="idea-and-desc">
              <h2>{currentIdea.idea}</h2>
              <p>{currentIdea.description}</p>
            </div>
          )}
        </div>
        <button className="new-challenge-button" onClick={handleNewChallenge}>
          <span style={{ paddingRight: '8px' }}>New Challenge</span>
          <i className="material-icons" style={{ paddingLeft: '8px' }}>cached</i>
        </button>
      </div>
    </div>
  );
}

export default App;
