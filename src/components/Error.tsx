import { css } from "@emotion/react"

export default function Error({ onClick }: { onClick?: () => void }) {
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
        text-align: center;
      `}
    >
      <div>
        <h3
          css={css`
            margin: 0 0 1rem;
            font-weight: 500;
          `}
        >
          The network connection is unstable.
        </h3>
        <button
          css={css`
            padding: 0.4rem 1rem;
            border-radius: 0.25rem;
            font-size: 0.8rem;
            border: 1px solid #ccc;
          `}
          onClick={onClick}
        >
          Try again
        </button>
      </div>
    </div>
  )
}
