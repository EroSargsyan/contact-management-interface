import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useField, FormApi } from '@tanstack/react-form';
import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useContacts } from '../../hooks/ContactsContext';
import { IContact } from '../../types/contact';
import { updateContact } from '../../services/contactsService';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required'),
  description: z.string().optional(),
  profilePicture: z
    .string()
    .url('Profile picture URL must be a valid URL')
    .optional(),
});

const EditContactForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { contacts, setContacts } = useContacts();
  const navigate = useNavigate();

  const contactToEdit = contacts.find((contact: IContact) => contact.id === id);

  const form = useForm({
    defaultValues: {
      name: contactToEdit?.name || '',
      username: contactToEdit?.username,
      description: contactToEdit?.description || '',
      profilePicture: contactToEdit?.profilePicture || '',
    } as IContact,

    onSubmit: async (formState) => {
      const { value } = formState;
      const validation = contactSchema.safeParse(value);

      if (validation.success && contactToEdit) {
        try {
          const updatedContact: IContact = {
            ...value,
            id: contactToEdit.id,
          };

          const response = await updateContact(
            contactToEdit.id,
            updatedContact,
          );

          setContacts(
            contacts.map((c) => (c.id === response.id ? response : c)),
          );

          navigate(`/contacts/${response.id}`);
        } catch (error) {
          console.error('Failed to update contact:', error);
        }
      } else {
        console.error('Validation Errors:', validation.error);
      }
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: contactSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Contact</h2>
      <NameField form={form} />
      <UsernameField form={form} />
      <DescriptionField form={form} />
      <ProfilePictureField form={form} />
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
  );
};

const NameField: React.FC<{ form: FormApi<IContact, undefined> }> = ({
  form,
}) => {
  const field = useField({ form, name: 'name' });
  return (
    <div>
      <label className="block text-gray-700 mb-1">Name</label>
      <input
        type="text"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {field.state.meta.errors?.[0] && (
        <span className="text-red-500 text-sm">
          {field.state.meta.errors[0]}
        </span>
      )}
    </div>
  );
};

const UsernameField: React.FC<{ form: FormApi<IContact, undefined> }> = ({
  form,
}) => {
  const field = useField({ form, name: 'username' });
  return (
    <div>
      <label className="block text-gray-700 mb-1">Username</label>
      <input
        type="text"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {field.state.meta.errors?.[0] && (
        <span className="text-red-500 text-sm">
          {field.state.meta.errors[0]}
        </span>
      )}
    </div>
  );
};

const DescriptionField: React.FC<{ form: FormApi<IContact, undefined> }> = ({
  form,
}) => {
  const field = useField({ form, name: 'description' });
  return (
    <div>
      <label className="block text-gray-700 mb-1">Description</label>
      <textarea
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

const ProfilePictureField: React.FC<{ form: FormApi<IContact, undefined> }> = ({
  form,
}) => {
  const field = useField({ form, name: 'profilePicture' });
  return (
    <div>
      <label className="block text-gray-700 mb-1">Profile Picture URL</label>
      <input
        type="text"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {field.state.meta.errors?.[0] && (
        <span className="text-red-500 text-sm">
          {field.state.meta.errors[0]}
        </span>
      )}
    </div>
  );
};

export default EditContactForm;
