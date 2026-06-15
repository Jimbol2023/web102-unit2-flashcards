import { useState } from 'react'
import './App.css'

const flashcards = [
  {
    question: 'What is phishing?',
    answer:
      'Phishing is a fake message or website that tries to trick people into sharing private information.',
    category: 'Social Engineering',
  },
  {
    question: 'What makes a password strong?',
    answer:
      'A strong password is long, unique, and hard to guess. It should not be reused on other accounts.',
    category: 'Passwords',
  },
  {
    question: 'What is two-factor authentication?',
    answer:
      'Two-factor authentication adds a second proof of identity, like a code from an app, after a password.',
    category: 'Passwords',
  },
  {
    question: 'What is malware?',
    answer:
      'Malware is software made to harm a computer, steal information, or take control of a system.',
    category: 'Malware',
  },
  {
    question: 'What is ransomware?',
    answer:
      'Ransomware is malware that locks files or devices and demands payment to unlock them.',
    category: 'Malware',
  },
  {
    question: 'What does a firewall do?',
    answer:
      'A firewall helps block unwanted network traffic and allows trusted traffic to pass through.',
    category: 'Network Security',
  },
  {
    question: 'What does HTTPS help protect?',
    answer:
      'HTTPS helps protect information sent between a browser and a website by encrypting the connection.',
    category: 'Web Security',
  },
  {
    question: 'What is social engineering?',
    answer:
      'Social engineering is when an attacker manipulates people into giving access, information, or money.',
    category: 'Social Engineering',
  },
]

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const currentCard = flashcards[currentCardIndex]
  const categoryClass = currentCard.category
    .toLowerCase()
    .replaceAll(' ', '-')

  function flipCard() {
    setIsFlipped(!isFlipped)
  }

  function showRandomCard() {
    let randomIndex = Math.floor(Math.random() * flashcards.length)

    while (randomIndex === currentCardIndex && flashcards.length > 1) {
      randomIndex = Math.floor(Math.random() * flashcards.length)
    }

    setCurrentCardIndex(randomIndex)
    setIsFlipped(false)
  }

  return (
    <div className="app">
      <div className="header-section">
        <p className="eyebrow">Study Set</p>
        <h1>Cybersecurity Flashcards</h1>
        <p className="description">
          Practice beginner cybersecurity terms, safe habits, and common online
          threats one card at a time.
        </p>
        <div className="card-count">Total cards: {flashcards.length}</div>
      </div>

      <div className="flashcard-section">
        <div
          className={`flashcard ${categoryClass} ${isFlipped ? 'flipped' : ''}`}
          onClick={flipCard}
        >
          <div className="card-category">{currentCard.category}</div>
          <div className="card-label">{isFlipped ? 'Answer' : 'Question'}</div>
          <div className="card-text">
            {isFlipped ? currentCard.answer : currentCard.question}
          </div>
          <div className="card-hint">Click card to flip</div>
        </div>

        <button className="next-button" type="button" onClick={showRandomCard}>
          Next Random Card
        </button>
      </div>
    </div>
  )
}

export default App
