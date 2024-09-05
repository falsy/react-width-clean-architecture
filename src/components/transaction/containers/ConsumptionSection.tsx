import { css } from "@emotion/react"
import { GET_TRANSACTIONS } from "constants/queries"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/commons/Error"
import Loader from "components/commons/Loader"
import ErrorContainer from "../../commons/containers/ErrorContainer"
import ResConsumptionList from "../ResConsumptionList"

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
          loadingComponent={<Loader />}
          errorComponent={
            <RefetchContainer queryKey={GET_TRANSACTIONS}>
              <Error />
            </RefetchContainer>
          }
        >
          <ResConsumptionList />
        </QueryContainer>
      </ErrorContainer>
    </div>
  )
}
