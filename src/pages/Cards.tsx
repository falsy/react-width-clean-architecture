import { css } from "@emotion/react"
import CardSection from "components/card/containers/CardSection"
import Container from "components/commons/containers/Container"
import Header from "components/commons/Header"
import Navigation from "components/commons/Navigation"
import GreetingSection from "components/user/containers/GreetingSection"

export default function Cards() {
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
              <h1>Cards</h1>
            </Header>
          </div>
          <CardSection />
        </Container>
      </div>
    </div>
  )
}
