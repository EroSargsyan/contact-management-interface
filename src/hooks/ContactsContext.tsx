/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { IContact } from '../types/contact';

interface ContactsContextType {
  contacts: IContact[];
  setContacts: Dispatch<SetStateAction<IContact[]>>;
}

const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined,
);

export const ContactsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<IContact[]>([]);

  return (
    <ContactsContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = (): ContactsContextType => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
};
