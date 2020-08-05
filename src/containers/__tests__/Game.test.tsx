import React from 'react'
import { render } from '@testing-library/react'
import Game from '../Game'

test('renders learn react link', () => {
  const { getByText } = render(<Game />)
  const initialText = getByText('game')
  expect(initialText).toBeInTheDocument()
})
