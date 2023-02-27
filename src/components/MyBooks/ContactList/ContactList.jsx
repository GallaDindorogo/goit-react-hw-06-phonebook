import { useDispatch, useSelector } from 'react-redux';
import { getAllContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';

import styles from './contactList.module.scss';

const ContactList = () => {
  const items = useSelector(getAllContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

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

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const contacts = filtredContacts.map(({ id, name, number }) => (
    <li className={styles.item} key={id}>
      <p className={styles.contact}>
        {name} .....tel. {number}
      </p>
      <button className={styles.btn} onClick={() => handleDeleteContact(id)}>
        Delete
      </button>
    </li>
  ));
  return <ol className={styles.list}>{contacts}</ol>;
};

export default ContactList;

ContactList.defaultProps = {
  items: [],
};
