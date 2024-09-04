import { css } from "@emotion/react"

export default function Loader() {
  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
      `}
    >
      <p>Loading..</p>
    </div>
  )
}
