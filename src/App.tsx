import React from 'react'
import './App.css'

import { createDeck } from './constants/utils/GenerateDeck'

import Game from './components/Game'

function App() {
  return (
    <Game startingDeck={createDeck()} />
  )
}

export default App
