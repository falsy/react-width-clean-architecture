import { css } from "@emotion/react"
import { GET_TRANSACTIONS } from "constants/queries"
import useDependencies from "hooks/useDependencies"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/commons/Error"
import Loader from "components/commons/Loader"
import ErrorContainer from "../../commons/containers/ErrorContainer"
import ResConsumptionList from "../ResConsumptionList"

export default function ConsumptionSection() {
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
          queryKey={GET_TRANSACTIONS}
          queryFn={() => presenters.transaction.getTotalTransactions()}
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
