import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ContactDetails from '../components/ContactDetails/ContactDetails';

const Home: React.FC = () => {
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null,
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar
        selectedContactId={selectedContactId}
        onSelectContact={setSelectedContactId}
      />

      <main className="flex-1 p-8 bg-gray-100">
        <ContactDetails selectedContactId={selectedContactId} />
      </main>
    </div>
  );
};

export default Home;
