import { Card } from '../constants/types/Card'
import { Score } from '../constants/types/Score'
import { WinStatus } from '../constants/enums/WinStatus'

export const calculateScore = (card: Card, score: number) => card.value + score

export const cardsContainAce = (holderCards: Card[]) => holderCards.some(r => r.value === 1)

export const isHighAce = (holderCards: Card[], score: number) => cardsContainAce(holderCards) && score + 10 <= 21 ? true : false

export const isBlackJack = (holderDeck: Card[]) => holderDeck.reduce((a, b) => ((a + b.value)), 0) + 10 === 21 ? true : false

export const checkForTie = (score: Score) => (score.dealerScore >= 17 && score.dealerScore) === score.playerScore ? true : false

export const pickRandomCardAndRemove = (currentDeck: Card[]) => {
  const randomCard = currentDeck[Math.floor(Math.random() * currentDeck.length)]
  const filteredDeck = currentDeck.filter(r => r.id !== randomCard.id)
  return {filteredDeck, randomCard}
}

export const checkWinner = (finalScore: Score) => {
  if (finalScore.playerScore > finalScore.dealerScore || finalScore.dealerScore > 21 ) {
    return WinStatus.PLAYER_WON
  } else if (checkForTie(finalScore)) {
    return WinStatus.GAME_TIED
  } else {
    return WinStatus.DEALER_WON
  }
}

export const createDeck = () => {
  const suits = ['♥', '♦', '♠', '♣']
  const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']
  const cards: Card[] = []

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      cards.push({
        id: `${values[j]} of ${suits[i]}`,
        name: values[j],
        suit: suits[i],
        value: j >= 10 ? 10 : j + 1})
    }
  }

  return cards
}