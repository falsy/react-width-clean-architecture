import { css } from "@emotion/react"
import { GET_CATEGORIES_CARDS_ACCOUNTS } from "constants/queries"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/commons/Error"
import Loader from "components/commons/Loader"
import ErrorContainer from "../../commons/containers/ErrorContainer"
import ResAddConsumptionForm from "../ResAddConsumptionForm"

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
          loadingComponent={<Loader />}
          errorComponent={
            <RefetchContainer queryKey={GET_CATEGORIES_CARDS_ACCOUNTS}>
              <Error />
            </RefetchContainer>
          }
        >
          <ResAddConsumptionForm />
        </QueryContainer>
      </ErrorContainer>
    </div>
  )
}
