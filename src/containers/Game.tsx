import React, { FunctionComponent, useState, useEffect } from 'react'

import { GameStatus } from '../constants/enums/GameStatus'
import { Card } from '../constants/types/Card'
import { Score } from '../constants/types/Score'

import GameControls from '../components/GameControls/GameControls'

const Game: FunctionComponent = () => {
  const [gameState, setGameState] = useState<GameStatus>(GameStatus.stopped)
  const [deck, setDeck] = useState<Card[]>([])
  const [playerCards, setPlayerCards] = useState<Card[]>([])
  const [dealerCards, setDealerCards] = useState<Card[]>([])
  const [score, setScore] = useState<Score>({playerScore: 0, dealerScore: 0})

  useEffect(() => {
    if (gameState === GameStatus.stopped) {
      createAndShuffleDeck()
      setGameState(GameStatus.started)
    }
  })

  const createAndShuffleDeck = () => {
    // TODO: to be improved
    const suits = ['hearts',  'diamonds', 'spades', 'clubs']
    let cards: Card[] = []
    for (let i = 2; i < 11; i++) {
      cards.push({id: `${i.toString()} of hearts`, name: `${i.toString()} of hearts`, suit: 'hearts', value: i})
      cards.push({id: `${i.toString()} of diamonds`, name: `${i.toString()} of diamonds`, suit: 'diamonds', value: i})
      cards.push({id: `${i.toString()} of spades`, name: `${i.toString()} of spades`, suit: 'spades', value: i})
      cards.push({id: `${i.toString()} of clubs`, name: `${i.toString()} of clubs`, suit: 'clubs', value: i})
    }

    for (let i = 0; i < suits.length; i++) {
      cards.push({id: `jack of ${suits[i]}`, name: 'jack', suit: suits[i], value: 10, isFaceCard: true})
      cards.push({id: `queen of ${suits[i]}`, name: 'queen', suit: suits[i], value: 10, isFaceCard: true})
      cards.push({id: `king of ${suits[i]}`, name: 'king', suit: suits[i], value: 10, isFaceCard: true})
      cards.push({id: `ace of ${suits[i]}`, name: 'ace', suit: suits[i], value: 1})
    }

    setDeck(shuffleDeck([...cards]))
  }

  const shuffleDeck = (deck: Card[]) => {
    const currentDeck = [...deck]
    let currentIndex = currentDeck.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = currentDeck[currentIndex]
      currentDeck[currentIndex] = currentDeck[randomIndex]
      currentDeck[randomIndex] = temporaryValue
    }

    return currentDeck
  }

  const calculateScore = (card: Card, score: number) => {
    if (card.value === 1 && (score + 11 <= 21)) {
      return score + 11
    }
    return score + card.value
  }

  const handleStartGame = () => {
    if (gameState !== GameStatus.started) { return }

    const startingPlayerCards: Card[] = [deck[0], deck[1]]
    const startingDealerCards: Card[] = [deck[2]]
    const updatedDeck = deck.filter((r, i) => i > 2)

    // TODO: to be improved
    const startingPlayerScore = () => {
      if ((startingPlayerCards[0].isFaceCard || startingPlayerCards[0].value === 10) && startingPlayerCards[1].value === 1 ||
          (startingPlayerCards[1].isFaceCard || startingPlayerCards[1].value === 10) && startingPlayerCards[0].value === 1) {
        return 21
      }
      return startingPlayerCards[0].value + startingPlayerCards[1].value
    }

    const startingDealerScore = startingDealerCards[0].value

    setGameState(GameStatus.playerTurn)
    setPlayerCards([...startingPlayerCards])
    setDealerCards([...startingDealerCards])
    setScore({playerScore: startingPlayerScore(), dealerScore: startingDealerScore})
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
    const updatedDealerScore = calculateScore(currentDeck[0], dealerScore)
    const updatedDealerCards = [...dealerCards, currentDeck[0]]
    const updatedDeck = currentDeck.filter((r, i) => i >= 1)

    if (updatedDealerScore >= 21) {
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
    <GameControls
      handleStartGame={handleStartGame}
      handleHitClick={handleHitClick}
      handleStickClick={handleStickClick}
    />
  )
}

export default Game