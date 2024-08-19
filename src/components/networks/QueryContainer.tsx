import { cloneElement } from "react"
import { useQuery } from "@tanstack/react-query"
import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"

export default function QueryContainer<TData, TVariables>({
  children,
  queryKey,
  queryFn,
  variables,
  loadingComponent = <></>,
  errorComponent = <></>
}: {
  children: JSX.Element
  queryKey: string
  queryFn: (variables?: TVariables) => Promise<ILayerDTO<TData>>
  variables?: TVariables
  loadingComponent?: JSX.Element
  errorComponent?: JSX.Element
}) {
  const query = useQuery({
    queryKey: [queryKey, variables],
    retry: 1,
    queryFn: () => {
      return queryFn(variables)
    }
  })

  const response = query.data?.isError === false ? query.data.data : undefined

  return (
    <>
      {cloneElement(children, { response })}
      {query.status === "pending" && loadingComponent}
      {query.status === "error" && errorComponent}
    </>
  )
}
