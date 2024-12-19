import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchContactDetails } from '../services/contactsService';
import { IContact } from '../types/contact';

const ContactDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<IContact | null>(null);

  const [error, setError] = useState<string | null>(null);

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
    </div>
  );
};

export default ContactDetailsPage;
