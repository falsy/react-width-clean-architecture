import { css } from "@emotion/react"
import ICard from "adapters/domains/entities/interfaces/ICard"
import CardItem from "./items/CardItem"

export default function CardList({ response }: { response?: Array<ICard> }) {
  const cards = response || []

  return (
    <div>
      <ul
        css={css`
          margin: 0;
          padding: 0;
          list-style: none;
          li:not(:first-of-type) {
            margin-top: 0.5rem;
          }
        `}
      >
        {cards.map((card) => (
          <li key={card.id}>
            <CardItem card={card} />
          </li>
        ))}
      </ul>
    </div>
  )
}
