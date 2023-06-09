import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import './App.css'
import AppRouter from './routes'
import { AuthProvider } from './security/authentication/AuthContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
