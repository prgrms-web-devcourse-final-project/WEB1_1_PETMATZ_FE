import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppRoutes from './router';

export default function App() {
    const queryClient = new QueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AppRoutes />
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
        </>
    );
}
