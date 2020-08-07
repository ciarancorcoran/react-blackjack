import { Card } from '../../constants/types/Card'
import { Score } from '../../constants/types/Score'

import {
  calculateScore,
  cardsContainAce,
  isHighAce,
  isBlackJack,
  checkForTie,
  checkWinner,
  createDeck
} from '../GameUtils'

it('calculates a score from a given card and score', () => {
  const card = {id: '5 of ♥', name: '5', suit: '♥', value: 5}
  const calculatedScore = calculateScore(card, 6)
  expect(calculatedScore).toBe(11)
})

it('checks if given set of cards contains an ace', () => {
  const cards: Card[] = [
    {id: '5 of ♥', name: '5', suit: '♥', value: 5},
    {id: 'ace of ♥', name: 'ace', suit: '♥', value: 1}
  ]
  const doesItContainAce = cardsContainAce(cards)
  expect(doesItContainAce).toBe(true)
})

it('checks if ace should be high and returns true if so', () => {
  const cards: Card[] = [
    {id: '5 of ♥', name: '5', suit: '♥', value: 5},
    {id: '5 of ♦', name: '5', suit: '♦', value: 5},
    {id: 'ace of ♥', name: 'ace', suit: '♥', value: 1}
  ]
  const willItBeAHighAce = isHighAce(cards, 11)
  expect(willItBeAHighAce).toBe(true)
})

it('checks if ace should be high and returns false if not', () => {
  const cards: Card[] = [
    {id: '5 of ♥', name: '5', suit: '♥', value: 5},
    {id: '5 of ♦', name: '5', suit: '♦', value: 5},
    {id: 'ace of ♥', name: 'ace', suit: '♥', value: 1}
  ]
  const willItBeAHighAce = isHighAce(cards, 15)
  expect(willItBeAHighAce).toBe(false)
})

it('checks if a set of cards is blackjack and returns true if so', () => {
  const cards: Card[] = [
    {id: 'jack of ♥', name: 'jack', suit: '♥', value: 10},
    {id: 'ace of ♥', name: 'ace', suit: '♥', value: 1}
  ]
  const doWeHaveBlackJack = isBlackJack(cards)
  expect(doWeHaveBlackJack).toBe(true)

  const moreCards: Card[] = [
    {id: 'ace of ♥', name: 'ace', suit: '♥', value: 1},
    {id: 'jack of ♥', name: 'jack', suit: '♥', value: 10}
  ]
  const doWeHaveBlackJackAgain = isBlackJack(moreCards)
  expect(doWeHaveBlackJackAgain).toBe(true)
})

it('checks if a set of cards is blackjack and returns false if not', () => {
  const cards: Card[] = [
    {id: '9 of ♥', name: '9', suit: '♥', value: 9},
    {id: 'ace of ♥', name: 'ace', suit: '♥', value: 1}
  ]
  const doWeHaveBlackJack = isBlackJack(cards)
  expect(doWeHaveBlackJack).toBe(false)
})

it('checks for a tie game and returns true if so', () => {
  const score: Score = {
    playerScore: 18,
    dealerScore: 18
  }
  const isItATie = checkForTie(score)
  expect(isItATie).toBe(true)
})

it('checks for a tie game and returns false if not', () => {
  const score: Score = {
    playerScore: 17,
    dealerScore: 18
  }
  const isItATie = checkForTie(score)
  expect(isItATie).toBe(false)
})

it('checks for winner and returns player won message if the player won', () => {
  const score: Score = {
    playerScore: 20,
    dealerScore: 18
  }
  const playerWonMessage = checkWinner(score)
  expect(playerWonMessage).toBe('Player Wins!')
})

it('checks for winner and returns dealer won message if the dealer won', () => {
  const score: Score = {
    playerScore: 20,
    dealerScore: 21
  }
  const dealerWonMessage = checkWinner(score)
  expect(dealerWonMessage).toBe('Dealer Wins!')
})

it('checks for winner and returns tie game message if it is a tie', () => {
  const score: Score = {
    playerScore: 20,
    dealerScore: 20
  }
  const dealerWonMessage = checkWinner(score)
  expect(dealerWonMessage).toBe(`It's a tie!`)
})

it('creates a deck of 52 cards', () => {
  const deck = createDeck()
  expect(deck.length).toBe(52)
})