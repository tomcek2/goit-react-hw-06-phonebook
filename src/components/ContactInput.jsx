import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getContact } from '../redux/selectors';
import { addContact } from '../redux/contactSlice';
import { NewContactLabel, Input } from 'components/Styles.styled';

export const ContactInput = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContact);
  const nameRef = useRef();
  const numberRef = useRef();

  const handleAddContact = newContact => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      dispatch(addContact(newContact.name, newContact.number));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;

    const name = nameRef.current.value.trim();
    const inputNumber = numberRef.current.value.trim();
    const number = `${inputNumber.slice(0, 3)}-${inputNumber.slice(
      3,
      5
    )}-${inputNumber.slice(5)}`;

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
      name: name,
      number: number,
    };

    handleAddContact(newContact);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <NewContactLabel>
        Name:
        <Input type="text" required ref={nameRef} />
      </NewContactLabel>
      <NewContactLabel>
        Phone Number:
        <Input type="tel" required ref={numberRef} />
      </NewContactLabel>
      <button type="submit">Add Contact</button>
    </form>
  );
};
