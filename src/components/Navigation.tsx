import { Link } from "react-router-dom"
import { css } from "@emotion/react"
import Container from "./containers/Container"

export default function Navigation() {
  return (
    <div
      css={css`
        border-bottom: 1px solid #eaeaea;
      `}
    >
      <Container>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <nav>
            <ul
              css={css`
                display: flex;
                gap: 5rem;
                list-style: none;
                font-weight: 500;
                padding: 0;
                a {
                  text-decoration: none;
                  color: inherit;
                  text-transform: uppercase;
                }
              `}
            >
              <li>
                <Link to="/">Consumptions</Link>
              </li>
              <li>
                <Link to="/cards">Cards</Link>
              </li>
              <li>
                <Link to="/accounts">Accounts</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  )
}
