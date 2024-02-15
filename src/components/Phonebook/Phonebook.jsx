import React, { useState, useEffect } from 'react';
import { ContactInput } from 'components/ContactInput/ContactInput';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState(null);

  const initialContactsList = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  useEffect(() => {
    console.log('Component is mounted');
    const initialContacts =
      JSON.parse(localStorage.getItem('contacts')) || initialContactsList;
    setContacts(initialContacts);
  }, []);

  useEffect(() => {
    console.log('Component is updated');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts, filter]);

  const handleAddContact = newContact => {
    try {
      if (
        contacts.some(
          contact =>
            contact.name.toLowerCase() === newContact.name.toLowerCase()
        )
      ) {
        throw new Error(`${newContact.name} is already in contacts.`);
      }
      setContacts(prevContacts => [...prevContacts, newContact]);
    } catch (error) {
      setError(error);
    }
  };

  const handleFilterChange = value => {
    setFilter(value);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (error) {
    return <h2>Something went wrong: {error.message}</h2>;
  }

  return (
    <div>
      <h1>Contact Book</h1>
      <ContactInput
        onAddContact={handleAddContact}
        name={name}
        number={number}
        setName={setName}
        setNumber={setNumber}
      />
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
