import { css } from "@emotion/react"
import Container from "components/containers/Container"
import Header from "components/Header"
import Navigation from "components/Navigation"
import GreetingSection from "components/containers/GreetingSection"
import CardSection from "components/containers/CardSection"

export default function Cards() {
  return (
    <div>
      <Navigation />
      <GreetingSection />
      <Container>
        <div
          css={css`
            margin-bottom: 1rem;
          `}
        >
          <Header>
            <h1>Cards</h1>
          </Header>
        </div>
        <CardSection />
      </Container>
    </div>
  )
}
