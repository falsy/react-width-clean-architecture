import { css } from "@emotion/react"
import { GET_CARDS } from "constants/queries"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/commons/Error"
import Loader from "components/commons/Loader"
import ErrorContainer from "../../commons/containers/ErrorContainer"
import ResCardList from "../ResCardList"

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
          loadingComponent={<Loader />}
          errorComponent={
            <RefetchContainer queryKey={GET_CARDS}>
              <Error />
            </RefetchContainer>
          }
        >
          <ResCardList />
        </QueryContainer>
      </ErrorContainer>
    </div>
  )
}
