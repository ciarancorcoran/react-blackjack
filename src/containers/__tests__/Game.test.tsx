import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Game, {
  calculateScore,
  cardsContainAce,
  isHighAce,
  isBlackJack
} from '../Game'
import { createAndShuffleDeck } from '../GameBoard'
import { Card } from '../../constants/types/Card'

describe('Game', () => {
  let startingDeck: Card[] = []

  beforeEach(() => {
    startingDeck = createAndShuffleDeck()
  })

  it('renders the container', () => {
    const { getByTestId } = render(<Game startingDeck={startingDeck} />)
    const startGameButton = getByTestId('start-button')
    expect(startGameButton).toBeInTheDocument()
  })

  it('clicks on start game and deals player cards', () => {
    const { getByTestId } = render(<Game startingDeck={startingDeck} />)
    const startGameButton = getByTestId('start-button')
    startGameButton.click()
  })

  it('clicks on hit button and deals a player card', () => {
    const { getByTestId } = render(<Game startingDeck={startingDeck} />)
    const startGameButton = getByTestId('start-button')
    const hitButton = getByTestId('hit-button')
    fireEvent.click(startGameButton)
    fireEvent.click(hitButton)
  })

  it('clicks on stick button and deals dealer cards', () => {
    const { getByTestId } = render(<Game startingDeck={startingDeck} />)
    const startGameButton = getByTestId('start-button')
    const stickButton = getByTestId('stick-button')
    fireEvent.click(startGameButton)
    fireEvent.click(stickButton)
  })

  it('attempts to click on start button after game has started', () => {
    const { getByTestId } = render(<Game startingDeck={startingDeck} />)
    const startGameButton = getByTestId('start-button')
    fireEvent.click(startGameButton)
    fireEvent.click(startGameButton)
  })

  it('attempts to click on hit button after game has ended', () => {
    const { getByTestId } = render(<Game startingDeck={startingDeck} />)
    const startGameButton = getByTestId('start-button')
    const hitButton = getByTestId('stick-button')
    const stickButton = getByTestId('stick-button')
    fireEvent.click(startGameButton)
    fireEvent.click(stickButton)
    fireEvent.click(hitButton)
  })

  it('attempts to click on stick button after game has ended', () => {
    const { getByTestId } = render(<Game startingDeck={startingDeck} />)
    const startGameButton = getByTestId('start-button')
    const stickButton = getByTestId('stick-button')
    fireEvent.click(startGameButton)
    fireEvent.click(stickButton)
    fireEvent.click(stickButton)
  })
})

// unit tests
it('calculates a score from a given card and score', () => {
  const card = {id: '5 of hearts', name: '5 of hearts', suit: 'hearts', value: 5}
  const calculatedScore = calculateScore(card, 6)
  expect(calculatedScore).toBe(11)
})

it('checks if given set of cards contains an ace', () => {
  const cards: Card[] = [
    {id: '5 of hearts', name: '5 of hearts', suit: 'hearts', value: 5},
    {id: 'ace of hearts', name: 'ace of hearts', suit: 'hearts', value: 1}
  ]
  const doesItContainAce = cardsContainAce(cards)
  expect(doesItContainAce).toBe(true)
})

it('checks if ace should be high and returns true if so', () => {
  const cards: Card[] = [
    {id: '5 of hearts', name: '5 of hearts', suit: 'hearts', value: 5},
    {id: '5 of diamonds', name: '5 of diamonds', suit: 'diamonds', value: 5},
    {id: 'ace of hearts', name: 'ace of hearts', suit: 'hearts', value: 1}
  ]
  const willItBeAHighAce = isHighAce(cards, 11)
  expect(willItBeAHighAce).toBe(true)
})

it('checks if ace should be high and returns false if not', () => {
  const cards: Card[] = [
    {id: '5 of hearts', name: '5 of hearts', suit: 'hearts', value: 5},
    {id: '5 of diamonds', name: '5 of diamonds', suit: 'diamonds', value: 5},
    {id: 'ace of hearts', name: 'ace of hearts', suit: 'hearts', value: 1}
  ]
  const willItBeAHighAce = isHighAce(cards, 15)
  expect(willItBeAHighAce).toBe(false)
})

it('checks if a set of cards is blackjack and returns true if so', () => {
  const cards: Card[] = [
    {id: 'jack of hearts', name: 'jack of hearts', suit: 'hearts', value: 10},
    {id: 'ace of hearts', name: 'ace of hearts', suit: 'hearts', value: 1}
  ]
  const doWeHaveBlackJack = isBlackJack(cards)
  expect(doWeHaveBlackJack).toBe(true)

  const moreCards: Card[] = [
    {id: 'ace of hearts', name: 'ace of hearts', suit: 'hearts', value: 1},
    {id: 'jack of hearts', name: 'jack of hearts', suit: 'hearts', value: 10}
  ]
  const doWeHaveBlackJackAgain = isBlackJack(moreCards)
  expect(doWeHaveBlackJackAgain).toBe(true)
})

it('checks if a set of cards is blackjack and returns false if not', () => {
  const cards: Card[] = [
    {id: '9 of hearts', name: '9 of hearts', suit: 'hearts', value: 9},
    {id: 'ace of hearts', name: 'ace of hearts', suit: 'hearts', value: 1}
  ]
  const doWeHaveBlackJack = isBlackJack(cards)
  expect(doWeHaveBlackJack).toBe(false)
})