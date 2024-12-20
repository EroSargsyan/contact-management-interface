import axios from 'axios';
import { IContact } from '../types/contact';

const API_URL = 'http://localhost:3001/users';

export const fetchContacts = async (): Promise<IContact[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    throw error;
  }
};

export const fetchContactDetails = async (id: string): Promise<IContact> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch details for contact ID ${id}:`, error);
    throw error;
  }
};

export const createContact = async (contact: Omit<IContact, 'id'>) => {
  try {
    const response = await axios.post(API_URL, contact);

    return response.data;
  } catch (error) {
    console.error('Failed to create contact:', error);
    throw error;
  }
};

export const deleteContact = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateContact = async (
  id: string,
  updatedContact: IContact,
): Promise<IContact> => {
  const response = await axios.put(`${API_URL}/${id}`, updatedContact);
  return response.data;
};
