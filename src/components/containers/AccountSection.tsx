import { css } from "@emotion/react"
import { GET_ACCOUNTS } from "constants/queries"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/Error"
import Loading from "components/Loading"
import ErrorContainer from "./ErrorContainer"
import di from "di"
import AccountList from "components/AccountList"

export default function AccountSection() {
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <ErrorContainer>
        <QueryContainer
          queryKey={GET_ACCOUNTS}
          queryFn={() => di.account.getAccounts()}
          loadingComponent={<Loading />}
          errorComponent={
            <RefetchContainer queryKey={GET_ACCOUNTS}>
              <Error />
            </RefetchContainer>
          }
        >
          <AccountList />
        </QueryContainer>
      </ErrorContainer>
    </div>
  )
}
