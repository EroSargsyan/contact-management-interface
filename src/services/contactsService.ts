import axios from 'axios';
import { Contact } from '../types/contact';

const API_URL = 'http://localhost:3001/users';

export const fetchContacts = async (): Promise<Contact[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchContactDetails = async (id: number): Promise<Contact> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createContact = async (
  contact: Omit<Contact, 'id'>,
): Promise<Contact> => {
  const response = await axios.post(API_URL, contact);
  return response.data;
};
