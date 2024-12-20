import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ContactsProvider } from './hooks/ContactsContext';
import AppRouter from './routes/routes';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <ContactsProvider>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </ContactsProvider>
    </div>
  );
}

export default App;
