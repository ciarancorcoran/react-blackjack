import React, { FunctionComponent } from 'react'
import { Card } from '../../constants/types/Card'

import { CardList, SingleCard } from './CardComponentStyles'

type CardComponentProps = {
  cards: Card[]
  cardType: string
}

const CardComponent: FunctionComponent<CardComponentProps> = ({
  cards,
  cardType
}) => (
  <>
    <h2>{cardType}</h2>
    <CardList>
      {cards.map(r => (
        <SingleCard data-testid='dealt-card' key={r.id}>
          <span>{r.suit}</span>
          <span>{r.name}</span>
        </SingleCard>
      ))}
    </CardList>
  </>
)

export default CardComponent