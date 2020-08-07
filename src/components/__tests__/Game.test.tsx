import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Card } from '../../constants/types/Card'
import { createDeck } from '../../utils/GameUtils'

import Game from '../Game'

describe('Game', () => {
  let startingDeck: Card[] = []

  beforeEach(() => {
    startingDeck = createDeck()
  })

  it('renders the container', () => {
    const { getByTestId } = render(<Game startingDeck={startingDeck} />)
    const startGameButton = getByTestId('start-button')
    expect(startGameButton).toBeInTheDocument()
  })

  it('clicks on start game and deals player cards', () => {
    const { getByTestId, getAllByTestId } = render(<Game startingDeck={startingDeck} />)
    const startGameButton = getByTestId('start-button')
    startGameButton.click()
    const dealtCards = getAllByTestId('dealt-card')
    expect(dealtCards.length).toBe(3)
  })

  it('clicks on hit button and deals a player card', () => {
    const { getByTestId, getAllByTestId } = render(<Game startingDeck={startingDeck} />)
    const startGameButton = getByTestId('start-button')
    const hitButton = getByTestId('hit-button')
    fireEvent.click(startGameButton)
    fireEvent.click(hitButton)
    const dealtCards = getAllByTestId('dealt-card')
    expect(dealtCards.length).toBe(4)
  })

  it('clicks on stick button and deals dealer cards', () => {
    const { getByTestId, getAllByTestId } = render(<Game startingDeck={startingDeck} />)
    const startGameButton = getByTestId('start-button')
    const stickButton = getByTestId('stick-button')
    fireEvent.click(startGameButton)
    fireEvent.click(stickButton)
    const dealtCards = getAllByTestId('dealt-card')
    expect(dealtCards.length).toBeGreaterThan(3)
  })

  it('attempts to click on start button after game has started', () => {
    const { getByTestId, getAllByTestId } = render(<Game startingDeck={startingDeck} />)
    const startGameButton = getByTestId('start-button')
    fireEvent.click(startGameButton)
    fireEvent.click(startGameButton)
    const dealtCards = getAllByTestId('dealt-card')
    expect(dealtCards.length).toBe(3)
  })

  it('attempts to click on hit button after game has ended', () => {
    const { getByTestId, getAllByTestId } = render(<Game startingDeck={startingDeck} />)
    const startGameButton = getByTestId('start-button')
    const hitButton = getByTestId('stick-button')
    const stickButton = getByTestId('stick-button')
    fireEvent.click(startGameButton)
    fireEvent.click(stickButton)
    const dealtCardsAfterClickingStick = getAllByTestId('dealt-card')
    fireEvent.click(hitButton)
    const dealtCardsAfterClickingHit = getAllByTestId('dealt-card')
    expect(dealtCardsAfterClickingStick.length === dealtCardsAfterClickingHit.length).toBeTruthy()
  })

  it('attempts to click on stick button after game has ended', () => {
    const { getByTestId, getAllByTestId } = render(<Game startingDeck={startingDeck} />)
    const startGameButton = getByTestId('start-button')
    const stickButton = getByTestId('stick-button')
    fireEvent.click(startGameButton)
    fireEvent.click(stickButton)
    const dealtCardsAfterClickingStick = getAllByTestId('dealt-card')
    fireEvent.click(stickButton)
    const dealtCardsAfterClickingStickAgain = getAllByTestId('dealt-card')
    expect(dealtCardsAfterClickingStick.length === dealtCardsAfterClickingStickAgain.length).toBeTruthy()
  })

  it('finds blackjack upon starting a game', () => {
    const blackjackTestDeck = [
      {id: 'ace of clubs', name: 'ace', suit: 'clubs', value: 1},
      {id: '10 of diamonds', name: '10', suit: 'diamonds', value: 10},
      {id: 'ace of hearts', name: 'ace', suit: 'hearts', value: 1}]
    const { getByTestId } = render(<Game startingDeck={blackjackTestDeck} />)
    const startGameButton = getByTestId('start-button')
    fireEvent.click(startGameButton)
    const playerScore = getByTestId('player-score')
    expect(playerScore).toBeInTheDocument()
  })

  it('finds a tie game after game ends', () => {
    const testDeck = [
      {id: '10 of clubs', name: '10', suit: 'clubs', value: 10},
      {id: '10 of diamonds', name: '10', suit: 'diamonds', value: 10},
      {id: '10 of hearts', name: '10', suit: 'hearts', value: 10},
      {id: '10 of spades', name: '10', suit: 'spades', value: 10}]
    const { getByTestId } = render(<Game startingDeck={testDeck} />)
    const startGameButton = getByTestId('start-button')
    const stickGameButton = getByTestId('stick-button')
    fireEvent.click(startGameButton)
    fireEvent.click(stickGameButton)
  })

  it('sets a player as bust', () => {
    const testDeck = [
      {id: '10 of clubs', name: '10', suit: 'clubs', value: 10},
      {id: '5 of diamonds', name: '5', suit: 'diamonds', value: 5},
      {id: '10 of hearts', name: '10', suit: 'hearts', value: 10},
      {id: '10 of spades', name: '10', suit: 'spades', value: 10}]
    const { getByTestId } = render(<Game startingDeck={testDeck} />)
    const startGameButton = getByTestId('start-button')
    const hitButton = getByTestId('hit-button')
    fireEvent.click(startGameButton)
    fireEvent.click(hitButton)
  })

  it('tries to click hit after player clicks stick', () => {
    const { getByTestId, getAllByTestId } = render(<Game startingDeck={startingDeck} />)
    const startGameButton = getByTestId('start-button')
    const stickGameButton = getByTestId('stick-button')
    const hitButton = getByTestId('hit-button')
    fireEvent.click(startGameButton)
    fireEvent.click(stickGameButton)
    const dealtCards = getAllByTestId('dealt-card')
    fireEvent.click(hitButton)
    const dealtCardsAfterClickingHit = getAllByTestId('dealt-card')
    expect(dealtCards.length === dealtCardsAfterClickingHit.length).toBeTruthy()
  })
})