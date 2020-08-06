import React, { FunctionComponent } from 'react'
import { Card } from '../../constants/types/Card'

type CardComponentProps = {
  cards: Card[]
  cardType: string
}

const CardComponent: FunctionComponent<CardComponentProps> = ({ cards, cardType }) => (
  <>
    <h2>{cardType}</h2>
    <ul>
      {cards.map(r => <li key={r.id}>{r.name}</li>)}
    </ul>
  </>
)

export default CardComponent