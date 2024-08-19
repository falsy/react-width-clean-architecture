import { css } from "@emotion/react"
import Loading from "components/Loading"
import ErrorContainer from "./ErrorContainer"
import MutationContainer from "components/networks/MutationContainer"
import { IRequestTransactionDTOParams } from "adapters/dtos/interfaces/IRequestTransactionDTO"
import AddConsumptionBtn from "components/items/AddConsumptionBtn"
import di from "di"
import { GET_TRANSACTIONS } from "constants/queries"

export default function AddConsumptionAction({
  transactionData
}: {
  transactionData: IRequestTransactionDTOParams
}) {
  const { amount, keyword, categoryId, cardId, accountId } = transactionData

  return (
    <div
      css={css`
        padding: 1rem 0;
      `}
    >
      <ErrorContainer>
        <MutationContainer
          mutationFn={() => {
            if (!amount || !keyword || !categoryId || (!cardId && !accountId)) {
              window.alert("Please fill all fields")
              throw new Error("Please fill all fields")
            }
            return di.transaction.addTransaction({
              amount,
              keyword,
              categoryId,
              cardId,
              accountId
            })
          }}
          invalidateQueryKeys={[GET_TRANSACTIONS]}
          loadingComponent={<Loading />}
        >
          <AddConsumptionBtn />
        </MutationContainer>
      </ErrorContainer>
    </div>
  )
}
