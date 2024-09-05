import { css } from "@emotion/react"
import Container from "components/commons/containers/Container"
import Header from "components/commons/Header"
import Navigation from "components/commons/Navigation"
import GreetingSection from "components/user/containers/GreetingSection"
import ConsumptionSection from "components/transaction/containers/ConsumptionSection"
import AddConsumptionSection from "components/transaction/containers/AddConsumptionSection"
import CardSummarySection from "components/transaction/containers/CardSummarySection"
import AccountSummarySection from "components/transaction/containers/AccountSummarySection"

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
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 1rem;
              @media (max-width: 768px) {
                grid-template-columns: 1fr;
              }
            `}
          >
            <div>
              <Header>
                <h2>Recent Card Transactions</h2>
              </Header>
              <CardSummarySection />
            </div>
            <div>
              <Header>
                <h2>Recent Account Transactions</h2>
              </Header>
              <AccountSummarySection />
            </div>
          </div>
        </Container>
      </div>
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
              <h2>Consumptions</h2>
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
