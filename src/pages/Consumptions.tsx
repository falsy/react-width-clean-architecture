import { css } from "@emotion/react"
import Container from "components/containers/Container"
import Header from "components/Header"
import Navigation from "components/Navigation"
import GreetingSection from "components/containers/GreetingSection"
import ConsumptionSection from "components/containers/ConsumptionSection"
import AddConsumptionSection from "components/containers/AddConsumptionSection"

export default function Consumptions() {
  return (
    <div
      css={css`
        padding-bottom: 5rem;
      `}
    >
      <Navigation />
      <GreetingSection />
      <Container>
        <div
          css={css`
            margin-bottom: 1rem;
          `}
        >
          <Header>
            <h1>Consumptions</h1>
          </Header>
        </div>
        <ConsumptionSection />
      </Container>
      <Container>
        <AddConsumptionSection />
      </Container>
    </div>
  )
}
