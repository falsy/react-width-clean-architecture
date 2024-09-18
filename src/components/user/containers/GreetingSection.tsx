import { css } from "@emotion/react"
import { GET_USER_INFO } from "constants/queries"
import useDependencies from "hooks/useDependencies"
import ErrorContainer from "../../commons/containers/ErrorContainer"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/commons/Error"
import Loader from "components/commons/Loader"
import ResGreeting from "../ResGreeting"

export default function GreetingSection() {
  const { presenters } = useDependencies()

  return (
    <div
      css={css`
        position: relative;
        border-bottom: 1px solid #eaeaea;
      `}
    >
      <ErrorContainer>
        <QueryContainer
          queryKey={GET_USER_INFO}
          queryFn={() => presenters.user.getUser()}
          loadingComponent={<Loader />}
          errorComponent={
            <RefetchContainer queryKey={GET_USER_INFO}>
              <Error />
            </RefetchContainer>
          }
        >
          <ResGreeting />
        </QueryContainer>
      </ErrorContainer>
    </div>
  )
}
