import React, { useState } from 'react';
import { createContact } from '../../services/contactsService';
import { Contact } from '../../types/contact';

interface CreateContactFormProps {
  onCreate: (contact: Contact) => void;
  onCancel: () => void;
}

const CreateContactForm: React.FC<CreateContactFormProps> = ({
  onCreate,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState(
    'https://via.placeholder.com/150',
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newContact = {
      name,
      username,
      description,
      profilePicture,
    };

    const createdContact = await createContact(newContact);
    onCreate(createdContact);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 rounded-md shadow-md"
    >
      <h3 className="text-xl font-bold mb-4">Create Contact</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Profile Picture URL</label>
        <input
          type="text"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateContactForm;
