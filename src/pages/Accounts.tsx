import { css } from "@emotion/react"
import Container from "components/containers/Container"
import Header from "components/Header"
import Navigation from "components/Navigation"
import GreetingSection from "components/containers/GreetingSection"

export default function Accounts() {
  return (
    <div>
      <Navigation />
      <GreetingSection />
      <Container>
        <div css={css``}>
          <Header>
            <h1>Accounts</h1>
          </Header>
        </div>
      </Container>
    </div>
  )
}
