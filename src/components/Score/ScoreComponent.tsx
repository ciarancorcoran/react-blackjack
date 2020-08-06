import React, { FunctionComponent } from 'react'
import { Score } from '../../constants/types/Score'

type ScoreComponentProps = {
  score: Score
}

const ScoreComponent: FunctionComponent<ScoreComponentProps> = ({ score }) => (
  <>
    <h3>Player Score: {score.playerScore}</h3>
    <h3>Dealer Score: {score.dealerScore}</h3>
  </>
)

export default ScoreComponent