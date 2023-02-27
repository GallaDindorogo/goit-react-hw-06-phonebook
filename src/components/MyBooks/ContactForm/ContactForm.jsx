import { useSelector, useDispatch } from 'react-redux';

import styles from './contactForm.module.scss';

import { addContact } from 'redux/contactsSlice';
import { getAllContacts } from 'redux/selectors';

const ContactForm = () => {
  let inputValues = {
    name: '',
    number: '',
  };

  const items = useSelector(getAllContacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    const objectKey = e.target.name;
    inputValues[objectKey] = e.target.value;
    console.log(objectKey);
    return;
  };

  const handleAddContact = data => {
    const name = data.name;
    if (items.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    const number = data.number;
    const action = addContact({ name, number });
    dispatch(action);
  };

  const clearForm = e => {
    e.target.elements.name.value = '';
    e.target.elements.number.value = '';
  };

  return (
    <form
      className={styles.form}
      onSubmit={e => {
        e.preventDefault();
        handleAddContact(inputValues);
        clearForm(e);
      }}
    >
      <div className={styles.formGroup}>
        <label>Name</label>
        <input
          className={styles.inputName}
          name="name"
          onChange={handleChange}
          placeholder="Name"
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Number</label>
        <input
          className={styles.inputNumber}
          name="number"
          onChange={handleChange}
          placeholder="tel.number"
          type="tel"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
