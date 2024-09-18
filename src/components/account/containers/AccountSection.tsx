import { css } from "@emotion/react"
import { GET_ACCOUNTS } from "constants/queries"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/commons/Error"
import Loader from "components/commons/Loader"
import ErrorContainer from "../../commons/containers/ErrorContainer"
import ResAccountList from "../ResAccountList"

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
          loadingComponent={<Loader />}
          errorComponent={
            <RefetchContainer queryKey={GET_ACCOUNTS}>
              <Error />
            </RefetchContainer>
          }
        >
          <ResAccountList />
        </QueryContainer>
      </ErrorContainer>
    </div>
  )
}
