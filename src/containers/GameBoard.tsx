import React, { FunctionComponent, useState, useEffect } from 'react'

import { Card } from '../constants/types/Card'

import Game from './Game'

export const createAndShuffleDeck = () => {
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
    cards.push({id: `jack of ${suits[i]}`, name: `jack of ${suits[i]}`, suit: suits[i], value: 10, isFaceCard: true})
    cards.push({id: `queen of ${suits[i]}`, name: `queen of ${suits[i]}`, suit: suits[i], value: 10, isFaceCard: true})
    cards.push({id: `king of ${suits[i]}`, name: `king of ${suits[i]}`, suit: suits[i], value: 10, isFaceCard: true})
    cards.push({id: `ace of ${suits[i]}`, name: `ace of ${suits[i]}`, suit: suits[i], value: 1})
  }

  return (shuffleDeck([...cards]))
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

const GameBoard: FunctionComponent = () => {
  const [startingDeck, setStartingDeck] = useState<Card[]>([])

  useEffect(() => {
    const deck = createAndShuffleDeck()
    setStartingDeck(deck)
  }, [])

  return (
    <Game startingDeck={startingDeck} />
  )
}

export default GameBoard