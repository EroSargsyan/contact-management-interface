import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IContact } from '../../types/contact';

interface ContactListProps {
  contacts: IContact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
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
          className={`p-2 rounded-md cursor-pointer transition ${
            selectedContactId === contact.id
              ? 'bg-blue-100 text-blue-900'
              : 'hover:bg-gray-200'
          }`}
        >
          {contact.name}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
