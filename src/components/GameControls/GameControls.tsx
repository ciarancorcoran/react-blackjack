import React, { FunctionComponent } from 'react'

import  { ControlsContainer, Button } from './GameControlsStyles'

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
  <ControlsContainer>
    {isGameStopped ? <Button data-testid='start-button' onClick={handleStartGame}>Start Game</Button> : ''}
    <Button data-testid='hit-button' onClick={handleHitClick}>Hit!</Button>
    <Button data-testid='stick-button' onClick={handleStickClick}>Stick!</Button>
  </ControlsContainer>
)

export default GameControls