import { css } from "@emotion/react"
import { GET_CATEGORIES_CARDS_ACCOUNTS } from "constants/queries"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/Error"
import Loading from "components/Loading"
import ErrorContainer from "./ErrorContainer"
import LayerDTO from "adapters/dtos/LayerDTO"
import AddConsumptionForm from "components/AddConsumptionForm"
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
            const [txnCategories, cards, accounts] = await Promise.all([
              di.transaction.getTxnCateogries(),
              di.card.getCards(),
              di.account.getAccounts()
            ])

            if (
              txnCategories.isError ||
              cards.isError ||
              accounts.isError ||
              !txnCategories.data ||
              !cards.data ||
              !accounts.data
            ) {
              return new LayerDTO({
                isError: true,
                message: "Error occurred while fetching data"
              })
            }

            return new LayerDTO({
              data: {
                txnCategories: txnCategories.data,
                cards: cards.data,
                accounts: accounts.data
              }
            })
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
