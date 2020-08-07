import React from 'react'
import './App.css'

import { createDeck } from './utils/GameUtils'

import Game from './components/Game'

function App() {
  return (
    <Game startingDeck={createDeck()} />
  )
}

export default App
