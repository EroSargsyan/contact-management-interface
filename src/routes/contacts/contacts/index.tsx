import { createFileRoute } from '@tanstack/react-router';
import EditContactForm from '../../../components/forms/EditContactForm';

export const Route = createFileRoute('/contacts/contacts/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      id: params.id,
    };
  },
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Contact</h1>
      <div className="w-full max-w-lg">
        <EditContactForm />
      </div>
    </div>
  );
}
