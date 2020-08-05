import React from 'react'
import { render } from '@testing-library/react'
import Game from '../Game'

describe('Game', () => {
  it('renders the container', () => {
    const { getByText } = render(<Game />)
    const initialText = getByText('Game Container')
    expect(initialText).toBeInTheDocument()
  })
})
