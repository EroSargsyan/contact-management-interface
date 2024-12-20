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
  const [showConfirmation, setShowConfirmation] = useState(false);
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
      await deleteContact(id);
      setContacts(contacts.filter((contact) => contact.id !== id));
      navigate('/');
    } catch (error) {
      console.error('Failed to delete contact:', error);
      setError('Failed to delete contact. Please try again.');
    }
  };

  const handleEdit = () => {
    if (!id) return;
    navigate(`/contacts/${id}/edit`);
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
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-gradient-to-r from-gray-50 to-white shadow-lg rounded-lg w-full max-w-lg">
        <div className="flex flex-col items-center">
          <img
            src={contact.profilePicture}
            alt={contact.name}
            className="w-24 h-24 rounded-full mb-6 object-cover border-2 border-gray-200 shadow-sm"
          />
          <h2 className="text-xl font-semibold text-gray-900">
            {contact.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">@{contact.username}</p>
        </div>
        <p className="mt-6 text-gray-700 text-center">
          {contact.description || 'No description available.'}
        </p>
        <div className="mt-8 flex space-x-4">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition w-full shadow-md text-base"
          >
            Edit
          </button>
          <button
            onClick={() => setShowConfirmation(true)}
            className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition w-full shadow-md text-base"
          >
            Delete
          </button>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <p className="text-lg text-gray-700">
              Are you sure you want to delete this contact?
            </p>
            <div className="flex space-x-4 justify-end">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDetailsPage;
