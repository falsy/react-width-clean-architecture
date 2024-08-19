import { css } from "@emotion/react"
import Container from "components/commons/containers/Container"
import AccountSection from "components/account/containers/AccountSection"
import Header from "components/commons/Header"
import Navigation from "components/commons/Navigation"
import GreetingSection from "components/user/containers/GreetingSection"

export default function Accounts() {
  return (
    <div>
      <Navigation />
      <GreetingSection />
      <div
        css={css`
          padding: 1rem 0;
        `}
      >
        <Container>
          <div
            css={css`
              margin-bottom: 1rem;
            `}
          >
            <Header>
              <h1>Accounts</h1>
            </Header>
          </div>
          <AccountSection />
        </Container>
      </div>
    </div>
  )
}
