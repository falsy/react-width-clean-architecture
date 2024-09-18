import { css } from "@emotion/react"

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header
      css={css`
        h1 {
          font-weight: 500;
          font-size: 1rem;
          text-transform: uppercase;
        }
        h2 {
          font-weight: 500;
          font-size: 0.8rem;
          text-transform: uppercase;
        }
      `}
    >
      {children}
    </header>
  )
}
