import { css } from "@emotion/react"
import { GET_TRANSACTIONS } from "constants/queries"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/commons/Error"
import Loading from "components/commons/Loading"
import ErrorContainer from "../../commons/containers/ErrorContainer"
import ConsumptionList from "../ConsumptionList"

import di from "di"

export default function ConsumptionSection() {
  return (
    <div
      css={css`
        position: relative;
        min-height: 10rem;
      `}
    >
      <ErrorContainer>
        <QueryContainer
          queryKey={GET_TRANSACTIONS}
          queryFn={() => di.transaction.getTransactions()}
          loadingComponent={<Loading />}
          errorComponent={
            <RefetchContainer queryKey={GET_TRANSACTIONS}>
              <Error />
            </RefetchContainer>
          }
        >
          <ConsumptionList />
        </QueryContainer>
      </ErrorContainer>
    </div>
  )
}
