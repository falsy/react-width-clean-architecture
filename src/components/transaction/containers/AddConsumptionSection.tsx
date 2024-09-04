import { css } from "@emotion/react"
import { GET_CATEGORIES_CARDS_ACCOUNTS } from "constants/queries"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/commons/Error"
import Loading from "components/commons/Loading"
import ErrorContainer from "../../commons/containers/ErrorContainer"
import AddConsumptionForm from "../AddConsumptionForm"

import di from "di"

export default function AddConsumptionSection() {
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <ErrorContainer>
        <QueryContainer
          queryKey={GET_CATEGORIES_CARDS_ACCOUNTS}
          queryFn={async () => {
            const [cards, accounts] = await Promise.all([
              di.card.getCards(),
              di.account.getAccounts()
            ])

            return {
              cards,
              accounts
            }
          }}
          loadingComponent={<Loading />}
          errorComponent={
            <RefetchContainer queryKey={GET_CATEGORIES_CARDS_ACCOUNTS}>
              <Error />
            </RefetchContainer>
          }
        >
          <AddConsumptionForm />
        </QueryContainer>
      </ErrorContainer>
    </div>
  )
}
