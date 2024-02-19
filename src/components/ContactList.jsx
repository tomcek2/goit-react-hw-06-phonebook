import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteContact } from '../redux/contactSlice';
import { getContact, getFilter } from '../redux/selectors';
import { ContactUlList, ContactButton } from './Styles.styled';

export const ContactList = () => {
  const contacts = useSelector(getContact);
  const filters = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleDelate = contact => {
    dispatch(deleteContact(contact));
  };

  const Filter = (filter, contact) => {
    const filterLower = filter.toLowerCase();
    if (!filterLower.trim()) {
      return contact;
    }

    const filteredList = contact.filter(cont => {
      return cont.name.toLowerCase().includes(filterLower);
    });
    return filteredList;
  };

  const filteredContacts = Filter(filters, contacts);

  return (
    <div>
      <h2>Contacts</h2>
      <ContactUlList>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <ContactButton onClick={() => handleDelate(contact.id)}>
              Delete
            </ContactButton>
          </li>
        ))}
      </ContactUlList>
    </div>
  );
};
