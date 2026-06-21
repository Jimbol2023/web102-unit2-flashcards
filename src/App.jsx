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

const initialCardOrder = flashcards.map((_, index) => index)

const punctuationRegex = /[^\w\s]/g
const extraSpaceRegex = /\s+/g

function normalizeAnswer(text) {
  return text
    .toLowerCase()
    .replace(punctuationRegex, ' ')
    .replace(extraSpaceRegex, ' ')
    .trim()
}

function isGuessCorrect(guess, answer) {
  const normalizedGuess = normalizeAnswer(guess)
  const normalizedAnswer = normalizeAnswer(answer)
  const isReasonablePartialGuess = normalizedGuess.length >= 4

  if (!normalizedGuess) {
    return false
  }

  return (
    normalizedGuess === normalizedAnswer ||
    (isReasonablePartialGuess && normalizedAnswer.includes(normalizedGuess))
  )
}

function shuffleCards(cards) {
  const shuffledCards = [...cards]

  for (let i = shuffledCards.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const currentCard = shuffledCards[i]

    shuffledCards[i] = shuffledCards[randomIndex]
    shuffledCards[randomIndex] = currentCard
  }

  return shuffledCards
}

function Flashcard({ card, isFlipped, onFlip }) {
  const categoryClass = card.category.toLowerCase().replaceAll(' ', '-')

  return (
    <button
      className={`flashcard ${categoryClass} ${isFlipped ? 'flipped' : ''}`}
      type="button"
      onClick={onFlip}
    >
      <span className="card-category">{card.category}</span>
      <span className="card-label">{isFlipped ? 'Answer' : 'Question'}</span>
      <span className="card-text">
        {isFlipped ? card.answer : card.question}
      </span>
      <span className="card-hint">Click card to flip</span>
    </button>
  )
}

function GuessForm({ guess, feedback, onGuessChange, onSubmitGuess }) {
  const feedbackMessage =
    feedback === 'correct'
      ? 'Correct! Nice match.'
      : 'Not quite. Flip the card to review the answer.'

  return (
    <form className="guess-form" onSubmit={onSubmitGuess}>
      <label className="guess-label" htmlFor="guess">
        Type your guess before flipping
      </label>
      <div className="guess-row">
        <input
          className="guess-input"
          id="guess"
          name="guess"
          type="text"
          value={guess}
          onChange={(event) => onGuessChange(event.target.value)}
          placeholder="Enter your answer"
        />
        <button className="submit-button" type="submit">
          Submit Guess
        </button>
      </div>
      {feedback && (
        <p className={`feedback-message ${feedback}`}>{feedbackMessage}</p>
      )}
    </form>
  )
}

function NavigationControls({
  currentCardNumber,
  totalCards,
  isFirstCard,
  isLastCard,
  onPrevious,
  onNext,
  onShuffle,
}) {
  return (
    <div className="navigation-panel">
      <div className="navigation-buttons">
        <button
          className="nav-button"
          type="button"
          onClick={onPrevious}
          disabled={isFirstCard}
        >
          Previous
        </button>
        <button className="shuffle-button" type="button" onClick={onShuffle}>
          Shuffle
        </button>
        <button
          className="nav-button"
          type="button"
          onClick={onNext}
          disabled={isLastCard}
        >
          Next
        </button>
      </div>
      <p className="card-progress">
        Card {currentCardNumber} of {totalCards}
      </p>
    </div>
  )
}

function App() {
  const [cardOrder, setCardOrder] = useState(initialCardOrder)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState('')
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)

  const currentCard = flashcards[cardOrder[currentCardIndex]]
  const isFirstCard = currentCardIndex === 0
  const isLastCard = currentCardIndex === cardOrder.length - 1

  function resetCardState() {
    setGuess('')
    setFeedback('')
    setIsFlipped(false)
  }

  function flipCard() {
    setIsFlipped(!isFlipped)
  }

  function submitGuess(event) {
    event.preventDefault()

    if (feedback === 'correct') {
      return
    }

    if (isGuessCorrect(guess, currentCard.answer)) {
      const nextStreak = currentStreak + 1

      setFeedback('correct')
      setCurrentStreak(nextStreak)
      setLongestStreak(Math.max(longestStreak, nextStreak))
      return
    }

    setFeedback('incorrect')
    setCurrentStreak(0)
  }

  function showPreviousCard() {
    if (isFirstCard) {
      return
    }

    setCurrentCardIndex(currentCardIndex - 1)
    resetCardState()
  }

  function showNextCard() {
    if (isLastCard) {
      return
    }

    setCurrentCardIndex(currentCardIndex + 1)
    resetCardState()
  }

  function shuffleCardOrder() {
    setCardOrder(shuffleCards(cardOrder))
    setCurrentCardIndex(0)
    resetCardState()
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
        <div className="stats-row">
          <div className="stat-pill">Total cards: {flashcards.length}</div>
          <div className="stat-pill">Current streak: {currentStreak}</div>
          <div className="stat-pill">Longest streak: {longestStreak}</div>
        </div>
      </div>

      <div className="flashcard-section">
        <Flashcard
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={flipCard}
        />

        <GuessForm
          guess={guess}
          feedback={feedback}
          onGuessChange={setGuess}
          onSubmitGuess={submitGuess}
        />

        <NavigationControls
          currentCardNumber={currentCardIndex + 1}
          totalCards={flashcards.length}
          isFirstCard={isFirstCard}
          isLastCard={isLastCard}
          onPrevious={showPreviousCard}
          onNext={showNextCard}
          onShuffle={shuffleCardOrder}
        />
      </div>
    </div>
  )
}

export default App
