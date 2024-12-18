interface Contact {
  id: number;
  name: string;
}

interface ContactListProps {
  contacts: Contact[];
  selectedContactId: number | null;
  onSelectContact: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  selectedContactId,
  onSelectContact,
}) => {
  return (
    <ul className="p-4 space-y-2">
      {contacts.map((contact) => (
        <li
          key={contact.id}
          onClick={() => onSelectContact(contact.id)}
          className={`cursor-pointer p-2 rounded-md ${
            selectedContactId === contact.id
              ? 'bg-blue-100'
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
