import EditContactForm from '../components/ContactDetails/EditContactForm';

const EditContactPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Contact</h1>
      <EditContactForm />
    </div>
  );
};

export default EditContactPage;
