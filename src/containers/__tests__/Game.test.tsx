import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Game from '../Game'
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
