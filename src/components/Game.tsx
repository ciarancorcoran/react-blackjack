import React, { FunctionComponent, useState, useEffect } from 'react'

import { GameStatus } from '../constants/enums/GameStatus'
import { WinStatus } from '../constants/enums/WinStatus'
import { Card } from '../constants/types/Card'
import { Score } from '../constants/types/Score'

import {
  calculateScore,
  cardsContainAce,
  isHighAce,
  isBlackJack,
  pickRandomCardAndRemove,
  checkWinner,
  checkForTie
} from '../utils/GameUtils'

import { GameContainer } from './GameStyles'

import CardComponent from './Card/CardComponent'
import ScoreComponent from './Score/ScoreComponent'
import GameControls from './GameControls/GameControls'

type GameProps = {
  startingDeck: Card[]
}

const Game: FunctionComponent<GameProps> = ({ startingDeck }) => {
  const [gameState, setGameState] = useState<GameStatus | undefined>()
  const [deck, setDeck] = useState<Card[]>([])
  const [playerCards, setPlayerCards] = useState<Card[]>([])
  const [dealerCards, setDealerCards] = useState<Card[]>([])
  const [score, setScore] = useState<Score>({playerScore: 0, dealerScore: 0})
  const [resultMessage, setResultMessage] = useState<string | undefined>()

  useEffect(() => {
    setGameState(GameStatus.STOPPED)
  }, [])

  const handleStartGame = () => {
    const firstPickCardAndDeck = pickRandomCardAndRemove(startingDeck)
    const secondPickedCardAndDeck = pickRandomCardAndRemove(firstPickCardAndDeck.filteredDeck)
    const startingPlayerCards: Card[] = [firstPickCardAndDeck.randomCard, secondPickedCardAndDeck.randomCard]

    const dealerCardAndFilteredDeck = pickRandomCardAndRemove(secondPickedCardAndDeck.filteredDeck)
    const startingDealerCards: Card[] = [dealerCardAndFilteredDeck.randomCard]

    const startingPlayerScore = cardsContainAce(startingPlayerCards) && isBlackJack(startingPlayerCards) ? 21 : startingPlayerCards[0].value + startingPlayerCards[1].value
    const startingDealerScore = startingDealerCards[0].value

    setGameState(GameStatus.PLAYER_TURN)
    setResultMessage(undefined)
    setDeck(dealerCardAndFilteredDeck.filteredDeck)
    setPlayerCards(startingPlayerCards)
    setDealerCards(startingDealerCards)
    setScore({...score, playerScore: startingPlayerScore, dealerScore: startingDealerScore})
  }

  const handleHitClick = () => {
    if (gameState !== 1) { return }

    const playerCardAndFilteredDeck = pickRandomCardAndRemove(deck)
    const updatedPlayerScore = calculateScore(playerCardAndFilteredDeck.randomCard, score.playerScore)

    setPlayerCards([...playerCards, playerCardAndFilteredDeck.randomCard])
    setScore({...score, playerScore: updatedPlayerScore})

    if (updatedPlayerScore > 21) {
      setResultMessage(WinStatus.PLAYER_BUST)
      setGameState(GameStatus.STOPPED)
      return
    } else {
      setDeck(playerCardAndFilteredDeck.filteredDeck)
    }
  }

  const handleStickClick = () => {
    if (gameState !== 1) { return }

    setGameState(GameStatus.DEALER_TURN)
    dealDealerCards(dealerCards, deck,
      {...score, playerScore: isHighAce(playerCards, score.playerScore) ? score.playerScore + 10 : score.playerScore})
  }

  const dealDealerCards = (dealerCards: Card[], currentDeck: Card[], updatedScore: Score) => {
    const dealerCardAndFilteredDeck = pickRandomCardAndRemove(currentDeck)
    const updatedDealerCards = [...dealerCards, dealerCardAndFilteredDeck.randomCard]

    const updatedDealerScore = updatedDealerCards.length === 2 && isBlackJack(updatedDealerCards) ? 21
      : calculateScore(dealerCardAndFilteredDeck.randomCard, updatedScore.dealerScore)
    const latestScore = {...updatedScore, dealerScore: updatedDealerScore}

    if (updatedDealerScore >= 21 || updatedDealerScore > latestScore.playerScore) {
      updateDealerCardsAndDetermineWinner(updatedDealerCards, latestScore)
      return
    } else if (checkForTie(latestScore)) {
      updateDealerCardsAndDetermineWinner(updatedDealerCards, latestScore)
      return
    } else {
      dealDealerCards(updatedDealerCards, dealerCardAndFilteredDeck.filteredDeck, latestScore)
      return
    }
  }

  const updateDealerCardsAndDetermineWinner = (dealerCards: Card[], updatedScore: Score) => {
    const updatedDealerScore = isHighAce(dealerCards, updatedScore.dealerScore) ? updatedScore.dealerScore + 10 : updatedScore.dealerScore
    const finalScore = {...updatedScore, dealerScore: updatedDealerScore}

    setGameState(GameStatus.STOPPED)
    setDealerCards(dealerCards)
    setResultMessage(checkWinner(finalScore))
    setScore(finalScore)
  }

  return (
    <GameContainer>
      <CardComponent cards={playerCards} cardType={'Player Cards'} />
      <CardComponent cards={dealerCards} cardType={'Dealer Cards'} />
      <ScoreComponent
        score={score}
        playerCardsContainAce={cardsContainAce(playerCards)}
        dealerCardsContainAce={cardsContainAce(dealerCards)}
        isPlayersTurn={gameState === 1 ? true : false}
        resultMessage={resultMessage} />
      <GameControls
        isGameStopped={gameState === 0 ? true : false}
        handleStartGame={handleStartGame}
        handleHitClick={handleHitClick}
        handleStickClick={handleStickClick}
      />
    </GameContainer>
  )
}

export default Game
