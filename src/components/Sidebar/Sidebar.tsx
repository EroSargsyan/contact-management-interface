import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import ContactList from './ContactList';
import { fetchContacts } from '../../services/contactsService';
import { IContact } from '../../types/contact';
import { useContacts } from '../../hooks/ContactsContext';

const Sidebar = () => {
  const { contacts, setContacts } = useContacts();

  const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigate = useNavigate();

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
    <div className="h-full w-full bg-white shadow-lg flex flex-col p-4 space-y-4">
      <SearchBar onSearch={setSearchQuery} />

      <button
        onClick={() => navigate('/create-contact')}
        className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600 transition"
      >
        Create Contact
      </button>

      <div className="flex-1 overflow-y-auto">
        <ContactList contacts={filteredContacts} />
      </div>
    </div>
  );
};

export default Sidebar;
