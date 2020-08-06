import React, { FunctionComponent } from 'react'

type GameControlsProps = {
  handleStartGame: () => void
  handleHitClick: () => void
  handleStickClick: () => void
}

const GameControls: FunctionComponent<GameControlsProps> = ({
  handleStartGame,
  handleHitClick,
  handleStickClick
}) => {
  return (
    <>
      <button data-testid='start-button' onClick={handleStartGame}>Start game</button>
      <button data-testid='hit-button' onClick={handleHitClick}>Hit!</button>
      <button data-testid='stick-button' onClick={handleStickClick}>Stick!</button>
    </>
  )
}

export default GameControls