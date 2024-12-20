import { createFileRoute } from '@tanstack/react-router'
import CreateContactForm from '../components/ContactDetails/CreateContactForm'

export const Route = createFileRoute('/create-contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Create New Contact
      </h1>
      <div className="w-full max-w-lg">
        <CreateContactForm />
      </div>
    </div>
  )
}
