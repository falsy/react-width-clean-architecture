import { cloneElement } from "react"
import { useQueryClient } from "@tanstack/react-query"

export default function RefetchContainer({
  children,
  queryKey
}: {
  children: JSX.Element
  queryKey: string
}) {
  const queryClient = useQueryClient()

  const handleClickRefetch = () => {
    queryClient.invalidateQueries({ queryKey: [queryKey] })
  }

  return cloneElement(children, { onClick: () => handleClickRefetch() })
}
