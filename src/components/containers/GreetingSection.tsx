import { css } from "@emotion/react"
import { GET_USER_INFO } from "constants/queries"
import ErrorContainer from "./ErrorContainer"
import QueryContainer from "components/networks/QueryContainer"
import RefetchContainer from "components/networks/RefetchContainer"
import Error from "components/Error"
import Greeting from "components/Greeting"
import Loading from "components/Loading"
import di from "di"

export default function GreetingSection() {
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
          queryFn={() => di.user.getUserInfo()}
          loadingComponent={<Loading />}
          errorComponent={
            <RefetchContainer queryKey={GET_USER_INFO}>
              <Error />
            </RefetchContainer>
          }
        >
          <Greeting />
        </QueryContainer>
      </ErrorContainer>
    </div>
  )
}
