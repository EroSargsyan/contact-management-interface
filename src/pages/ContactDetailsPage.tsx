import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchContactDetails,
  deleteContact,
} from '../services/contactsService';
import { IContact } from '../types/contact';
import { useContacts } from '../hooks/ContactsContext';

const ContactDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<IContact | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { contacts, setContacts } = useContacts();

  useEffect(() => {
    if (id) {
      const loadContactDetails = async () => {
        setError(null);

        try {
          const data = await fetchContactDetails(Number(id));
          setContact(data);
        } catch {
          setError('Failed to load contact details. Please try again.');
        }
      };

      loadContactDetails();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteContact(Number(id));
      setContacts(contacts.filter((contact) => contact.id !== id));
      navigate('/');
    } catch (error) {
      console.error('Failed to delete contact:', error);
      setError('Failed to delete contact. Please try again.');
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!id || !contact) {
    return (
      <div className="text-gray-500 text-center">
        Select a contact to view details.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
      <div className="flex flex-col items-center">
        <img
          src={contact.profilePicture}
          alt={contact.name}
          className="w-24 h-24 rounded-full mb-4 object-cover"
        />
        <h2 className="text-xl font-bold text-gray-800">{contact.name}</h2>
        <p className="text-gray-500">@{contact.username}</p>
      </div>
      <p className="mt-4 text-gray-600">
        {contact.description || 'No description available.'}
      </p>
      <button
        onClick={handleDelete}
        className="mt-6 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition w-full"
      >
        Delete Contact
      </button>
    </div>
  );
};

export default ContactDetailsPage;
