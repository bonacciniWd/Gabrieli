import React, { useState, useEffect } from 'react';
import './App.css';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import happyCouple from './assets/happy-couple.png';
import backgroundVideo from './assets/background-video.mp4';

function App() {
  const [showInitialModal, setShowInitialModal] = useState(true);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showNoModal, setShowNoModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [rejectStyle, setRejectStyle] = useState({});
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const { width, height } = useWindowSize();

  const initialTexts = [
    'Olá Ana Julia, se você está vendo este texto é porque você me aturou o suficiente.',
    'Gostaria de lhe dizer que tem sido muito bom compartilhar momentos com você 😍',
    'E por isso estou aqui para lhe fazer algumas perguntas, gostaria de responder?'
  ];

  const [secondModalAnswers, setSecondModalAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: ''  // Adicionando a quarta pergunta no estado
  });

  useEffect(() => {
    if (currentTextIndex < initialTexts.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + initialTexts[currentTextIndex].charAt(currentText.length));
        if (currentText.length === initialTexts[currentTextIndex].length) {
          setCurrentTextIndex((prev) => prev + 1);
          setCurrentText('');
        }
      }, 50); // Aumentar a velocidade de escrita
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentTextIndex, initialTexts]);

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
    }, 5000);
  };

  const handleInitialYesClick = () => {
    setShowInitialModal(false);
    setShowSecondModal(true);
  };

  const handleInitialNoClick = () => {
    setShowInitialModal(false);
    setShowNoModal(true);
  };

  const handleSecondYesClick = () => {
    setShowSecondModal(false);
    setShowQuestion(true);
  };

  const handleNoModalClose = () => {
    setShowNoModal(false);
  };

  const handleSecondModalChange = (event) => {
    const { name, value } = event.target;
    setSecondModalAnswers((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const canProceedFromSecondModal = secondModalAnswers.question1 && secondModalAnswers.question2 && secondModalAnswers.question3 && secondModalAnswers.question4;

  return (
    <div className="app">
      {showConfetti && <Confetti width={width} height={height} />}
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {showInitialModal && (
        <div className="initial-modal">
          <div className="initial-modal-content">
            {initialTexts.slice(0, currentTextIndex + 1).map((text, index) => (
              <p key={index}>{index === currentTextIndex ? currentText : text}</p>
            ))}
            {currentTextIndex >= initialTexts.length && (
              <div className="initial-buttons">
                <button onClick={handleInitialYesClick}>Sim</button>
                <button onClick={handleInitialNoClick}>Não</button>
              </div>
            )}
          </div>
        </div>
      )}

      {showNoModal && (
        <div className="no-modal">
          <div className="no-modal-content">
            <p>QUE PENA!</p>
            <button onClick={handleNoModalClose}>Fechar</button>
          </div>
        </div>
      )}

      {showSecondModal && (
        <div className="second-modal">
          <div className="second-modal-content">
            <p>🛈 Você acredita em amor à primeira vista?</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="question1"
                  value="sim"
                  checked={secondModalAnswers.question1 === 'sim'}
                  onChange={handleSecondModalChange}
                />
                Sim
              </label>
              <label>
                <input
                  type="radio"
                  name="question1"
                  value="nao"
                  checked={secondModalAnswers.question1 === 'nao'}
                  onChange={handleSecondModalChange}
                />
                Não
              </label>
            </div>
            <p>🛈 Você acredita que nossa conexão vai além do físico?</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="question2"
                  value="sim"
                  checked={secondModalAnswers.question2 === 'sim'}
                  onChange={handleSecondModalChange}
                />
                Sim
              </label>
              <label>
                <input
                  type="radio"
                  name="question2"
                  value="nao"
                  checked={secondModalAnswers.question2 === 'nao'}
                  onChange={handleSecondModalChange}
                />
                Não
              </label>
            </div>
            <p>🛈 Você confia em mim?</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="question3"
                  value="sim"
                  checked={secondModalAnswers.question3 === 'sim'}
                  onChange={handleSecondModalChange}
                />
                Sim
              </label>
              <label>
                <input
                  type="radio"
                  name="question3"
                  value="nao"
                  checked={secondModalAnswers.question3 === 'nao'}
                  onChange={handleSecondModalChange}
                />
                Não
              </label>
            </div>
            <p>🛈 Você sente que crescemos juntos emocionalmente desde que nos conhecemos?</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="question4"
                  value="sim"
                  checked={secondModalAnswers.question4 === 'sim'}
                  onChange={handleSecondModalChange}
                />
                Sim
              </label>
              <label>
                <input
                  type="radio"
                  name="question4"
                  value="nao"
                  checked={secondModalAnswers.question4 === 'nao'}
                  onChange={handleSecondModalChange}
                />
                Não
              </label>
            </div>
            {canProceedFromSecondModal && (
              <button onClick={handleSecondYesClick}>Prosseguir</button>
            )}
          </div>
        </div>
      )}

      {showQuestion && (
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
      )}

      {showPopup && (
        <div className="popup">
          <img src={happyCouple} alt="Casal Feliz" />
          <p>Você fez uma boa escolha, parabéns! <br/> Bem vinda à minha vida!</p>
        </div>
      )}
    </div>
  );
}

export default App;
