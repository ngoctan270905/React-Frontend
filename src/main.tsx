import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// cấu hình React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,     // cache 5 phút
      gcTime: 1000 * 60 * 10,       // xóa cache sau 10 phút không dùng
      retry: 2,                     // lỗi thì thử lại 2 lần
      refetchOnWindowFocus: false, // không refetch khi quay lại tab
      refetchOnReconnect: true,    // mất mạng rồi có lại thì gọi lại API
    },
    mutations: {
      retry: 1, // mutation lỗi thử lại 1 lần
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)