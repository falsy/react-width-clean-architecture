import { css } from "@emotion/react"
import { GET_RECENT_ACCOUNT_TRANSACTIONS } from "constants/queries"
import useDependencies from "hooks/useDependencies"
import ErrorContainer from "components/commons/containers/ErrorContainer"
import Error from "components/commons/Error"
import Loader from "components/commons/Loader"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import ResAccountSummaryList from "../ResAccountSummaryList"

export default function AccountSummarySection() {
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
          queryKey={GET_RECENT_ACCOUNT_TRANSACTIONS}
          queryFn={() =>
            presenters.transaction.getRecentAccountTransactionSummary()
          }
          loadingComponent={<Loader />}
          errorComponent={
            <RefetchContainer queryKey={GET_RECENT_ACCOUNT_TRANSACTIONS}>
              <Error />
            </RefetchContainer>
          }
        >
          <ResAccountSummaryList />
        </QueryContainer>
      </ErrorContainer>
    </div>
  )
}
