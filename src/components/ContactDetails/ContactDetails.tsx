import React, { useEffect, useState } from 'react';
import { fetchContactDetails } from '../../services/contactsService';
import { IContact } from '../../types/contact';

interface ContactDetailsProps {
  selectedContactId: number | null;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({
  selectedContactId,
}) => {
  const [contact, setContact] = useState<IContact | null>(null);

  useEffect(() => {
    if (selectedContactId) {
      const loadContactDetails = async () => {
        const data = await fetchContactDetails(selectedContactId);
        setContact(data);
      };

      loadContactDetails();
    }
  }, [selectedContactId]);

  if (!selectedContactId || !contact) {
    return (
      <div className="text-gray-500">Select a contact to view details.</div>
    );
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <img
        src={contact.profilePicture}
        alt={contact.name}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h2 className="text-xl font-bold">{contact.name}</h2>
      <p className="text-gray-600">@{contact.username}</p>
      <p className="mt-4">{contact.description}</p>
    </div>
  );
};

export default ContactDetails;
