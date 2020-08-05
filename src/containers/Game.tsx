import React, { FunctionComponent, useState } from 'react'
import { GameStatus } from '../constants/enums/GameStatus'
import { Deck } from '../constants/types/Deck'
import { Card } from '../constants/types/Card'
import { Score } from '../constants/types/Score'
import { useEffect } from 'react'

const Game: FunctionComponent = () => {
  const [gameState, setGameState] = useState<GameStatus>(GameStatus.stopped)
  const [deck, setDeck] = useState<Card[]>()
  const [playerCards, setPlayerCards] = useState<Card[]>([])
  const [dealerCards, setDealerCards] = useState<Card[]>([])
  const [score, setScore] = useState<Score>()

  useEffect(() => {
    if (gameState === GameStatus.stopped) {
      createDeck()
    }
  }, [])

  const createDeck = () => {
    // to be improved
    const suits = ['hearts', 'clubs', 'diamonds', 'spades']
    let cards: Card[] = []
    for (let i = 1; i < 11; i++) {
      cards.push({id: `${i.toString()} of hearts`, name: `${i.toString()} of hearts`, suit: 'hearts', value: i})
      cards.push({id: `${i.toString()} of hearts`, name: `${i.toString()} of diamonds`, suit: 'diamonds', value: i})
      cards.push({id: `${i.toString()} of hearts`, name: `${i.toString()} of spades`, suit: 'spades', value: i})
      cards.push({id: `${i.toString()} of hearts`, name: `${i.toString()} of clubs`, suit: 'clubs', value: i})
    }

    for (let i = 0; i < suits.length - 1; i++) {
      cards.push({id: `jack of ${suits[i]}`, name: `jack of ${suits[i]}`, suit: suits[i], value: 10})
      cards.push({id: `queen of ${suits[i]}`, name: `queen of ${suits[i]}`, suit: suits[i], value: 10})
      cards.push({id: `king of ${suits[i]}`, name: `king of ${suits[i]}`, suit: suits[i], value: 10})
      cards.push({id: `ace of ${suits[i]}`, name: `ace of ${suits[i]}`, suit: suits[i], value: 1})
    }
    setDeck([...cards])
  }

  return <h1>Game Container</h1>
}

export default Game