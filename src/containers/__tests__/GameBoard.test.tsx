import React from 'react'
import { render } from '@testing-library/react'
import GameBoard, { createAndShuffleDeck } from '../GameBoard'

// unit test
it('creates and shuffles a deck of 52 cards', () => {
  const deck = createAndShuffleDeck()
  expect(deck.length).toBe(52)
})

describe('Game', () => {
  it('renders the container', () => {
    const { getByTestId } = render(<GameBoard />)
    const startGameButton = getByTestId('start-button')
    expect(startGameButton).toBeInTheDocument()
  })
})
