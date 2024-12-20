import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { deleteContact, fetchContactDetails } from '../services/contactsService'
import { useContacts } from '../hooks/ContactsContext'

export const Route = createFileRoute('/contact/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      id: params.id,
    }
  },
})

function RouteComponent() {
  const { id } = Route.useLoaderData()
  const { contacts, setContacts } = useContacts()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const navigate = useNavigate({ from: '/contact/$id' })

  const {
    isLoading,
    error,
    data: contact,
  } = useQuery({
    queryKey: ['contactDetails', id],
    queryFn: () => fetchContactDetails(id!),
    enabled: !!id,
  })

  const mutation = useMutation({
    mutationFn: (contactId: string) => deleteContact(contactId),
    onSuccess: () => {
      setContacts(contacts.filter((c) => c.id !== id))
      navigate({
        to: '/',
      })
    },
  })

  const handleDelete = () => {
    if (id) {
      mutation.mutate(id)
    }
  }

  if (isLoading) {
    return <div className="text-gray-500 text-center">Loading...</div>
  }

  if (error instanceof Error) {
    return (
      <div className="text-red-500 text-center">
        An error has occurred: {error.message}
      </div>
    )
  }

  if (!contact) {
    return (
      <div className="text-gray-500 text-center">
        Select a contact to view details.
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-gradient-to-r from-gray-50 to-white shadow-lg rounded-lg w-full max-w-lg">
        <div className="flex flex-col items-center">
          <img
            src={contact.profilePicture}
            alt={contact.name}
            className="w-24 h-24 rounded-full mb-6 object-cover border-2 border-gray-200 shadow-sm"
          />
          <h2 className="text-xl font-semibold text-gray-900">
            {contact.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">@{contact.username}</p>
        </div>
        <p className="mt-6 text-gray-700 text-center">
          {contact.description || 'No description available.'}
        </p>
        <div className="mt-8 flex space-x-4">
          <button
            onClick={() =>
              navigate({
                to: `/contact/${id}/edit`,
              })
            }
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition w-full shadow-md text-base"
          >
            Edit
          </button>
          <button
            onClick={() => setShowConfirmation(true)}
            className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition w-full shadow-md text-base"
          >
            Delete
          </button>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <p className="text-lg text-gray-700">
              Are you sure you want to delete this contact?
            </p>
            <div className="flex space-x-4 justify-end">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RouteComponent
