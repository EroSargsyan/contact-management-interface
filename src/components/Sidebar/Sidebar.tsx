import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ContactList from './ContactList';
import { fetchContacts } from '../../services/contactsService';
import { IContact } from '../../types/contact';
import { useContacts } from '../../hooks/ContactsContext';
import { useNavigate } from '@tanstack/react-router';

const Sidebar = () => {
  const { contacts, setContacts } = useContacts();

  const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigate = useNavigate({ from: '/' });

  useEffect(() => {
    const loadContacts = async () => {
      const data = await fetchContacts();
      setContacts(data);
      setFilteredContacts(data);
    };

    loadContacts();
  }, [setContacts]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredContacts(filtered);
    }
  }, [searchQuery, contacts]);

  return (
    <div className="h-full w-full bg-gray-50 shadow-lg flex flex-col p-4 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Contacts</h2>

      <SearchBar onSearch={setSearchQuery} />

      <button
        onClick={() =>
          navigate({
            to: '/create-contact',
          })
        }
        className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition focus:outline-none focus:ring focus:ring-blue-300"
      >
        + Create Contact
      </button>

      <div className="flex-1 overflow-y-auto">
        <ContactList contacts={filteredContacts} />
      </div>
    </div>
  );
};

export default Sidebar;
