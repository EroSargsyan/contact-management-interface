import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchContactDetails,
  updateContact,
} from '../services/contactsService';
import { IContact } from '../types/contact';
import { useContacts } from '../hooks/ContactsContext';

const EditContactPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<IContact | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { contacts, setContacts } = useContacts();
  const navigate = useNavigate();

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

  const handleSave = async (updatedContact: IContact) => {
    try {
      const response = await updateContact(updatedContact.id, updatedContact);
      setContacts(
        contacts.map((c) => (c.id === updatedContact.id ? response : c)),
      );
      navigate(`/contacts/${updatedContact.id}`);
    } catch (error) {
      console.error('Failed to update contact:', error);
      setError('Failed to update contact. Please try again.');
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!id || !contact) {
    return (
      <div className="text-gray-500 text-center">
        Failed to load contact for editing.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Contact</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(contact);
        }}
        className="space-y-4"
      >
        <input
          type="text"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          placeholder="Name"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          value={contact.username}
          onChange={(e) => setContact({ ...contact, username: e.target.value })}
          placeholder="Username"
          className="w-full px-4 py-2 border rounded-md"
        />
        <textarea
          value={contact.description || ''}
          onChange={(e) =>
            setContact({ ...contact, description: e.target.value })
          }
          placeholder="Description"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          value={contact.profilePicture || ''}
          onChange={(e) =>
            setContact({ ...contact, profilePicture: e.target.value })
          }
          placeholder="Profile Picture URL"
          className="w-full px-4 py-2 border rounded-md"
        />
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/contacts/${id}`)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContactPage;
