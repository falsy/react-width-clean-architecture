import { css } from "@emotion/react"
import Container from "./containers/Container"
import IUser from "adapters/domains/entities/interfaces/IUser"

export default function Greeting({ response }: { response?: IUser }) {
  const userName = response?.name || ""
  return (
    <div
      css={css`
        background: #f5f5f5;
      `}
    >
      <Container>
        <div
          css={css`
            text-align: center;
          `}
        >
          <p>{`Welcome${userName ? ", " + userName + "!" : ""}`}</p>
        </div>
      </Container>
    </div>
  )
}
