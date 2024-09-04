import { css } from "@emotion/react"

export default function ActAddConsumptionBtn({
  action
}: {
  action?: () => void
}) {
  return (
    <button
      css={css`
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.8rem;
        border: 1px solid #ccc;
        cursor: pointer;
        transition: background 0.2s;
        background: #eee;
        &:hover {
          background: #ddd;
        }
      `}
      onClick={action}
    >
      Add
    </button>
  )
}
