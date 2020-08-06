import React, { FunctionComponent, useState, useEffect } from 'react'

import { GameStatus } from '../constants/enums/GameStatus'
import { Card } from '../constants/types/Card'
import { Score } from '../constants/types/Score'

import CardComponent from '../components/Card/CardComponent'
import ScoreComponent from '../components/Score/ScoreComponent'
import GameControls from '../components/GameControls/GameControls'

// scores and rules
export const calculateScore = (card: Card, score: number) => card.value + score
export const cardsContainAce = (holderCards: Card[]) => holderCards.some(r => r.value === 1)
export const isHighAce = (holderCards: Card[], score: number) => cardsContainAce(holderCards) && score + 10 <= 21 ? true : false
export const isBlackJack = (holderDeck: Card[]) => holderDeck.reduce((a, b) => ((a + b.value)), 10) === 21 ? true : false

type GameProps = {
  startingDeck: Card[]
}

const Game: FunctionComponent<GameProps> = ({ startingDeck }) => {
  const [gameState, setGameState] = useState<GameStatus>(GameStatus.stopped)
  const [deck, setDeck] = useState<Card[]>([])
  const [playerCards, setPlayerCards] = useState<Card[]>([])
  const [dealerCards, setDealerCards] = useState<Card[]>([])
  const [score, setScore] = useState<Score>({playerScore: 0, dealerScore: 0})

  useEffect(() => {
    setDeck(startingDeck)
    setGameState(GameStatus.started)
  }, [startingDeck])

  const handleStartGame = () => {
    const startingPlayerCards: Card[] = [deck[0], deck[1]]
    const startingDealerCards: Card[] = [deck[2]]
    const startingPlayerScore = cardsContainAce(startingPlayerCards) && isBlackJack(startingPlayerCards) ? 21 : startingPlayerCards[0].value + startingPlayerCards[1].value
    const startingDealerScore = startingDealerCards[0].value
    const updatedDeck = deck.filter((r, i) => i > 2)

    setGameState(GameStatus.playerTurn)
    setPlayerCards([...startingPlayerCards])
    setDealerCards([...startingDealerCards])
    setScore({...score, playerScore: startingPlayerScore, dealerScore: startingDealerScore})
    setDeck([...updatedDeck])
  }

  const handleHitClick = () => {
    if (gameState !== 2) { return }

    const updatedPlayerScore = calculateScore(deck[0], score.playerScore)
    setPlayerCards([...playerCards, deck[0]])
    setScore({...score, playerScore: updatedPlayerScore})

    if (updatedPlayerScore > 21) {
      setGameState(GameStatus.stopped)
      return
    }

    setDeck([...deck.filter((r, i) => i >= 1)])
  }

  const handleStickClick = () => {
    if (gameState !== 2) { return }
    setGameState(GameStatus.dealerTurn)
    dealDealerCards(dealerCards, deck,
      {...score, playerScore: isHighAce(playerCards, score.playerScore) ? score.playerScore + 10 : score.playerScore})
  }

  const dealDealerCards = (dealerCards: Card[], currentDeck: Card[], updatedScore: Score) => {
    const updatedDealerCards = [...dealerCards, currentDeck[0]]
    const updatedDealerScore = isBlackJack(updatedDealerCards) ? 21 : calculateScore(currentDeck[0], updatedScore.dealerScore)
    const latestScore = {...updatedScore, dealerScore: updatedDealerScore}
    const updatedDeck = currentDeck.filter((r, i) => i >= 1)

    if (updatedDealerScore >= 21 || updatedDealerScore > latestScore.playerScore) {
      setGameState(GameStatus.stopped)
      updateDealerCards(updatedDealerCards, updatedDeck, latestScore)
      return
    }

    dealDealerCards(updatedDealerCards, updatedDeck, latestScore)
  }

  const updateDealerCards = (dealerCards: Card[], currentDeck: Card[], updatedScore: Score) => {
    setDealerCards([...dealerCards])
    setDeck([...currentDeck])
    setScore({...updatedScore, dealerScore: isHighAce(playerCards, updatedScore.playerScore) ? updatedScore.dealerScore + 10 : updatedScore.dealerScore})
  }

  return (
    <>
      <CardComponent cards={playerCards} cardType={'Player Cards'} />
      <CardComponent cards={dealerCards} cardType={'Dealer Cards'} />
      <ScoreComponent
        score={score}
        playerCardsContainAce={cardsContainAce(playerCards)}
        dealerCardsContainAce={cardsContainAce(dealerCards)}
        isPlayersTurn={gameState === 2 ? true : false} />
      <GameControls
        handleStartGame={handleStartGame}
        handleHitClick={handleHitClick}
        handleStickClick={handleStickClick}
      />
    </>
  )
}

export default Game
