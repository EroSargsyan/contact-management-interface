import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ContactsProvider } from './hooks/ContactsContext';
import { RouterProvider } from '@tanstack/react-router';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

const queryClient = new QueryClient();

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <ContactsProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ContactsProvider>
    </div>
  );
}

export default App;
