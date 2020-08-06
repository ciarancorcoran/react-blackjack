import React, { FunctionComponent, useState, useEffect } from 'react'

import { GameStatus } from '../constants/enums/GameStatus'
import { Card } from '../constants/types/Card'
import { Score } from '../constants/types/Score'

import CardComponent from '../components/Card/CardComponent'
import ScoreComponent from '../components/Score/ScoreComponent'
import GameControls from '../components/GameControls/GameControls'

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

  const calculateScore = (card: Card, score: number) => {
    if (card.value === 1 && (score + 11 <= 21)) {
      return score + 11
    }
    return score + card.value
  }

  const isBlackJack = (holderDeck: Card[]) => {
    const isFirstComboBlackJack = (holderDeck[0].isFaceCard || holderDeck[0].value === 10) && holderDeck[1].value === 1 ? true : false
    const isSecondComboBlackJack = (holderDeck[1].isFaceCard || holderDeck[1].value === 10) && holderDeck[0].value === 1 ? true : false
    return isFirstComboBlackJack || isSecondComboBlackJack ? true : false
  }

  const handleStartGame = () => {
    const startingPlayerCards: Card[] = [deck[0], deck[1]]
    const startingDealerCards: Card[] = [deck[2]]
    const updatedDeck = deck.filter((r, i) => i > 2)
    const startingPlayerScore = isBlackJack(startingPlayerCards) ? 21 : startingPlayerCards[0].value + startingPlayerCards[1].value
    const startingDealerScore = startingDealerCards[0].value

    setGameState(GameStatus.playerTurn)
    setPlayerCards([...startingPlayerCards])
    setDealerCards([...startingDealerCards])
    setScore({playerScore: startingPlayerScore, dealerScore: startingDealerScore})
    setDeck([...updatedDeck])
  }

  const handleHitClick = () => {
    if (gameState !== GameStatus.playerTurn) { return }
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
    if (gameState !== GameStatus.playerTurn) { return }

    setGameState(GameStatus.dealerTurn)
    dealDealerCards(dealerCards, deck, score.dealerScore)
  }

  const dealDealerCards = (dealerCards: Card[], currentDeck: Card[], dealerScore: number) => {
    const updatedDealerCards = [...dealerCards, currentDeck[0]]
    const updatedDealerScore = isBlackJack(updatedDealerCards) ? 21 : calculateScore(currentDeck[0], dealerScore)
    const updatedDeck = currentDeck.filter((r, i) => i >= 1)

    if (updatedDealerScore >= 21 || updatedDealerScore >= score.playerScore) {
      setGameState(GameStatus.stopped)
      updateDealerCards(updatedDealerCards, updatedDeck, updatedDealerScore)
      return
    }

    dealDealerCards(updatedDealerCards, updatedDeck, updatedDealerScore)
  }

  const updateDealerCards = (dealerCards: Card[], currentDeck: Card[], dealerScore: number) => {
    setDealerCards([...dealerCards])
    setScore({...score, dealerScore})
    setDeck([...currentDeck])
  }

  return (
    <>
      <CardComponent cards={playerCards} cardType={'Player Cards'} />
      <CardComponent cards={dealerCards} cardType={'Dealer Cards'} />
      <ScoreComponent score={score} />
      <GameControls
        handleStartGame={handleStartGame}
        handleHitClick={handleHitClick}
        handleStickClick={handleStickClick}
      />
    </>
  )
}

export default Game