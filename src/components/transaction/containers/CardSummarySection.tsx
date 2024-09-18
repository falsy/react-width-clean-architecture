import { css } from "@emotion/react"
import { GET_RECENT_CARD_TRANSACTIONS } from "constants/queries"
import useDependencies from "hooks/useDependencies"
import ErrorContainer from "components/commons/containers/ErrorContainer"
import Error from "components/commons/Error"
import Loader from "components/commons/Loader"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import ResCardSummaryList from "../ResCardSummaryList"

export default function CardSummarySection() {
  const { presenters } = useDependencies()

  return (
    <div
      css={css`
        position: relative;
        min-height: 60px;
      `}
    >
      <ErrorContainer>
        <QueryContainer
          queryKey={GET_RECENT_CARD_TRANSACTIONS}
          queryFn={() =>
            presenters.transaction.getRecentCardTransactionSummary()
          }
          loadingComponent={<Loader />}
          errorComponent={
            <RefetchContainer queryKey={GET_RECENT_CARD_TRANSACTIONS}>
              <Error />
            </RefetchContainer>
          }
        >
          <ResCardSummaryList />
        </QueryContainer>
      </ErrorContainer>
    </div>
  )
}
