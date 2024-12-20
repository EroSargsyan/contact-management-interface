import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex items-center justify-center ">
      <p className="text-lg text-gray-700 font-medium">
        Select one of the contacts to view details
      </p>
    </div>
  );
}
