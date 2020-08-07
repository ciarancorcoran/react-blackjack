import React, { FunctionComponent } from 'react'
import { Score } from '../../constants/types/Score'

type ScoreComponentProps = {
  score: Score
  playerCardsContainAce: boolean
  dealerCardsContainAce: boolean
  isPlayersTurn: boolean
  resultMessage: string | undefined
}

const ScoreComponent: FunctionComponent<ScoreComponentProps> = ({
  score,
  playerCardsContainAce,
  dealerCardsContainAce,
  isPlayersTurn,
  resultMessage
}) => (
  <>
    <h3 data-testid='player-score'>Player Score: {score.playerScore} {playerCardsContainAce && isPlayersTurn ? `or ${(score.playerScore + 10)}` : ''}</h3>
    <h3>Dealer Score: {score.dealerScore} {dealerCardsContainAce && isPlayersTurn ? `or ${(score.dealerScore + 10)}` : ''}</h3>
    {!resultMessage ? undefined : <h2>{resultMessage}</h2>}
  </>
)

export default ScoreComponent