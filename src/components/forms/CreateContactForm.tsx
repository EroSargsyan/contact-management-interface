import { useForm, useField, FormApi } from '@tanstack/react-form';
import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { IContact } from '../../types/contact';
import { useContacts } from '../../hooks/ContactsContext';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { createContact } from '../../services/contactsService';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required'),
  description: z.string().optional(),
  profilePicture: z
    .string()
    .url('Profile picture URL must be a valid URL')
    .optional(),
});

const CreateContactForm = () => {
  const { contacts, setContacts } = useContacts();
  const navigate = useNavigate({ from: '/' });

  const mutation = useMutation<IContact, Error, Omit<IContact, 'id'>>({
    mutationFn: createContact,
    onSuccess: (data) => {
      setContacts([...contacts, data]);

      navigate({
        to: `/contact/${data.id}`,
      });
    },
    onError: (error) => {
      console.error('Failed to create contact:', error);
    },
  });

  const form = useForm({
    defaultValues: {
      name: '',
      username: '',
      description: '',
      profilePicture: 'https://via.placeholder.com/150',
    } as IContact,
    onSubmit: (formState) => {
      const { value } = formState;
      const validation = contactSchema.safeParse(value);

      if (validation.success) {
        mutation.mutate(value);
      } else {
        console.error('Validation Errors:', validation.error.errors);
      }
    },
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: contactSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-800">Contact Details</h3>
      <NameField form={form} />
      <UsernameField form={form} />
      <DescriptionField form={form} />
      <ProfilePictureField form={form} />
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Create
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
      {field.state.meta.errors?.[0] && (
        <span className="text-red-500 text-sm">
          {field.state.meta.errors[0]}
        </span>
      )}
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

export default CreateContactForm;
