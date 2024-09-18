import { css } from "@emotion/react"
import { GET_CATEGORIES_CARDS_ACCOUNTS } from "constants/queries"
import useDependencies from "hooks/useDependencies"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/commons/Error"
import Loader from "components/commons/Loader"
import ErrorContainer from "../../commons/containers/ErrorContainer"
import ResAddConsumptionForm from "../ResAddConsumptionForm"

export default function AddConsumptionSection() {
  const { presenters } = useDependencies()

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
              presenters.card.getCards(),
              presenters.account.getAccounts()
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
