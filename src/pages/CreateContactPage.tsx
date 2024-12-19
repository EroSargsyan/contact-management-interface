import CreateContactForm from '../components/ContactDetails/CreateContactForm';

const CreateContactPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Contact
      </h1>
      <CreateContactForm />
    </div>
  );
};

export default CreateContactPage;
