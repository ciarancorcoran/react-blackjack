import React, { FunctionComponent } from 'react'

type GameControlsProps = {
  isGameStopped: boolean | undefined
  handleStartGame: () => void
  handleHitClick: () => void
  handleStickClick: () => void
}

const GameControls: FunctionComponent<GameControlsProps> = ({
  isGameStopped,
  handleStartGame,
  handleHitClick,
  handleStickClick
}) => (
  <>
    {isGameStopped ? <button data-testid='start-button' onClick={handleStartGame}>Start Game</button> : ''}
    <button data-testid='hit-button' onClick={handleHitClick}>Hit!</button>
    <button data-testid='stick-button' onClick={handleStickClick}>Stick!</button>
  </>
)

export default GameControls