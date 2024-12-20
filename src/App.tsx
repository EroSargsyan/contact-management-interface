import { ContactsProvider } from './hooks/ContactsContext';
import AppRouter from './routes/routes';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <ContactsProvider>
        <AppRouter />
      </ContactsProvider>
    </div>
  );
}

export default App;
