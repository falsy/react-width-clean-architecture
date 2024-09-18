import { RecoilRoot } from "recoil"
import { css, Global } from "@emotion/react"
import normalize from "emotion-normalize"
import { Routes } from "pages/Routes"
import QueryClientContainer from "components/networks/QueryClientContainer"

export default function App() {
  return (
    <QueryClientContainer>
      <RecoilRoot>
        <Global
          styles={css`
            ${normalize}
            body {
              font-family: "Inter", sans-serif;
            }

            ul {
              margin: 0;
              padding: 0;
              list-style: none;
            }
          `}
        />
        <Routes />
      </RecoilRoot>
    </QueryClientContainer>
  )
}
