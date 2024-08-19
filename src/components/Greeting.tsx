import { css } from "@emotion/react"
import Container from "./containers/Container"
import IUser from "adapters/domains/entities/interfaces/IUser"

export default function Greeting({ response }: { response?: IUser }) {
  const userName = response?.name || ""
  return (
    <div>
      <Container>
        <div
          css={css`
            padding: 1rem;
            text-align: center;
          `}
        >
          <p>{`Hello ${userName}`}</p>
        </div>
      </Container>
    </div>
  )
}
