import { css } from "@emotion/react"
import Container from "components/containers/Container"
import Header from "components/Header"
import Navigation from "components/Navigation"
import GreetingSection from "components/containers/GreetingSection"
import ConsumptionSection from "components/containers/ConsumptionSection"
import AddConsumptionSection from "components/containers/AddConsumptionSection"

export default function Consumptions() {
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
              <h1>Consumptions</h1>
            </Header>
          </div>
          <ConsumptionSection />
        </Container>
        <Container>
          <div
            css={css`
              margin-bottom: 1rem;
            `}
          >
            <Header>
              <h2>Add Consumptions</h2>
            </Header>
          </div>
          <AddConsumptionSection />
        </Container>
      </div>
    </div>
  )
}
