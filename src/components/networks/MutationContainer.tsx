import { cloneElement } from "react"
import { useMutation } from "@tanstack/react-query"
import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"

export default function MutationContainer<TData, TVariables>({
  children,
  mutationFn,
  loadingComponent = <></>,
  errorComponent = <></>
}: {
  children: JSX.Element
  mutationFn: (variables: TVariables) => Promise<ILayerDTO<TData>>
  loadingComponent?: JSX.Element
  errorComponent?: JSX.Element
}) {
  const mutation = useMutation({
    retry: 3,
    mutationFn: (params: TVariables) => mutationFn(params)
  })

  const action = (requestParams: TVariables) => {
    mutation.mutate(requestParams)
  }

  const response =
    mutation.data?.isError === false ? mutation.data.data : undefined

  return (
    <>
      {cloneElement(children, { response: response, action })}
      {mutation.status === "pending" && loadingComponent}
      {mutation.status === "error" && errorComponent}
    </>
  )
}
