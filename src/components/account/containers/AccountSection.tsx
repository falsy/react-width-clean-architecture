import { css } from "@emotion/react"
import { GET_ACCOUNTS } from "constants/queries"
import useDependencies from "hooks/useDependencies"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/commons/Error"
import Loader from "components/commons/Loader"
import ErrorContainer from "../../commons/containers/ErrorContainer"
import ResAccountList from "../ResAccountList"

export default function AccountSection() {
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
          queryKey={GET_ACCOUNTS}
          queryFn={() => presenters.account.getAccounts()}
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
