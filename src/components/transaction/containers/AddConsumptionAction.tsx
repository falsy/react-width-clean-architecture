import { css } from "@emotion/react"
import { GET_TRANSACTIONS } from "constants/queries"
import Loading from "components/commons/Loading"
import MutationContainer from "components/networks/MutationContainer"
import ErrorContainer from "../../commons/containers/ErrorContainer"
import AddConsumptionBtn from "../items/AddConsumptionBtn"

import di from "di"
import { IRequestTransactionParams } from "adapters/dtos/interfaces/requests/IRequestTransactionDTO"

export default function AddConsumptionAction({
  transactionData
}: {
  transactionData: IRequestTransactionParams
}) {
  const { amount, keyword, cardId, accountId } = transactionData

  return (
    <div
      css={css`
        padding: 1rem 0;
      `}
    >
      <ErrorContainer>
        <MutationContainer
          mutationFn={() => {
            if (!amount || !keyword || (!cardId && !accountId)) {
              window.alert("Please fill all fields")
              throw new Error("Please fill all fields")
            }
            return di.transaction.addTransaction({
              amount,
              keyword,
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
