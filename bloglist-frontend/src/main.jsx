import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import { NotificationProvider } from './components/NotificationContext.jsx'
import { UserProvider } from './components/UserContext.jsx'
import { BlogsProvider } from './components/BlogsContext.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <UserProvider>
        <BlogsProvider>
          <App />
        </BlogsProvider>
      </UserProvider>
    </NotificationProvider>
  </QueryClientProvider>
)
