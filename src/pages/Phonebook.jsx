import React from 'react';

import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { ContactInput } from 'components/ContactInput';

export const Phonebook = () => {
  return (
    <div>
      <h1>Contact Book</h1>
      <ContactInput />
      <Filter />
      <ContactList />
    </div>
  );
};
