import { SaasProvider } from "@saas-ui/react"
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import React from "react"
import ReactDOM from "react-dom/client"
import { OpenAPI } from "./client"
import { routeTree } from "./routeTree.gen"
import theme from "./theme"

OpenAPI.BASE = import.meta.env.VITE_API_URL
OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || ""
}

// Set up a Router instance
const router = createRouter({ routeTree })

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

// tanstack-query context
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // 30 seconds
      retry: (failureCount, error) => {
        // Don't retry for certain error responses
        if (error?.message === "Forbidden") {
          return false
        }

        // Retry others just once
        return failureCount <= 1
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error?.message === "Forbidden") {
        localStorage.removeItem("access_token")
        router.navigate({ to: "/login" })
      }
    },
  }),
})

function InnerApp() {
  return (
    <SaasProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SaasProvider>
  )
}

function App() {
  return <InnerApp />
}
const rootElement = document.getElementById("root")!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
