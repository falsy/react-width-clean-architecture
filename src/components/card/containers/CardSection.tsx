import { css } from "@emotion/react"
import { GET_CARDS } from "constants/queries"
import useDependencies from "hooks/useDependencies"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/commons/Error"
import Loader from "components/commons/Loader"
import ErrorContainer from "../../commons/containers/ErrorContainer"
import ResCardList from "../ResCardList"

export default function CardSection() {
  const { presenters } = useDependencies()

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
          queryFn={() => presenters.card.getCards()}
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
