import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IContact } from '../../types/contact';

interface ContactListProps {
  contacts: IContact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null,
  );

  const navigate = useNavigate();

  return (
    <ul className="space-y-2">
      {contacts.map((contact) => (
        <li
          key={contact.id}
          onClick={() => {
            setSelectedContactId(contact.id);
            navigate(`/contacts/${contact.id}`);
          }}
          className={`p-3 rounded-lg cursor-pointer transition flex items-center space-x-3 ${
            selectedContactId === contact.id
              ? 'bg-blue-100 text-blue-900 shadow-md'
              : 'hover:bg-gray-200'
          }`}
        >
          <img
            src={contact.profilePicture || 'https://via.placeholder.com/50'}
            alt={contact.name}
            className="w-10 h-10 rounded-full object-cover"
          />

          <span className="text-gray-800 font-medium">{contact.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
