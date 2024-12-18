import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ContactList from './ContactList';
import CreateContactForm from '../ContactDetails/CreateContactForm';
import { fetchContacts } from '../../services/contactsService';

interface Contact {
  id: number;
  name: string;
  username: string;
}

interface SidebarProps {
  selectedContactId: number | null;
  onSelectContact: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedContactId,
  onSelectContact,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);

  useEffect(() => {
    const loadContacts = async () => {
      const data = await fetchContacts();
      setContacts(data);
      setFilteredContacts(data);
    };

    loadContacts();
  }, []);

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

  const handleAddContact = (newContact: Contact) => {
    setContacts((prev) => [...prev, newContact]);
    setFilteredContacts((prev) => [...prev, newContact]);
    setIsCreating(false);
  };

  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <SearchBar onSearch={setSearchQuery} />
      <button
        onClick={() => setIsCreating(true)}
        className="bg-blue-500 text-white px-4 py-2 w-full rounded-md mb-4"
      >
        Create Contact
      </button>
      {isCreating && (
        <CreateContactForm
          onCreate={handleAddContact}
          onCancel={() => setIsCreating(false)}
        />
      )}
      <ContactList
        contacts={filteredContacts}
        selectedContactId={selectedContactId}
        onSelectContact={onSelectContact}
      />
    </aside>
  );
};

export default Sidebar;
