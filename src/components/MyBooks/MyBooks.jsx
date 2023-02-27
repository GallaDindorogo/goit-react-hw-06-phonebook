import { useSelector, useDispatch } from 'react-redux';

import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';
import ContactForm from './ContactForm/ContactForm';

import { addContact, deleteContact } from 'redux/contactsSlice';
import { setFilter } from 'redux/filterSlice';
import { getAllContacts, getFilter } from 'redux/selectors';

import styles from './my-books.module.scss';

const MyBooks = () => {
  const items = useSelector(getAllContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const contact = items.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName &&
        number.toLowerCase() === normalizedNumber
      );
    });

    return Boolean(contact);
  };

  const handleAddContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      return alert(`${name} tel.${number} is already in contacts`);
    }
    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilter = ({ target }) => dispatch(setFilter(target.value));

  const getVisibleContacts = () => {
    if (!filter) {
      return items;
    }
    const normalizedFilter = filter.toLowerCase();
    const resalt = items.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
      );
    });
    return resalt;
  };

  const filtredContacts = getVisibleContacts();

  return (
    <div>
      <h3>Phonebook</h3>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h4>Add new contact</h4>
          <ContactForm onSubmit={handleAddContact} />
        </div>
        <div className={styles.block}>
          <h4 className={styles.titleContacts}>Contacts:</h4>
          <h4 className={styles.allContacts}>All contacts: {items.length}</h4>
          <ContactFilter handleChange={handleFilter} />

          <ContactList
            removeContact={handleDeleteContact}
            items={filtredContacts}
          />
        </div>
      </div>
    </div>
  );
};
export default MyBooks;
