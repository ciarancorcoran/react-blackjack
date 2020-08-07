import React, { FunctionComponent } from 'react'
import { Card } from '../../constants/types/Card'

import { redColor, CardList, SingleCard } from './CardComponentStyles'

type CardComponentProps = {
  cards: Card[]
  cardType: string
}

const diamondOrHeart = (suit: string) => suit === '♥' ||  suit === '♦' ? true : false

const CardComponent: FunctionComponent<CardComponentProps> = ({
  cards,
  cardType
}) => (
  <>
    <h2>{cardType}</h2>
    <CardList>
      {cards.map(card => (
        <SingleCard data-testid='dealt-card' key={card.id}>
          <span style={diamondOrHeart(card.suit) ? redColor : undefined}>{card.suit}</span>
          <span style={diamondOrHeart(card.suit) ? redColor : undefined}>{card.name}</span>
        </SingleCard>
      ))}
    </CardList>
  </>
)

export default CardComponent