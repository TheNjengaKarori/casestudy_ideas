import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentIdea, setCurrentIdea] = useState(null);
  const [ideaContainerColorIndex, setIdeaContainerColorIndex] = useState(0);
  const [usedIdeas, setUsedIdeas] = useState([]);

  useEffect(() => {
    fetch('/ideas.json')
      .then(response => response.json())
      .then(data => {
        updateCurrentIdea(data);
      })
      .catch(error => console.error('Error fetching ideas:', error));
  }, []);

  const updateCurrentIdea = (data) => {
    const unusedIdeas = data.ideas.filter(idea => !usedIdeas.includes(idea.id));
    if (unusedIdeas.length === 0) {
      // All ideas have been used, reset usedIdeas array
      setUsedIdeas([]);
    }
    const randomIndex = Math.floor(Math.random() * unusedIdeas.length);
    const newIdea = unusedIdeas[randomIndex];
    setCurrentIdea(newIdea);
    setUsedIdeas([...usedIdeas, newIdea.id]);

    // Set the next color in the predefined order, ensuring it's different from the current color
    let nextColorIndex = (ideaContainerColorIndex + 1) % rainbowColors.length;
    while (nextColorIndex === ideaContainerColorIndex) {
      nextColorIndex = Math.floor(Math.random() * rainbowColors.length);
    }
    setIdeaContainerColorIndex(nextColorIndex);
  };

  const handleNewChallenge = () => {
    fetch('/ideas.json')
      .then(response => response.json())
      .then(data => {
        updateCurrentIdea(data);
      })
      .catch(error => console.error('Error fetching ideas:', error));
  };

  const rainbowColors = ['#FF4500', '#8B4513', '#483D8B', '#006400', '#A52A2A', '#8B0000', '#2F4F4F', '#8B008B', '#8B008B', '#483C32', '#1E90FF', "#8B0000",
  "#191970","#2F4F4F","#556B2F","#008B8B","#483D8B","#8B008B","#8B4513","#B8860B","#8FBC8F","#9932CC","#B22222"];

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo-container">
          <img src="Idealab.png" alt="Logo" className="logo" />
        </div>
      </nav>
      <div className="main-content">
        <h1 className="main-heading">
          Take the scenic route to UI/UX design greatness with 1000+ ideas for your case studies and personal projects.
        </h1>
        <div className="idea-container" style={{ backgroundColor: rainbowColors[ideaContainerColorIndex] }}>
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
