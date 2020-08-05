import React, { FunctionComponent, useState } from 'react'
import { GameStatus } from '../constants/enums/GameStatus'
import { Deck } from '../constants/types/Deck'
import { Card } from '../constants/types/Card'
import { Score } from '../constants/types/Score'

const Game: FunctionComponent = () => {
  const [deck, setDeck] = useState<Deck>()
  const [playerCards, setPlayerCards] = useState<Card[]>([])
  const [dealerCards, setDealerCards] = useState<Card[]>([])
  const [score, setScore] = useState<Score>()

  return <h1>Game Container</h1>
}

export default Game