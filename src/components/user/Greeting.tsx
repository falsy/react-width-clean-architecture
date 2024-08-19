import { css } from "@emotion/react"
import IUser from "adapters/domains/entities/interfaces/IUser"
import Container from "components/commons/containers/Container"

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
