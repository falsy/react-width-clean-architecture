import { css } from "@emotion/react"
import { GET_CARDS } from "constants/queries"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/commons/Error"
import Loading from "components/commons/Loading"
import ErrorContainer from "../../commons/containers/ErrorContainer"
import CardList from "../CardList"

import di from "di"

export default function CardSection() {
  return (
    <div
      css={css`
        position: relative;
        min-height: 10rem;
      `}
    >
      <ErrorContainer>
        <QueryContainer
          queryKey={GET_CARDS}
          queryFn={() => di.card.getCards()}
          loadingComponent={<Loading />}
          errorComponent={
            <RefetchContainer queryKey={GET_CARDS}>
              <Error />
            </RefetchContainer>
          }
        >
          <CardList />
        </QueryContainer>
      </ErrorContainer>
    </div>
  )
}
