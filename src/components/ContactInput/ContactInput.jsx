import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactInput.module.css';

export const ContactInput = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handleNumberChange = event => {
    setNumber(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();

    const namePattern =
      /^[a-zA-Z\u0400-\u04FF]+(([' -][a-zA-Z\u0400-\u04FF ])?[a-zA-Z\u0400-\u04FF]*)*$/;
    const numberPattern =
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

    if (!namePattern.test(name)) {
      alert(
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      );
      return;
    } else if (!numberPattern.test(number)) {
      alert(
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      );
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    onAddContact(newContact);

    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={css.newContactLabel}>
        Name:
        <input
          className={css.newContactInput}
          type="text"
          name="name"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className={css.newContactLabel}>
        Phone Number:
        <input
          className={css.newContactInput}
          type="tel"
          name="number"
          required
          value={number}
          onChange={handleNumberChange}
        />
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
};
