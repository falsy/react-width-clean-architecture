import { css } from "@emotion/react"

export default function AddConsumptionBtn({ action }: { action?: () => void }) {
  return (
    <button
      css={css`
        padding: 0.4rem 1rem;
        border-radius: 0.25rem;
        font-size: 0.8rem;
        border: 1px solid #ccc;
        cursor: pointer;
      `}
      onClick={action}
    >
      Add Consumption
    </button>
  )
}
