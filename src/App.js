import React, { useState } from 'react';
import './App.css';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import happyCouple from './assets/happy-couple.png';
import backgroundVideo from './assets/background-video.mp4';
import backgroundMusic from './assets/music-background.mp3';

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [rejectStyle, setRejectStyle] = useState({});
  const { width, height } = useWindowSize();

  const moveRejectButton = () => {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();

    const newTop = Math.random() * (containerRect.height - 50);
    const newLeft = Math.random() * (containerRect.width - 100);

    setRejectStyle({
      position: 'absolute',
      top: `${newTop}px`,
      left: `${newLeft}px`,
    });
  };

  const handleAcceptClick = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowPopup(true);
    }, 3000);
  };

  return (
    <div className="app">
      {showConfetti && <Confetti width={width} height={height} />}
      <video className="background-video" autoPlay loop>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <audio className="background-music" autoPlay loop>
        <source src={backgroundMusic} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
      <div className="container">
        <h1>Você quer ser minha namorada?</h1>
        {!showPopup && (
          <div className="buttons">
            <button id="accept" onClick={handleAcceptClick}>Aceitar</button>
            <button
              id="reject"
              style={rejectStyle}
              onMouseOver={moveRejectButton}
            >
              Recusar
            </button>
          </div>
        )}
      </div>
      {showPopup && (
        <div className="popup">
          <img src={happyCouple} alt="Casal Feliz" />
          <p>Bem vinda à minha vida.</p>
        </div>
      )}
    </div>
  );
}

export default App;
