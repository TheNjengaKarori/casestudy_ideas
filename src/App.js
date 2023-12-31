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
    const rainbowColors = ['#FF4500', '#8B4513', '#483D8B', '#006400', '#A52A2A', '#8B0000', '#2F4F4F', '#8B008B', '#8B008B', '#483C32','#1E90FF'];
    return rainbowColors[ideaContainerColorIndex];
  };

  const shareOnSocialMedia = (platform) => {
    const shareText = `Check out this awesome website for UX/UI design inspiration at `;
    let shareUrl;
  
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=https://uxideas.vercel.app/&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=https://uxideas.vercel.app/&text=${encodeURIComponent(shareText)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=https://uxideas.vercel.app/&title=${encodeURIComponent(shareText)}`;
        break;
      case 'email':
        window.location.href = `mailto:?subject=Check%20out%20this%20awesome%20UX%2FUI%20design%20inspiration&body=${encodeURIComponent(shareText)}`;
        break;
      default:
        break;
    }
  
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };
  

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo-container">
          <img src="Idealab.png" alt="Logo" className="logo" />
        </div>
        {/* Product Hunt link */}
        <div className="productHuntLink" dangerouslySetInnerHTML={{ __html: '<a href="https://www.producthunt.com/posts/uxideas?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-uxideas" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=427083&theme=dark" alt="UXIdeas - &#0034;Inspire&#0032;Your&#0032;Designs&#0032;Limitless&#0032;UI&#0047;UX&#0032;Ideas&#0033;&#0034; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>' }} />
      </nav>
      <div className="main-content">
        <h1 className="main-heading">
          Take the scenic route to UI/UX design greatness with 1000+ ideas for your case studies and personal projects.
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

         {/* Social Media Links */}
         <div className="social-media-links">
          <button onClick={() => shareOnSocialMedia('facebook')}>
            <i className="fab fa-facebook x2"></i>
          </button>
          <button onClick={() => shareOnSocialMedia('twitter')}>
            <i className="fab fa-twitter"></i>
          </button>
          <button onClick={() => shareOnSocialMedia('whatsapp')}>
            <i className="fab fa-whatsapp"></i>
          </button>
          <button onClick={() => shareOnSocialMedia('linkedin')}>
            <i className="fab fa-linkedin"></i>
          </button>
          <button onClick={() => shareOnSocialMedia('email')}>
            <i className="fas fa-envelope"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;