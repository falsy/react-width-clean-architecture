import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function QueryClientContainer({
  children
}: {
  children: JSX.Element
}) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
