import { css } from "@emotion/react"
import Container from "components/containers/Container"
import Header from "components/Header"
import Navigation from "components/Navigation"
import GreetingSection from "components/containers/GreetingSection"
import AccountSection from "components/containers/AccountSection"

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
