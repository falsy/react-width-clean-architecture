import { css } from "@emotion/react"
import { GET_ACCOUNTS } from "constants/queries"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/commons/Error"
import Loading from "components/commons/Loading"
import ErrorContainer from "../../commons/containers/ErrorContainer"
import AccountList from "../AccountList"

import di from "di"

export default function AccountSection() {
  return (
    <div
      css={css`
        position: relative;
        min-height: 10rem;
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
