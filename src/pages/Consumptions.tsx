import { css } from "@emotion/react"
import Container from "components/commons/containers/Container"
import Header from "components/commons/Header"
import Navigation from "components/commons/Navigation"
import GreetingSection from "components/user/containers/GreetingSection"
import ConsumptionSection from "components/transaction/containers/ConsumptionSection"
import AddConsumptionSection from "components/transaction/containers/AddConsumptionSection"

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
