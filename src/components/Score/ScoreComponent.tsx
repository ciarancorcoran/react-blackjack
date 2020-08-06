import React, { FunctionComponent } from 'react'
import { Score } from '../../constants/types/Score'

type ScoreComponentProps = {
  score: Score
  playerCardsContainAce: boolean
  dealerCardsContainAce: boolean
  isPlayersTurn: boolean
}

const ScoreComponent: FunctionComponent<ScoreComponentProps> = ({ score, playerCardsContainAce, dealerCardsContainAce, isPlayersTurn }) => (
  <>
    <h3>Player Score: {score.playerScore} {playerCardsContainAce && isPlayersTurn ? `or ${(score.playerScore + 10)}` : ''}</h3>
    <h3>Dealer Score: {score.dealerScore} {dealerCardsContainAce && isPlayersTurn ? `or ${(score.dealerScore + 10)}` : ''}</h3>
  </>
)

export default ScoreComponent